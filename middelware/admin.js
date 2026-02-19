const jwt = require("jsonwebtoken");

// Secret key from .env
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

function adminMiddleware(req, res, next) {

  // Get token from headers
  const token = req.headers.token;

  // If token not provided
  if (!token) {
    return res.status(403).json({
      message: "Token missing"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    // Store admin id in request
    req.userId = decoded.id;

    // Move to next middleware or route
    next();

  } catch (err) {
    // If token invalid or expired
    res.status(403).json({
      message: "You are not signed in!"
    });
  }
}

module.exports = {
  adminMiddleware
};
