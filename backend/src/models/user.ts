import mongoose from "mongoose";
import type { User as UserType } from "@frontend/src/data-type";

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
		default: [],
	},
	profilePicture: {
		type: String,
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
				default: [],
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

const User = mongoose.model<UserType>("User", userSchema);

export default User;
