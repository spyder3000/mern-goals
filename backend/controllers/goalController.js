// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers
const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
	// const goals = await Goal.find(); // gets all of the goals
	console.log("User = " + req.user.id);
	const goals = await Goal.find({ user: req.user.id }); // gets all of the goals
	// res.status(200).json({ message: "Get Goals" });
	res.status(200).json(goals);
});

// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add a text field"); //.json({ message: "Please add a text field" });
	}
	console.log(req.body);
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(goal);
});

// @desc    Update Goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}

	// Check for user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error("User Not Found");
	}

	// check that logged in user matches the goal user -- ensures user has access to goal
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	// new: true -- create this if it doesn't exist
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedGoal);
});

// @desc    Delete Goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("Goal not found");
	}

	// Check for user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error("User Not Found");
	}

	// check that logged in user matches the goal user -- ensures user has access to goal
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	await goal.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
