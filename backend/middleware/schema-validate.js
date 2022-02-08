import { collectionSchema, userSchema, quoteSchema } from "../schemas.js";
import { SchemaError } from "../utils/CustomErrors.js";

const returnValidateErrorObject = (joiError) => {
	const msg = joiError.details.map((el) => {
		return { path: el.path[0], message: el.message };
	});
	return msg;
};

const validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 404);
	} else {
		next();
	}
};

const validateCollection = (req, res, next) => {
	const { error } = collectionSchema.validate(req.body);

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 400);
	} else {
		next();
	}
};

const validateQuote = (req, res, next) => {
	if (!req.file) throw new SchemaError("need to upload a image", 400);

	const { error } = quoteSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 400);
	} else {
		next();
	}
};

export { validateUser, validateCollection, validateQuote, returnValidateErrorObject };
