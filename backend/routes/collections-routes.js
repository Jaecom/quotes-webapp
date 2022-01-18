import express from "express";
import catchAsync from "../utils/catchAsync.js";
import collectionController from "../controllers/collections-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import { validateCollection } from "../middleware/schema-validate.js";

const collectionRoutes = express.Router();

collectionRoutes
	.get("/", checkAuth, catchAsync(collectionController.index))
	.post("/", checkAuth, validateCollection, catchAsync(collectionController.createCollection));

collectionRoutes
	.get("/:collectionId", checkAuth, catchAsync(collectionController.getCollection))
	.post("/:collectionId", checkAuth, catchAsync(collectionController.addQuoteToCollection))
	.delete("/:collectionId", checkAuth, catchAsync(collectionController.removeQuoteFromCollection));

export default collectionRoutes;
