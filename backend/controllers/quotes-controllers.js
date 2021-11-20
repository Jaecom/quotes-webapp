const Quote = require("../models/quote");
const Author = require("../models/author");
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
			.limit(QUOTE_PER_LOAD);
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
