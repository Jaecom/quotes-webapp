import express from "express";
import catchAsync from "../utils/catchAsync.js";
import quoteController from "../controllers/quotes-controllers.js";

const searchRoutes = express.Router();

searchRoutes.route("/quotes").get(catchAsync(quoteController.search));

export default searchRoutes;
