import express from "express";
import quoteController from "../controllers/quotes-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import catchAsync from "../utils/catchAsync.js";
import sw3upload from "../middleware/multer-image-s3.js";

const quoteRoutes = express.Router();

quoteRoutes
	.route("/")
	.get(catchAsync(quoteController.index))
	.post(checkAuth, sw3upload.single("imageFile"), catchAsync(quoteController.createQuote));

quoteRoutes.get("/:quoteId", catchAsync(quoteController.getQuote));

quoteRoutes.patch("/:quoteId/toggleLike", checkAuth, catchAsync(quoteController.likeQuote));

export default quoteRoutes;
