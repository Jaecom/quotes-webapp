const express = require("express");
const mongoose = require("mongoose");
const app = express();
const quoteRoutes = require("./routes/quotes-routes");
mongoose.connect("mongodb://localhost:27017/quoteWebsite");

const db = mongoose.connection;
db.once("open", () => {
	console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	next();
});

app.get("/", (req, res) => {
	res.send("Home");
});

app.use("/api/quotes", quoteRoutes);

const port = 5000;

app.listen(port, () => {
	console.log(`Listening at localhost: ${port}`);
});
