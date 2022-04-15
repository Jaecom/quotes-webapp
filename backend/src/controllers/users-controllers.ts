import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { HttpError } from "../utils/CustomErrors.js";
import { RequestHandler } from "express";

const SALT_ROUNDS = 10;

const TOKEN_EXPIRATION = "10 day";



const getBasicData: RequestHandler = async (req, res) => {
	const { userId, expirationDate } = res.locals;
	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError("Invalid Token", 400);
	}

	const basicUserData = {
		collections: user.collections,
		ownedQuotes: user.ownedQuotes,
		likedQuotes: user.likedQuotes,
		profilePicture: user.profilePicture,
		username: user.username,
	};

	res.json({ basicUserData, userId, expirationDate });
};

const logout: RequestHandler = (req, res, next) => {
	res.clearCookie("token");
	res.json("success");
};

const signin: RequestHandler = async (req, res, next) => {
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
		token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET ?? "", {
			expiresIn: TOKEN_EXPIRATION,
		});
	} catch {
		throw new HttpError("Cannot create token. Please try again", 500);
	}

	const { exp: expirationDate } = jwt.decode(token) as jwt.JwtPayload;

	res.cookie("token", token, { secure: true, httpOnly: true, sameSite: "strict" });

	res.json({ userId: newUser.id, token, expirationDate });
};

const login: RequestHandler = async (req, res, next) => {
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
		token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET ?? "", {
			expiresIn: TOKEN_EXPIRATION,
		});
	} catch {
		throw new HttpError("Cannot create token. Please try again", 500);
	}

	const { exp: expirationDate } = jwt.decode(token) as jwt.JwtPayload;

	res.cookie("token", token, { secure: true, httpOnly: true, sameSite: "strict" });

	const basicUserData = {
		collections: existingUser.collections,
		ownedQuotes: existingUser.ownedQuotes,
		likedQuotes: existingUser.likedQuotes,
		profilePicture: existingUser.profilePicture,
		username: existingUser.username,
	};

	res.json({ userId: existingUser.id, token, expirationDate, basicUserData });
};

export default { getBasicData, logout, signin, login };
