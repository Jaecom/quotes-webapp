const express = require("express");
const router = express.Router();
const userController = require("../controllers/users-controllers");

router.post("/", userController.signIn);

module.exports = router;
