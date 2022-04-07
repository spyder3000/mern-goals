const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name value"],
		},
		email: {
			type: String,
			required: [true, "Please add an email value"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
	},
	{
		timestamps: true,
	}
);

// 'User' is name of model;  2nd param is schema
module.exports = mongoose.model("User", userSchema);
