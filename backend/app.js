const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Quote = require("./models/quote");
const QUOTE_PER_LOAD = 24;

mongoose.connect("mongodb://localhost:27017/quoteWebsite");

app.use(cors());

app.get("/", (req, res) => {
	res.send("Home");
});

app.get("/api/quotes", async (req, res) => {
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
});

app.get("/api/quotes/:quoteId", async (req, res) => {
	const { quoteId } = req.params;
	const quotes = await Quote.findById(quoteId);
	res.json(quotes);
});

const port = 5000;

app.listen(port, () => {
	console.log(`Listening at localhost: ${port}`);
});
