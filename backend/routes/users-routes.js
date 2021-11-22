const express = require("express");
const router = express.Router();
const userController = require("../controllers/users-controllers");

router.post("/signup", userController.signin);

router.post("/login", userController.login);

module.exports = router;
