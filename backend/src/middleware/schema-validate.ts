import { collectionSchema, userSchema, quoteSchema } from "../schemas.js";
import { SchemaError } from "../utils/CustomErrors.js";
import { RequestHandler } from "express";
import { ValidationError } from "joi";

const returnValidateErrorObject = (joiError: ValidationError) => {
	const msg = joiError.details.map((el) => {
		return { path: el.path[0], message: el.message };
	});
	return msg;
};

const validateUser: RequestHandler = (req, res, next) => {
	const { error } = userSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 404);
	} else {
		next();
	}
};

const validateCollection: RequestHandler = (req, res, next) => {
	const { error } = collectionSchema.validate(req.body);

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 400);
	} else {
		next();
	}
};

const validateQuote: RequestHandler = (req, res, next) => {
	if (!req.file) throw new SchemaError("Need to upload an image or insert image url", 400);

	const { error } = quoteSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 400);
	} else {
		next();
	}
};

export { validateUser, validateCollection, validateQuote, returnValidateErrorObject };
