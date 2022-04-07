const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// requests are sent in HTTP headers with authorization object
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// typical format is -- Bearer adslwqtthas;  if-stmt verifies this is a Bearer token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header;  remove 'Bearer ' from string
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from the token by id;  decoded.id traces back to jwt.sign({ id } ... that set this originally
			// Because user id is included in Token, any request that accesses this middleware will have access to req.user (as populated here)
			req.user = await User.findById(decoded.id).select("-password"); // excludes password from being captured
			console.log("req.user (middleware) = " + req.user);
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error("not Authorized");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("not Authorized, No Token");
	}
});

module.exports = { protect };
