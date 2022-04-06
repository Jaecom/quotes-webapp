import mongoose from "mongoose";
import { Author as AuthorType } from "@frontend/src/data-type";
const { Schema } = mongoose;

const schemaOptions = {
	toJSON: {
		virtuals: true,
	},
};

const authorSchema = new Schema(
	{
		quotes: {
			type: [{ type: Schema.Types.ObjectId, ref: "Quote" }],
			required: true,
			default: [],
		},
		works: {},
		info: {
			name: {
				type: String,
				required: true,
			},
		},
	},
	schemaOptions
);

const Author = mongoose.model<AuthorType>("Author", authorSchema);

export default Author;
