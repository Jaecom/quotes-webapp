import User from "../models/user.js";
import { HttpError, SchemaError } from "../utils/CustomErrors.js";
import { RequestHandler } from "express";
import type { Collection } from "@frontend/src/data-type.js";

const index: RequestHandler = async (req, res, next) => {
	const { userId } = res.locals;

	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError("Getting user info failed. Please try again", 500);
	}

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

	if (!matchedResult) {
		throw new HttpError("Cannot find collection", 400);
	}

	const foundCollection = matchedResult.collections[0];

	res.json(foundCollection);
};

const createCollection: RequestHandler = async (req, res, next) => {
	const { userId } = res.locals;
	const { name, description, isPrivate } = req.body;
	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError("Cannot find user", 400);
	}

	const isDupliateName = user.collections.some(
		(element: any) => element.name === name
	);

	if (isDupliateName) {
		throw new SchemaError(
			[
				{
					path: "name",
					message: `Collection with name \"${name}\" already exists`,
				},
			],
			409
		);
	}

	const newCollection = { name, description, quotes: [], isPrivate };
	const userCollections = user.collections;
	//@ts-ignore
	userCollections.push(newCollection);

	await user.save().catch(() => {
		throw new HttpError(
			"Creating collection failed. Please try again later.",
			500
		);
	});

	res.json(userCollections[userCollections.length - 1]);
};

const editCollection: RequestHandler = async (req, res, next) => {
	const { userId } = res.locals;
	const { collectionId } = req.params;
	const newCollection = req.body;

	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError("Something went wrong", 404);
	}

	const isDupliateName = user.collections.some((element: Collection) => {
		//exclude itself from comparison
		return (
			element.name === newCollection.name &&
			element._id!.toString() !== collectionId
		);
	});

	if (isDupliateName) {
		throw new SchemaError(
			[
				{
					path: "name",
					message: `Collection with name \"${newCollection.name}\" already exists`,
				},
			],
			409
		);
	}

	const indexOf = user.collections.findIndex(
		(element: Collection) => element._id!.toString() === collectionId
	);

	console.log(indexOf);
	console.log(newCollection);

	user.collections[indexOf].name = newCollection.name;
	user.collections[indexOf].description = newCollection.description;
	user.collections[indexOf].isPrivate = newCollection.isPrivate ?? false;

	console.log(user);

	await user.save().catch((e) => {
		throw new HttpError("Editing collection failed. Please try again.", 500);
	});

	res.json({ collection: user.collections });
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
		throw new HttpError(
			"Adding quote to collection failed. Please try again",
			500
		);
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
		throw new HttpError(
			"Deleting quote from collection failed. Please try again",
			500
		);
	});

	res.json("Removing success");
};

export default {
	getCollection,
	index,
	createCollection,
	editCollection,
	addQuoteToCollection,
	removeQuoteFromCollection,
};
