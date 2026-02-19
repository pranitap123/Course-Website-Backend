// Import jsonwebtoken library
// Used for verifying JWT tokens
const jwt = require("jsonwebtoken");

// Secret key loaded from .env file
// Used to verify admin tokens
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;


// =========================
// ADMIN AUTH MIDDLEWARE
// =========================
// This middleware protects admin-only routes
// It checks whether the admin is logged in

function adminMiddleware(req, res, next) {

  // Get token from request headers
  // Expected header:
  // token: <JWT_TOKEN>
  const token = req.headers.token;

  // If token is not provided
  if (!token) {
    return res.status(403).json({
      message: "Token missing"
    });
  }

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    // If token is valid, store admin ID in request object
    // This allows next routes to know which admin is logged in
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

// Export middleware so it can be used in admin routes
module.exports = {
  adminMiddleware
};
