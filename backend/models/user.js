import mongoose from "mongoose";
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
			},
			quotes: {
				type: [{ type: Schema.Types.ObjectId, ref: "Quote" }],
				required: true,
			},
			isPrivate: {
				type: Boolean,
				required: true,
				default: false,
			},
		},
	],
	ownedQuotes: {
		type: [{ type: Schema.Types.ObjectId, ref: "Quote" }],
		required: true,
		default: [],
	},
});

const User = mongoose.model("User", userSchema);

export default User;
