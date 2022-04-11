const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler"); // to handle exceptions
const User = require("../models/userModel");

// @desc    Register New User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}
	// Check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Hash Password (bcrypt)
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check for User email
	const user = await User.findOne({ email });

	// use bcrypt.compare to compare text password from user vs hashed pwd stored in MongoDB
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
	// --- Code here is unnecessary -- we already have what we need in req.user
	// const { _id, name, email } = await User.findById(req.user.id);
	// res.status(200).json({
	// 	id: _id,
	// 	name,
	// 	email,
	// });
	// req.user is set for us in the middleware authMiddleware.js
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
	// sign a new token w/ the id passed in, using the secret in param 2, & expires in 30 days
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
