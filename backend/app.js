const express = require("express");
const app = express();
const mongoose = require("mongoose");
const quoteRoutes = require("./routes/quotes-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./utils/HttpError");

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
app.use("/api/users", userRoutes);

app.all("*", (req, res, next) => {
	next(new HttpError("Route Not Found", 404));
});

const port = 5000;

app.listen(port, () => {
	console.log(`Listening at localhost: ${port}`);
});
