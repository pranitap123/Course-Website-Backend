// Load environment variables from .env file
// This makes variables like MONGO_URL and PORT available via process.env
require("dotenv").config();

// Import express framework
const express = require("express");

// Import mongoose to connect with MongoDB
const mongoose = require("mongoose");

// Import routers from different route files
// Each router contains related API endpoints
const { userRouter } = require("./routes/user");     // User-related routes
const { courseRouter } = require("./routes/course"); // Course-related routes
const { adminRouter } = require("./routes/admin");   // Admin-related routes

// Create express application
const app = express();


// =========================
// GLOBAL MIDDLEWARE
// =========================

// Middleware to parse JSON request bodies
// Without this, req.body will be undefined
app.use(express.json());


// =========================
// ROUTE MOUNTING
// =========================

// All user-related routes will start with /user
// Example: POST /user/signup
app.use("/user", userRouter);

// All course-related routes will start with /course
// Example: GET /course/preview
app.use("/course", courseRouter);

// All admin-related routes will start with /admin
// Example: POST /admin/signin
app.use("/admin", adminRouter);


// =========================
// SERVER START LOGIC
// =========================

// Function to start server only after MongoDB connects
async function main(){
    try {
        // Connect to MongoDB using connection string from .env
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Connected to MongoDB");

        // Start server on port from .env
        app.listen(process.env.PORT, () => {
            console.log("Server running on port " + process.env.PORT);
        });

    } catch (err) {
        // If database connection fails
        console.error("Database connection failed:", err);
    }
}

// Call the main function
main();
