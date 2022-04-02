import mongoose from "mongoose";
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

const Author = mongoose.model("Author", authorSchema);

export default Author;
