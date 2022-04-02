import jwt from "jsonwebtoken";
import { HttpError } from "../utils/CustomErrors.js";
import { RequestHandler } from "express";

interface TokenPayload extends jwt.JwtPayload {
	userId: string;
}

const checkAuth: RequestHandler = (req, res, next) => {
	try {
		const { token } = req.cookies;
		const result = jwt.verify(token, process.env.JWT_SECRET || "") as TokenPayload;

		if (result) {
			res.locals.userId = result.userId;
			res.locals.expirationDate = result.exp;
			next();
		}
	} catch (e) {
		next(new HttpError("Invalid Signature", 401));
	}
};

export default checkAuth;
