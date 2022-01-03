const { startSession } = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const Quote = require("../models/quote");
const Author = require("../models/author");
const User = require("../models/user");

const HttpError = require("../utils/HttpError");
const QUOTE_PER_LOAD = 24;

module.exports.index = async (req, res, next) => {
	const { search } = req.query;
	const page = req.query.page || 1;
	let quotes = [];
	let isLastPage = false;

	if (search) {
		quotes = await Quote.find({ $text: { $search: search } })
			.skip(QUOTE_PER_LOAD * (page - 1))
			.limit(QUOTE_PER_LOAD);
	} else {
		quotes = await Quote.find()
			.skip(QUOTE_PER_LOAD * (page - 1))
			.limit(QUOTE_PER_LOAD)
			.lean();

		const randomIndex = Math.floor(Math.random() * (quotes.length - 1));
		quotes[randomIndex].isBanner = true;

		quotes = quotes.map((element) => Quote.hydrate(element));
	}

	if (quotes.length !== QUOTE_PER_LOAD) {
		isLastPage = true;
	}

	res.json({ quotes, isLastPage });
};

module.exports.getQuote = async (req, res) => {
	const { quoteId } = req.params;
	const quote = await Quote.findById(quoteId).populate({
		path: "author.authorObject",
		populate: {
			path: "quotes",
		},
	});

	const recommended = await Quote.aggregate([{ $sample: { size: 3 } }]).then((docs) =>
		docs.map((doc) => Quote.hydrate(doc))
	);

	res.json({ quote, recommended });
};

module.exports.likeQuote = async (req, res, next) => {
	const { quoteId } = req.body;
	const userId = res.locals.userId;

	//check if quote bookmarked
	const isQuoteLiked = await Quote.findOne({
		_id: quoteId,
		"likes.users": userId,
	}).catch(() => {
		next(new HttpError("Something went wrong", 500));
	});

	//mongoose transaction
	const session = await startSession();

	try {
		session.startTransaction();

		// push/pull quote to user quote list
		const addUserLike = { $push: { likedQuotes: ObjectId(quoteId) } };
		const removeUserLike = { $pull: { likedQuotes: ObjectId(quoteId) } };
		const userBookmarkUpdate = isQuoteLiked ? removeUserLike : addUserLike;

		const updatedUser = await User.findOneAndUpdate({ _id: ObjectId(userId) }, userBookmarkUpdate, {
			session,
		});

		// push/pull user to quote user like list
		const addUserToQuote = {
			$push: {
				"likes.users": ObjectId(userId),
			},
			$inc: { "likes.total": 1 },
		};

		const removeUserFromQuote = {
			$pull: { "likes.users": ObjectId(userId) },
			$inc: { "likes.total": -1 },
		};

		const updateQuoteUser = isQuoteLiked ? removeUserFromQuote : addUserToQuote;

		const updatedQuote = await Quote.findOneAndUpdate({ _id: ObjectId(quoteId) }, updateQuoteUser, {
			session,
		});

		await session.commitTransaction();
	} catch (e) {
		console.log(e);
		await session.abortTransaction();
	}

	session.endSession();
	res.json("OK");
};
