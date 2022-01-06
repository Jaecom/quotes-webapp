const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	hash: {
		type: String,
		required: true,
	},
	likedQuotes: {
		type: [{ type: Schema.Types.ObjectId, ref: "Quote" }],
		required: true,
	},
	collections: [
		{
			name: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			quotes: {
				type: [{ type: Schema.Types.ObjectId, ref: "Quote" }],
				required: true,
			},
		},
	],
});

module.exports = mongoose.model("User", userSchema);
