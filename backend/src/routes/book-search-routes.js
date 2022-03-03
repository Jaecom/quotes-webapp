import express from "express";
import bookSearchController from "../controllers/book-search-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import catchAsync from "../utils/catchAsync.js";

const bookSearchRoutes = express.Router();

bookSearchRoutes.get("/:query", checkAuth, catchAsync(bookSearchController.searchTitle));

export default bookSearchRoutes;
