const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const collectionController = require("../controllers/collections-controllers");
const checkAuthentication = require("../middleware/check-auth");
const { validateCollection } = require("../middleware/schema-validate");

router
	.get("/", checkAuthentication, catchAsync(collectionController.index))
	.post(
		"/",
		checkAuthentication,
		validateCollection,
		catchAsync(collectionController.createCollection)
	);

router
	.get("/:collectionId", checkAuthentication, catchAsync(collectionController.getCollection))
	.post(
		"/:collectionId",
		checkAuthentication,
		catchAsync(collectionController.addQuoteToCollection)
	)
	.delete(
		"/:collectionId",
		checkAuthentication,
		catchAsync(collectionController.removeQuoteFromCollection)
	);
module.exports = router;
