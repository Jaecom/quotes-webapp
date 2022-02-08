import express from "express";
import quoteController from "../controllers/quotes-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import catchAsync from "../utils/catchAsync.js";
import { validateQuote } from "../middleware/schema-validate.js";
import multer from "multer";
import uploadToS3 from "../middleware/multer-s3-image-upload.js";

const upload = multer();
const quoteRoutes = express.Router();

quoteRoutes
	.route("/")
	.get(catchAsync(quoteController.index))
	.post(
		checkAuth,
		upload.single("imageFile"),
		validateQuote,
		uploadToS3,
		catchAsync(quoteController.createQuote)
	);

quoteRoutes.get("/:quoteId", catchAsync(quoteController.getQuote));

quoteRoutes.patch("/:quoteId/toggleLike", checkAuth, catchAsync(quoteController.likeQuote));

export default quoteRoutes;
