const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const collectionController = require("../controllers/collections-controllers");
const checkAuthentication = require("../middleware/check-auth");

router
	.get("/", checkAuthentication, catchAsync(collectionController.index))
	.post("/", checkAuthentication, catchAsync(collectionController.createCollection));

module.exports = router;
