const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quotes-controllers");
const catchAsync = require("../utils/catchAsync");

router.get("/", catchAsync(quoteController.index));

router.get("/:quoteId", catchAsync(quoteController.getQuote));

module.exports = router;
