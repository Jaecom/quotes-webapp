import express from "express";
import userController from "../controllers/users-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import { validateUser } from "../middleware/schema-validate.js";
import catchAsync from "../utils/catchAsync.js";

const userRoutes = express.Router();

userRoutes.get("/isLoggedIn", checkAuth, userController.isLoggedIn);

userRoutes.post("/logout", checkAuth, userController.logout);

userRoutes.post("/signup", validateUser, catchAsync(userController.signin));

userRoutes.post("/login", catchAsync(userController.login));

export default userRoutes;
