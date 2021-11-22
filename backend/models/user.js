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
	likeQuotes: {
		type: [{ type: Schema.Types.ObjectId, ref: "Quote" }],
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);