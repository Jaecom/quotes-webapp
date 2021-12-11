const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quotes-controllers");
const catchAsync = require("../utils/catchAsync");
const isAuthenticated = require("../middleware/check-auth");

router.get("/", catchAsync(quoteController.index));

router.get("/:quoteId", catchAsync(quoteController.getQuote));

router.patch("/:quoteId/like", isAuthenticated, catchAsync(quoteController.likeQuote));

module.exports = router;
