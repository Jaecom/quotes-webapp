const Users = require("../models/user");
const HttpError = require("../utils/HttpError");

module.exports.index = async (req, res, next) => {
	const { userId } = res.locals;

	const user = await Users.findById(userId)
		.populate("collections")
		.catch((error) => {
			next(new HttpError("Getting collection failed. Please try again later", 500));
		});

	res.json(user.collections);
};

module.exports.createCollection = async (req, res, next) => {
	const { userId } = res.locals;
	const { name, description, isPrivate } = req.body;

	const updatedUser = await Users.findByIdAndUpdate(
		userId,
		{
			$push: {
				collections: { name, description, content: [], isPrivate },
			},
		},
		{ new: true }
	).catch((error) => {
		return next(new HttpError("Creating collection failed. Please try again later.", 500));
	});

	const updatedCollection = updatedUser.collections[updatedUser.collections.length - 1];

	res.json(updatedCollection);
};
