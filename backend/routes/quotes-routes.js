const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quotes-controllers");

router.get("/", quoteController.index);

router.get("/:quoteId", quoteController.getQuote);

module.exports = router;
