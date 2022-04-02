import Quote from "../models/quote.js";
import { RequestHandler } from "express";
const authorController = {};

// authorController.index = (req, res, next) => {};

const getAuthorQuotes: RequestHandler = async (req, res, next) => {
	const { authorId } = req.params;
	const quotes = await Quote.find({ "author.authorObject": authorId });
	res.json({ quotes });
};

export default { getAuthorQuotes };
