// Import Router from express
// Router helps us create modular route files
const { Router } = require("express");

// Create a new router instance
const userRouter = Router();


// =========================
// USER SIGNUP ROUTE
// =========================
// Endpoint: POST /user/signup
// Used to register a new user
userRouter.post("/signup", function(req, res){
    res.json({
        message: "signup endpoint"
    });
});


// =========================
// USER SIGNIN ROUTE
// =========================
// Endpoint: POST /user/signin
// Used for user login
userRouter.post("/signin", function(req, res){
    res.json({
        message: "signin endpoint"
    });
});


// =========================
// USER PURCHASES ROUTE
// =========================
// Endpoint: GET /user/purchases
// Returns list of courses purchased by user
userRouter.get("/purchases", function(req, res){
    res.json({
        message: "Course Purchases"
    });
});


// Export the router so it can be used in index.js
module.exports = {
    userRouter: userRouter
};
