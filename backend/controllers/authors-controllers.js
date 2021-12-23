const Quotes = require("../models/quote");
const { ObjectId } = require("mongoose").Types;

module.exports.index = (req, res, next) => {};

module.exports.getAuthorQuotes = async (req, res, next) => {
	console.log(req.params);
	const { authorId } = req.params;
	const quotes = await Quotes.find({ "author.authorObject": authorId });
	res.json({ quotes });
};
