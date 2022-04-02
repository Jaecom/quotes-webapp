import express from "express";
import userController from "../controllers/users-controllers.js";
import checkAuth from "../middleware/check-auth.js";
import { validateUser } from "../middleware/schema-validate.js";
import catchAsync from "../utils/catchAsync.js";

const userRoutes = express.Router();

userRoutes.get("/getBasicData", checkAuth, catchAsync(userController.getBasicData));

userRoutes.post("/logout", userController.logout);

userRoutes.post("/signup", validateUser, catchAsync(userController.signin));

userRoutes.post("/login", catchAsync(userController.login));

export default userRoutes;
