// Import express framework
const express = require("express");

// Import mongoose to connect with MongoDB
const mongoose = require("mongoose");

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
// (Global middleware should be placed here if needed)
// Example: app.use(express.json());

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
// SERVER START LOGIC
// =========================

// This block was the normal way to start the server
// But it does not ensure MongoDB is connected first
/*
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
*/


// Function to start server only after MongoDB connects
// This prevents the app from running if database connection fails
async function main(){

    // Connect to MongoDB Atlas cluster
    await mongoose.connect("mongodb+srv://admin:smxBNltsHGRTGkfX@cluster0.ygnl0xo.mongodb.net/");

    // Start the server after successful DB connection
    app.listen(3000);

    // Log message to confirm server is running
    console.log("Server running on port 3000");
}

// Call the main function
main();
