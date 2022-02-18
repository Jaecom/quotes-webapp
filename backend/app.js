import "./utils/envconfig.js";
import express from "express";
import mongoose from "mongoose";
import { HttpError, SchemaError } from "./utils/CustomErrors.js";
import cookieParser from "cookie-parser";

import quoteRoutes from "./routes/quotes-routes.js";
import userRoutes from "./routes/users-routes.js";
import authorRoutes from "./routes/author-routes.js";
import collectionRoutes from "./routes/collections-routes.js";
import bookSearchRoutes from "./routes/book-search-routes.js";
import path from "path";

const app = express();

mongoose.connect(process.env.MONGO_URL || "mongodb://Jaecom:27017/quoteWebsite?replicaSet=rs", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
	console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	next();
});

app.use("/api/quotes", quoteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/book-search", bookSearchRoutes);

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
	});
}

app.all("*", (req, res, next) => {
	next(new HttpError("Route Not Found", 404));
});

//process all errors by sending response to frontend with statuscode & message
app.use((error, req, res, next) => {
	console.log("error", error);
	if (error instanceof SchemaError) {
		return res.status(error.status || 500).json(error.messageArray || "Something went wrong");
	}

	return res.status(error.status || 500).json(error.message || "Something went wrong");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Listening at localhost: ${port}`);
});
