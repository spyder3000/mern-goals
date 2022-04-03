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

// Middleware to override default Express Error handler
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
