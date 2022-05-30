import dotenv from "dotenv";
dotenv.config();

const myArgs = process.argv.slice(2);
const LOCAL_DB = myArgs[0] !== "online";

import XLSX from "xlsx";
import Quote from "../dist/backend/src/models/quote.js";
import User from "../dist/backend/src/models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const workbook = XLSX.readFile("seed/Quotes.xlsx");
const sheet_name_list = workbook.SheetNames;
const quotexlData = XLSX.utils.sheet_to_json(
	workbook.Sheets[sheet_name_list[0]]
);

const uri = LOCAL_DB
	? "mongodb://Jae:27017,Jae:27018,Jae:27019?replicaSet=rs"
	: process.env.MONGO_URL;

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
		profilePicture:
			"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
	},
	{
		email: "a@gmail.com",
		username: "americanReader123",
		password: "a",
		profilePicture:
			"https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
	},
	{
		email: "b@gmail.com",
		username: "ilovebooks123",
		password: "b",
		profilePicture:
			"https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60",
	},
];

const createUsers = async () => {
	await User.deleteMany({});

	for (const user of FAKE_USERS) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		const newUser = new User({
			email: user.email,
			username: user.username,
			hash: hashedPassword,
			profilePicture: user.profilePicture,
		});
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
