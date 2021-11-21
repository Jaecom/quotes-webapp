const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: string,
		required: true,
	},
	hash: {
		type: string,
		required: true,
	},
	likeQuotes: {
		type: [{ type: Schema.Types.ObjectId, ref: "Quote" }],
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
