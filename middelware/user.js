// Import jsonwebtoken library
// Used to verify JWT tokens
const jwt = require("jsonwebtoken");

// Secret key from .env file
// Used to verify user tokens
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;


// =========================
// USER AUTH MIDDLEWARE
// =========================
// This middleware protects user-only routes
// It checks whether the user is logged in

function userMiddleware(req, res, next) {

  // Get token from request headers
  // Expected header:
  // token: <JWT_TOKEN>
  const token = req.headers.token;

  // If token is missing
  if (!token) {
    return res.status(403).json({
      message: "Token missing"
    });
  }

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    // Store user ID from token into request object
    req.userId = decoded.id;

    // Move to next middleware or route
    next();

  } catch (err) {
    // If token is invalid or expired
    res.status(403).json({
      message: "You are not signed in!"
    });
  }
}

// Export middleware so it can be used in user routes
module.exports = {
  userMiddleware
};
