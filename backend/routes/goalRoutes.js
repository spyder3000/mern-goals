const express = require("express");
const router = express.Router();
const {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
} = require("../controllers/goalController");

// add middleware to authenticate user for Goals
const { protect } = require("../middleware/authMiddleware");

// router.get("/", getGoals);
// router.post("/", setGoal);
// Add 'protect' as 1st param as middleware to first authenticate
router.route("/").get(protect, getGoals).post(protect, setGoal); // consolidates prev 2 calls into 1 call

// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal); // consolidate 2 prev lines into 1 call

module.exports = router;
