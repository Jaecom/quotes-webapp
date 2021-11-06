const mongoose = require("mongoose");
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

module.exports = mongoose.model("Author", authorSchema);
