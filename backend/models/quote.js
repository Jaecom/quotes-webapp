const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaOptions = {
	toJSON: {
		virtuals: true,
	},
};

const quoteSchema = new Schema(
	{
		quoteFull: {
			type: String,
			required: true,
		},
		quoteShort: {
			type: String,
			required: true,
		},
		author: {
			authorObject: { type: Schema.Types.ObjectId, ref: "Author" },
			name: { type: String, required: true },
		},
		source: {
			type: String,
			required: true,
		},
		genre: {
			type: [String],
			require: true,
		},
		image: {
			type: String,
			require: true,
		},
	},
	schemaOptions
);

function extractKeywords(string, wordCount) {
	const keywords = string.split(" ").slice(0, wordCount).join(" ");
	const quote = string.split(" ").slice(wordCount).join(" ");
	return [keywords, quote];
}

quoteSchema.virtual("keywords").get(function () {
	return extractKeywords(this.quoteShort, 3)[0];
});

quoteSchema.virtual("excludeKeywords").get(function () {
	return extractKeywords(this.quoteShort, 3)[1];
});

quoteSchema.virtual("previewQuote").get(function () {
	const previewQuote = this.quoteShort
		.split(" ")
		.filter((element, index) => index < 18)
		.join(" ");

	return previewQuote;
});

quoteSchema.index({ source: "text", quoteFull: "text", "author.name": "text" });

module.exports = mongoose.model("Quote", quoteSchema);
