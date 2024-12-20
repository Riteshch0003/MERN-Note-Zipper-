const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object (excluding the password)
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = protect;
