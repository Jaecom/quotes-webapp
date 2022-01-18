import Quote from "../models/quote.js";
const authorController = {};

authorController.index = (req, res, next) => {};

authorController.getAuthorQuotes = async (req, res, next) => {
	console.log(req.params);
	const { authorId } = req.params;
	const quotes = await Quote.find({ "author.authorObject": authorId });
	res.json({ quotes });
};

export default authorController;
