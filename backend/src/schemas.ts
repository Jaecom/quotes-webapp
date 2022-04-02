import Joi from "joi";

//at least one alphabet, number, and special character
//with minium 8 digits
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//for development
const passwordRegex = /^.*$/;

const userSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.base": `Email should include text`,
		"string.empty": `Email can't be blank`,
		"string.email": `Please enter valid email address`,
		"string.required": `Email is required`,
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

const collectionSchema = Joi.object({
	name: Joi.string().max(30).required().messages({
		"string.base": `Name of collection should include text`,
		"string.empty": `Name of collection can't be blank`,
		"string.max": `Name of collection should have less than {#limit} letters`,
		"string.required": `Name of collection is required`,
	}),
	description: Joi.string().allow(""),
	isPrivate: Joi.boolean(),
});

const quoteSchema = Joi.object({
	quote: Joi.string()
		.required()
		.custom((value, helpers) => {
			const match = value.match(/<.*>/);

			if (!match) {
				return helpers.message({custom: "Quote must be enclosed with '<' and '>' characters"});
			}

			const leftArrowCount = value.match(/</g)?.length;
			const rightArrowCount = value.match(/>/g)?.length;

			if (leftArrowCount !== 1 || rightArrowCount !== 1) {
				return helpers.message({custom: "Cannot have more than one '<' and '>' characters"});
			}

			return true;
		})
		.messages({
			"string.base": `Quote should include text`,
			"string.empty": `Quote cannot be empty`,
		}),
	author: Joi.string().required().messages({
		"strinag.base": `Author should include text`,
		"string.empty": `Author cannot be empty`,
	}),
	imageUrl: Joi.string().uri().allow(null, "").messages({
		"string.uri": `Image url is broken`,
	}),
	title: Joi.string().required().messages({
		"string.base": `Title should include text`,
		"string.empty": `Title cannot be empty`,
	}),
	genre: Joi.string().required().messages({
		"string.base": `Genre should include text`,
		"string.empty": `Genre cannot be empty`,
	}),
});

export { userSchema, collectionSchema, quoteSchema };
