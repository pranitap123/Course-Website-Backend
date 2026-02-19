// Load environment variables from .env file
require("dotenv").config();

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

// Middleware to parse JSON request bodies
app.use(express.json());

// Attach routers to specific base paths

// All user-related routes will start with /user
app.use("/user", userRouter);

// All course-related routes will start with /course
app.use("/course", courseRouter);

// All admin-related routes will start with /admin
app.use("/admin", adminRouter);


// =========================
// SERVER START LOGIC
// =========================

// Function to start server only after MongoDB connects
async function main(){

    // Connect to MongoDB using environment variable
    await mongoose.connect(process.env.MONGO_URL);

    // Start server on port from .env
    app.listen(process.env.PORT, () => {
        console.log("Server running on port " + process.env.PORT);
    });
}

// Call the main function
main();
