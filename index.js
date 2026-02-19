// Import express framework
const express = require("express");

// Import routers from different route files
// Each router contains related API endpoints
const { userRouter } = require("./routes/user");     // Routes related to users
const { courseRouter } = require("./routes/course"); // Routes related to courses
const { adminRouter } = require("./routes/admin");   // Routes related to admin actions

// Create express application
const app = express();

// =========================
// MIDDLEWARE
// =========================
// Attach routers to specific base paths

// All user-related routes will start with /user
// Example: /user/signup, /user/signin
app.use("/user", userRouter);

// All course-related routes will start with /course
// Example: /course/purchase, /course/list
app.use("/course", courseRouter);

// All admin-related routes will start with /admin
// Example: /admin/create-course, /admin/delete-course
app.use("/admin", adminRouter);


// =========================
// START SERVER
// =========================
// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
