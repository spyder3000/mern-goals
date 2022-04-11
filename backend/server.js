const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000; // found in .env

connectDB();

const app = express();

// middleware to allow parsing of Body data -- e.g. req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
	// set static folder -- where react builds out the static assets
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	// for any routes (except our api routes already handled above)
	app.get("*", (req, res) =>
		res.sendFile(
			path.resolve(__dirname, "../", "frontend", "build", "index.html")
		)
	);
} else {
	app.get("/", (req, res) => res.send("Please set to production"));
}

// Middleware to override default Express Error handler
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
