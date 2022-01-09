const { userSchema, collectionSchema } = require("../schemas");
const { SchemaError } = require("../utils/CustomErrors");

const returnValidateErrorObject = (joiError) => {
	const msg = joiError.details.map((el) => {
		return { path: el.path[0], message: el.message };
	});
	console.log(msg);
	return msg;
};

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body, { abortEarly: false });

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 404);
	} else {
		next();
	}
};

module.exports.validateCollection = (req, res, next) => {
	const { error } = collectionSchema.validate(req.body);

	if (error) {
		const msg = returnValidateErrorObject(error);
		throw new SchemaError(msg, 400);
	} else {
		next();
	}
};
