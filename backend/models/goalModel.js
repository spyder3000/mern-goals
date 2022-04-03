const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
	{
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
