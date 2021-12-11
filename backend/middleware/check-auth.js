const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");

module.exports = (req, res, next) => {
	console.log("Checking auth");

	try {
		const token = req.headers.authorization.split(" ")[1];
		const result = jwt.verify(token, process.env.JWT_SECRET);

		if (result) {
			res.locals.userId = result.userId;
			next();
		}
	} catch (e) {
		next(new HttpError("Invalid Signature", 401));
	}
};
