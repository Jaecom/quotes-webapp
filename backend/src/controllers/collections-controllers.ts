import User from "../models/user.js";
import { HttpError, SchemaError } from "../utils/CustomErrors.js";
import { RequestHandler } from "express";

const index: RequestHandler = async (req, res, next) => {
	const { userId } = res.locals;

	const user = await User.findById(userId).catch(() => {
		throw new HttpError("Getting user info failed. Please try again", 500);
	});

	res.json(user.collections);
};

const getCollection: RequestHandler = async (req, res, next) => {
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

const createCollection: RequestHandler = async (req, res, next) => {
	const { userId } = res.locals;
	const { name, description, isPrivate } = req.body;

	const user = await User.findById(userId);

	const isDupliateName = user.collections.some((element: any) => element.name === name);

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

const addQuoteToCollection: RequestHandler = async (req, res, next) => {
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

const removeQuoteFromCollection: RequestHandler = async (req, res, next) => {
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

export default {
	getCollection,
	index,
	createCollection,
	addQuoteToCollection,
	removeQuoteFromCollection,
};
