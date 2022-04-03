const express = require("express");
const router = express.Router();
const {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
} = require("../controllers/goalController");

// router.get("/", getGoals);
// router.post("/", setGoal);
router.route("/").get(getGoals).post(setGoal); // consolidates prev 2 calls into 1 call

// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);
router.route("/:id").delete(deleteGoal).put(updateGoal); // consolidate 2 prev lines into 1 call

module.exports = router;
