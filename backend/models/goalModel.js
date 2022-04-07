const mongoose = require("mongoose");

// every Goal is associated with a user, so need to include user in schema;  'ref' shows us which model is associated with this
const goalSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		text: {
			type: String,
			required: [true, "Please add a text value"],
		},
	},
	{
		timestamps: true,
	}
);

// 'Goal' is name of model;  2nd param is schema
module.exports = mongoose.model("Goal", goalSchema);
