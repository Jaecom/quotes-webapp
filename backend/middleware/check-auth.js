const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils/CustomErrors");

module.exports = (req, res, next) => {
	try {
		const { token } = req.cookies;
		const result = jwt.verify(token, process.env.JWT_SECRET);

		if (result) {
			res.locals.userId = result.userId;
			next();
		}
	} catch (e) {
		next(new HttpError("Invalid Signature", 401));
	}
};
