const User = require("../models/user");
const HttpError = require("../utils/HttpError");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");

module.exports.signin = async (req, res, next) => {
	const { name, password, email, username } = req.body;

	const existingUser = await User.findOne({ email: email }).catch(() => {
		return next(new HttpError("Signing up failed, please try again later", 500));
	});

	if (existingUser) {
		return next(new HttpError("User exists already, please sign in", 422));
	}

	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS).catch(() => {
		return next(new HttpError("Cannot create user. Pleases try again", 500));
	});

	const newUser = new User({ name, email, username, hash: hashedPassword });

	newUser.save().catch(() => {
		return next(new HttpError("Cannot create user. Pleases try again", 500));
	});

	let token;
	try {
		token = jwt.sign({ userId: newUser.id }, "secret", { expiresIn: "1d" });
	} catch {
		next(new HttpError("Cannot create token. Please try again", 500));
	}

	const expirationDate = jwt.decode(token).exp;

	res.json({ userId: existingUser.id, token, expirationDate });
};

module.exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	const existingUser = await User.findOne({ email: email }).catch(() => {
		return next(new HttpError("Login up failed, please try again later", 500));
	});

	if (!existingUser) {
		return next(new HttpError("Invalid credentials. Please try again.", 403));
	}

	const result = await bcrypt.compare(password, existingUser.hash).catch(() => {
		return next(new HttpError("Login up failed, please try again later", 500));
	});

	if (!result) {
		return next(new HttpError("Invalid credentials. Please try again.", 403));
	}

	let token;
	try {
		token = jwt.sign({ userId: existingUser.id }, "secret", { expiresIn: "1 day" });
	} catch {
		next(new HttpError("Cannot create token. Please try again", 500));
	}

	const expirationDate = jwt.decode(token).exp;

	res.json({ userId: existingUser.id, token, expirationDate });
};
