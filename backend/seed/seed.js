//change flag to upload
const myArgs = process.argv.slice(2);
const LOCAL_DB = myArgs[0] !== "online";

import XLSX from "xlsx";
import Quote from "../dist/models/quote.js";
import User from "../dist/models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const workbook = XLSX.readFile("seed/Quotes.xlsx");
const sheet_name_list = workbook.SheetNames;
const quotexlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const uri = LOCAL_DB ? "mongodb://Jaecom:27017/quoteWebsite?replicaSet=rs" : process.env.MONGO_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
	console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));

const FAKE_USERS = [
	{
		email: "example@gmail.com",
		username: "AvidReader123",
		password: "example",
	},
	{
		email: "a@gmail.com",
		username: "americanReader123",
		password: "a",
	},
	{
		email: "b@gmail.com",
		username: "ilovebooks123",
		password: "b",
	},
];

const createUsers = async () => {
	await User.deleteMany({});

	for (const user of FAKE_USERS) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		const newUser = new User({ email: user.email, username: user.username, hash: hashedPassword });
		await newUser.save();
	}
};

const createQuotes = async () => {
	await Quote.deleteMany({});

	const users = await User.find({});

	for (let quote of quotexlData) {
		const randomUser = users[Math.floor(Math.random() * users.length)];

		const quoteRaw = quote.quote;
		const authorName = quote.author;

		const newQuote = new Quote({
			text: {
				raw: quoteRaw,
			},
			title: quote.title,
			author: { name: authorName },
			genre: quote.genre,
			image: {
				original: quote.image,
				medium: quote.image.replace(/w=\d*&q=\d*/g, "&w=1000&h=1000&q=80"),
				thumbnail: quote.image.replace(/w=\d*&q=\d*/g, "&w=600&h=600&q=80"),
			},
			owner: randomUser.id,
		});

		await newQuote.save();
	}
};

const createAll = async () => {
	await createUsers();
	await createQuotes();
};

createAll().then(() => {
	console.log(`Uploaded ${LOCAL_DB ? "local" : "online"} database`);
	console.log("Closing database");
	db.close();
});
