import User from "../models/user.js";
import { HttpError, SchemaError } from "../utils/CustomErrors.js";
const collectionController = {};

collectionController.index = async (req, res, next) => {
	const { userId } = res.locals;

	const user = await User.findById(userId).catch(() => {
		throw new HttpError("Getting user info failed. Please try again", 500);
	});

	res.json(user.collections);
};

collectionController.getCollection = async (req, res, next) => {
	const { userId } = res.locals;
	const { collectionId } = req.params;

	const matchedResult = await User.findOne(
		{ _id: userId },
		{ _id: 0, collections: { $elemMatch: { _id: collectionId } } }
	)
		.populate("collections.quotes")
		.catch(() => {
			throw new HttpError("Getting user info failed. Please try again", 500);
		});

	const foundCollection = matchedResult.collections[0];

	res.json(foundCollection);
};

collectionController.createCollection = async (req, res, next) => {
	const { userId } = res.locals;
	const { name, description, isPrivate } = req.body;

	const user = await User.findById(userId);

	const isDupliateName = user.collections.some((element) => element.name === name);

	if (isDupliateName) {
		throw new SchemaError(
			[{ path: "name", message: `Collection with name \"${name}\" already exists` }],
			409
		);
	}

	const newCollection = { name, description, quotes: [], isPrivate };
	const userCollections = user.collections;
	userCollections.push(newCollection);

	await user.save().catch(() => {
		throw new HttpError("Creating collection failed. Please try again later.", 500);
	});

	res.json(userCollections[userCollections.length - 1]);
};

collectionController.addQuoteToCollection = async (req, res, next) => {
	const { userId } = res.locals;
	const { collectionId } = req.params;
	const { quoteId } = req.body;

	const updatedUser = await User.updateOne(
		{
			_id: userId,
			"collections._id": collectionId,
		},
		{
			$push: {
				"collections.$.quotes": quoteId,
			},
		}
	).catch(() => {
		throw new HttpError("Adding quote to collection failed. Please try again", 500);
	});

	res.json("Adding success");
};

collectionController.removeQuoteFromCollection = async (req, res, next) => {
	const { userId } = res.locals;
	const { collectionId } = req.params;
	const { quoteId } = req.body;

	const updatedUser = await User.updateOne(
		{
			_id: userId,
			"collections._id": collectionId,
		},
		{
			$pull: {
				"collections.$.quotes": quoteId,
			},
		}
	).catch(() => {
		throw new HttpError("Deleting quote from collection failed. Please try again", 500);
	});

	res.json("Removing success");
};

export default collectionController;
