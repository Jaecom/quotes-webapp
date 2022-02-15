import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { HttpError } from "../utils/CustomErrors.js";

const SALT_ROUNDS = 10;

const TOKEN_EXPIRATION = "10 day";
const userController = {};

userController.isLoggedIn = (req, res, next) => {
	const { token } = req.cookies;
	const { userId, exp: expirationDate } = jwt.decode(token);
	res.json({ userId, expirationDate });
};

userController.logout = (req, res, next) => {
	res.clearCookie("token");
	res.clearCookie("isLoggedIn");
	res.clearCookie("expirationDate");
	res.clearCookie("userId");
	res.json("success");
};

userController.signin = async (req, res, next) => {
	const { name, password, email, username } = req.body;

	const existingUser = await User.findOne({ email: email }).catch(() => {
		throw new HttpError("Signing up failed, please try again later", 500);
	});

	if (existingUser) {
		throw new HttpError("User exists already, please sign in", 422);
	}

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS).catch(() => {
		throw new HttpError("Cannot create user. Please try again", 500);
	});

	const newUser = new User({ name, email, username, hash: hashedPassword });

	newUser.save().catch(() => {
		throw new HttpError("Cannot create user. Pleases try again", 500);
	});

	let token;
	try {
		token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
			expiresIn: TOKEN_EXPIRATION,
		});
	} catch {
		throw new HttpError("Cannot create token. Please try again", 500);
	}

	const expirationDate = jwt.decode(token).exp;

	res.cookie("token", token, { httpOnly: true });
	res.cookie("isLoggedIn", true);
	res.cookie("userId", newUser.id);
	res.cookie("expirationDate", expirationDate);

	res.json({ userId: newUser.id, token, expirationDate });
};

userController.login = async (req, res, next) => {
	const { email, password } = req.body;

	const existingUser = await User.findOne({ email: email }).catch(() => {
		throw new HttpError("Something went wrong. Please try again", 500);
	});

	if (!existingUser) {
		throw new HttpError("Invalid credentials. Please try again.", 403);
	}

	const result = await bcrypt.compare(password, existingUser.hash).catch(() => {
		throw new HttpError("Something went wrong. Please try again", 500);
	});

	if (!result) {
		throw new HttpError("Invalid credentials. Please try again.", 403);
	}

	let token;
	try {
		token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET, {
			expiresIn: TOKEN_EXPIRATION,
		});
	} catch {
		throw new HttpError("Cannot create token. Please try again", 500);
	}

	const expirationDate = jwt.decode(token).exp;

	res.cookie("token", token, { httpOnly: true });
	res.cookie("isLoggedIn", true);
	res.cookie("userId", existingUser.id);
	res.cookie("expirationDate", expirationDate);

	res.json({ userId: existingUser.id, token, expirationDate });
};

export default userController;
