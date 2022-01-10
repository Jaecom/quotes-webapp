const Joi = require("joi");

//at least one alphabet, number, and special character
//with minium 8 digits
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//for development
// const passwordRegex = /^.*$/;

module.exports.userSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.base": `Username should include text`,
		"string.empty": `Username can't be blank`,
		"string.email": `Please enter valid email address`,
		"string.required": `Username is required`,
	}),
	username: Joi.string().min(3).max(30).required().messages({
		"string.base": `Username should include text`,
		"string.empty": `Username can't be blank`,
		"string.min": `Username should have at least {#limit} letters`,
		"string.max": `Username should have less than {#limit} letters`,
		"string.required": `Username is required`,
	}),
	password: Joi.string().pattern(passwordRegex).messages({
		"string.base": `Password should be text`,
		"string.empty": `Password can't be blank`,
		"string.pattern.base": `Password should have at least one letter, number, and special character`,
	}),
	name: Joi.string().messages({
		"string.base": `Name should be text`,
		"string.empty": `Name can't be blank`,
	}),
});

module.exports.collectionSchema = Joi.object({
	name: Joi.string().max(30).required().messages({
		"string.base": `Name of collection should include text`,
		"string.empty": `Name of collection can't be blank`,
		"string.max": `Name of collection should have less than {#limit} letters`,
		"string.required": `Name of collection is required`,
	}),
	description: Joi.string().allow(""),
	isPrivate: Joi.boolean(),
});
