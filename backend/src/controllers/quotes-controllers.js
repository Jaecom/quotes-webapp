import mongoose from "mongoose";
import Author from "../models/author.js";
import Quote from "../models/quote.js";
import User from "../models/user.js";
import { HttpError } from "../utils/CustomErrors.js";

const { ObjectId } = mongoose.Types;

const QUOTE_PER_LOAD = 24;
const quoteController = {};

quoteController.index = async (req, res, next) => {
	const page = req.query.page || 1;
	let quotes = [];
	let isLastPage = false;

	quotes = await Quote.find()
		.lean()
		.sort({ views: -1, "likes.total": -1, dateCreated: -1 })
		.skip(QUOTE_PER_LOAD * (page - 1))
		.limit(QUOTE_PER_LOAD);

	const randomIndex = Math.floor(Math.random() * (quotes.length - 1));
	quotes[randomIndex].isBanner = true;

	if (quotes.length !== QUOTE_PER_LOAD) {
		isLastPage = true;
	}

	res.json({ quotes, isLastPage });
};

quoteController.search = async (req, res) => {
	const { q } = req.query;
	const page = req.query.page || 1;
	let isLastPage = false;

	const quotes = await Quote.find({ $text: { $search: q } })
		.lean()
		.sort({ views: -1, "likes.total": -1, dateCreated: -1 })
		.skip(QUOTE_PER_LOAD * (page - 1))
		.limit(QUOTE_PER_LOAD);

	if (quotes.length !== QUOTE_PER_LOAD) {
		isLastPage = true;
	}

	res.json({ quotes, isLastPage });
};

quoteController.getQuote = async (req, res) => {
	const { quoteId } = req.params;

	const [quote, recommended] = await Promise.all([
		Quote.findByIdAndUpdate(quoteId, { $inc: { views: 1 } }, { new: true })
			.lean()
			.populate({
				path: "author.authorObject",
				model: Author,
				populate: {
					path: "quotes",
					model: Quote,
				},
			}),
		Quote.aggregate([{ $sample: { size: 3 } }]),
	]);

	res.json({ quote, recommended });
};

quoteController.toggleLike = async (req, res, next) => {
	const { quoteId } = req.body;
	const userId = res.locals.userId;

	//check if quote bookmarked
	const isQuoteLiked = await Quote.findOne({
		_id: quoteId,
		"likes.users": userId,
	}).catch(() => {
		throw new HttpError("Something went wrong", 500);
	});

	//mongoose transaction
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		// push/pull quote to user quote list
		const addUserLike = { $push: { likedQuotes: ObjectId(quoteId) } };
		const removeUserLike = { $pull: { likedQuotes: ObjectId(quoteId) } };
		const userLikeUpdate = isQuoteLiked ? removeUserLike : addUserLike;

		const updatedUser = await User.findOneAndUpdate({ _id: ObjectId(userId) }, userLikeUpdate, {
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

quoteController.createQuote = async (req, res, next) => {
	const file = req.file;
	const { title, author, genre, quote } = req.body;

	const newQuote = new Quote({
		quote: {
			raw: quote,
		},
		author: {
			name: author,
		},
		title,
		genre: [genre],
		image: {
			original: file.location.original,
			medium: file.location.medium,
			thumbnail: file.location.thumbnail,
		},
		owner: res.locals.userId,
	});

	await newQuote.save().catch((error) => {
		console.log(error);
		throw new HttpError("Something went wrong", 500);
	});

	console.log(newQuote);
	res.json("OK");
};

export default quoteController;
