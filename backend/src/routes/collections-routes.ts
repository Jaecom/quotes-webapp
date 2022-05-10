import express from "express";
import catchAsync from "../utils/catchAsync.js";
import collectionController from "../controllers/collections-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import { validateCollection } from "../middleware/schema-validate.js";

const collectionRoutes = express.Router();

collectionRoutes
	.route("/")
	.get(checkAuth, catchAsync(collectionController.index))
	.post(
		checkAuth,
		validateCollection,
		catchAsync(collectionController.createCollection)
	);

collectionRoutes
	.route("/:collectionId")
	.get(checkAuth, catchAsync(collectionController.getCollection))
	.patch(checkAuth, catchAsync(collectionController.editCollection));

collectionRoutes
	.route("/:collectionId/quotes")
	.post(checkAuth, catchAsync(collectionController.addQuoteToCollection))
	.delete(
		checkAuth,
		catchAsync(collectionController.removeQuoteFromCollection)
	);

export default collectionRoutes;
