import express from "express";
import quoteController from "../controllers/quotes-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import catchAsync from "../utils/catchAsync.js";

const quoteRoutes = express.Router();

quoteRoutes.get("/", catchAsync(quoteController.index));

quoteRoutes.get("/:quoteId", catchAsync(quoteController.getQuote));

quoteRoutes.patch("/:quoteId/toggleLike", checkAuth, catchAsync(quoteController.likeQuote));

export default quoteRoutes;
