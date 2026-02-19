// Import Router from express
// Used to create modular route files
const { Router } = require("express");

// Create a new router instance
const courseRouter = Router();


// =========================
// PURCHASE COURSE
// =========================
// Endpoint: POST /course/purchase
// This route will allow a user to purchase a course
// (Currently just returns a placeholder message)
courseRouter.post("/purchase", function(req, res){
    res.json({
        message: "Purchased course"
    });
});


// =========================
// PREVIEW COURSES
// =========================
// Endpoint: GET /course/preview
// Returns list of available courses
// (Currently just a placeholder response)
courseRouter.get("/preview", function(req, res){
    res.json({
        message: "Courses Available"
    });
});


// Export router so it can be used in index.js
module.exports = {
    courseRouter: courseRouter
};
