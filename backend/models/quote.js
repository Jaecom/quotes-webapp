import mongoose from "mongoose";
import Author from "../models/author.js";
import User from "./user.js";
const { Schema } = mongoose;

const KEY_WORD_COUNT = 3;
const PREVIEW_WORD_COUNT = 18;

const schemaOptions = {
	toJSON: {
		virtuals: true,
	},
};

const quoteSchema = new Schema(
	{
		quoteRaw: {
			type: String,
			required: true,
		},
		author: {
			authorObject: { type: Schema.Types.ObjectId, ref: "Author" },
			name: { type: String, required: true },
		},
		title: {
			type: String,
			required: true,
		},
		genre: {
			type: [String],
			require: true,
			default: [],
		},
		createdDate: {
			type: Date,
			default: Date.now(),
		},
		image: {
			original: {
				type: String,
				require: true,
			},
			medium: {
				type: String,
				require: true,
			},
			thumbnail: {
				type: String,
				require: true,
			},
		},
		likes: {
			users: {
				type: [{ type: Schema.Types.ObjectId, ref: "User" }],
				required: true,
				default: [],
			},
			total: {
				type: Number,
				required: true,
				default: 0,
			},
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	schemaOptions
);

quoteSchema.pre("save", async function (next) {
	const existingAuthor = await Author.findOne({ info: { name: this.author.name } });

	if (existingAuthor) {
		//set the autor object of quote to be saved
		this.author.authorObject = existingAuthor.id;

		//update existing author - quotes array
		await Author.updateOne(
			{ id: existingAuthor.id },
			{ $push: { quotes: this.id } },
			{ new: true }
		);
		return next();
	}

	const newAuthor = new Author({
		quotes: [this.id],
		info: {
			name: this.author.name,
		},
	});

	this.author.authorObject = newAuthor.id;

	await newAuthor.save();
	return next();
});

quoteSchema.pre("save", async function (next) {
	const foundUser = await User.findOneAndUpdate(
		{ id: this.owner },
		{ $push: { ownedQuotes: this.id } }
	);

	if (foundUser) {
		return next();
	}
});

quoteSchema.virtual("quoteFull").get(function () {
	return this.quoteRaw.replace(/<|>/g, "");
});

quoteSchema.virtual("quoteShort").get(function () {
	const startMarkerIndex = this.quoteRaw.indexOf("<") + 1;
	const endMarkerIndex = this.quoteRaw.indexOf(">");
	return this.quoteRaw.slice(startMarkerIndex, endMarkerIndex);
});

quoteSchema.virtual("keywords").get(function () {
	return this.quoteShort.split(" ").slice(0, KEY_WORD_COUNT).join(" ");
});

quoteSchema.virtual("excludeKeywords").get(function () {
	return this.quoteShort.split(" ").slice(KEY_WORD_COUNT).join(" ");
});

quoteSchema.virtual("previewQuote").get(function () {
	return this.quoteShort.split(" ").slice(0, PREVIEW_WORD_COUNT).join(" ");
});

quoteSchema.index({ title: "text", "author.name": "text", genre: "text" });

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
