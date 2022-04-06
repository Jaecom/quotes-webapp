import mongoose from "mongoose";
import Author from "./author.js";
import User from "./user.js";
import type { Quote as QuoteType } from "@frontend/src/data-type";

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
		text: {
			raw: String,
			full: String,
			short: String,
			keywords: String,
			noKeywords: String,
			preview: String,
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
		views: {
			type: Number,
			default: 0,
		},
	},
	schemaOptions
);

quoteSchema.pre("save", async function (next) {
	this.text.full = this.text.raw.replace(/<|>/g, "");
	this.text.short = this.text.raw.match(/(?<=<).*(?=>)/)[0];
	this.text.preview = this.text.short.split(" ").slice(0, PREVIEW_WORD_COUNT).join(" ");
	this.text.keywords = this.text.short.split(" ").slice(0, KEY_WORD_COUNT).join(" ");
	this.text.noKeywords = this.text.short.split(" ").slice(KEY_WORD_COUNT).join(" ");
	next();
});

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
	const updatedUser = await User.updateOne(
		{ _id: this.owner },
		{ $push: { ownedQuotes: this.id } }
	);

	return next();
});

quoteSchema.index({ title: "text", "author.name": "text", genre: "text" });

const Quote = mongoose.model<QuoteType>("Quote", quoteSchema);

export default Quote;
