const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authors-controllers");
const catchAsync = require("../utils/catchAsync");

router.get("/", catchAsync(authorController.index));

router.get("/:authorId", catchAsync(authorController.getAuthorQuotes));

module.exports = router;
