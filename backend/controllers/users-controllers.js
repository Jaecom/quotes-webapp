const User = require("../models/user");
const HttpError = require("../utils/HttpError");
const bcrypt = require("bcrypt");

module.exports.signin = async (req, res, next) => {
	const { name, password, email, username } = req.body;

	const existingUser = await User.findOne({ email: email }).catch(() => {
		return next(new HttpError("Signing up failed, please try again later", 500));
	});

	if (existingUser) {
		return next(new HttpError("User exists already, please sign in", 422));
	}

	const hashedPassword = await bcrypt.hash(password, 10).catch(() => {
		return next(new HttpError("Cannot creDate user. Pleases try again", 500));
	});

	const newUser = new User({ name, email, username, hash: hashedPassword });

	newUser.save().catch(() => {
		return next(new HttpError("Cannot create user. Pleases try again", 500));
	});

	res.json("Sign in successful");
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

	res.json("Login successful");
};
