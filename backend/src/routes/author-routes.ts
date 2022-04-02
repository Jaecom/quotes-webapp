import express from "express";
import authorController from "../controllers/authors-controllers.js";
import catchAsync from "../utils/catchAsync.js";

const authorRoutes = express.Router();

authorRoutes.get("/:authorId", catchAsync(authorController.getAuthorQuotes));

export default authorRoutes;
