const express = require("express");
const router = express.Router();
const userController = require("../controllers/users-controllers");
const isAuthenticated = require("../middleware/check-auth");
const { validateUser } = require("../middleware/schema-validate");

router.get("/isLoggedIn", isAuthenticated, userController.isLoggedIn);

router.post("/logout", isAuthenticated, userController.logout);

router.post("/signup", validateUser, userController.signin);

router.post("/login", userController.login);

module.exports = router;
