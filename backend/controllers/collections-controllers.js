const Users = require("../models/user");
const { HttpError } = require("../utils/CustomErrors");

module.exports.index = async (req, res, next) => {
	const { userId } = res.locals;

	const user = await Users.findById(userId).catch((error) => {
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
				collections: { name, description, quotes: [], isPrivate },
			},
		},
		{ new: true }
	).catch((error) => {
		return next(new HttpError("Creating collection failed. Please try again later.", 500));
	});

	const updatedCollection = updatedUser.collections[updatedUser.collections.length - 1];

	res.json(updatedCollection);
};

module.exports.addQuoteToCollection = async (req, res, next) => {
	const { userId } = res.locals;
	const { collectionId } = req.params;
	const { quoteId } = req.body;

	const updatedUser = await Users.updateOne(
		{
			_id: userId,
			"collections._id": collectionId,
		},
		{
			$push: {
				"collections.$.quotes": quoteId,
			},
		}
	).catch((error) =>
		next(new HttpError("Adding quote to collection failed. Please try again", 500))
	);

	res.json("Adding success");
};

module.exports.removeQuoteFromCollection = async (req, res, next) => {
	const { userId } = res.locals;
	const { collectionId } = req.params;
	const { quoteId } = req.body;

	const updatedUser = await Users.updateOne(
		{
			_id: userId,
			"collections._id": collectionId,
		},
		{
			$pull: {
				"collections.$.quotes": quoteId,
			},
		}
	).catch((error) =>
		next(new HttpError("Deleting quote from collection failed. Please try again", 500))
	);

	res.json("Adding success");
};
