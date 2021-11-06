const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Quote = require("./models/quote");
const Author = require("./models/author");
const QUOTE_PER_LOAD = 24;

mongoose.connect("mongodb://localhost:27017/quoteWebsite");

const db = mongoose.connection;
db.once("open", () => {
	console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));

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
});

const port = 5000;

app.listen(port, () => {
	console.log(`Listening at localhost: ${port}`);
});
