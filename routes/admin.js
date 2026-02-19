// Import Router from express
const { Router } = require("express");
const adminRouter = Router();

// Import models from database
const { adminModel, courseModel } = require("../db");

// Import admin authentication middleware
const { adminMiddleware } = require("../middelware/admin");

// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

// Import jsonwebtoken for creating tokens
const jwt = require("jsonwebtoken");

// Secret key from environment variables
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;


// =========================
// ADMIN SIGNUP
// =========================
// Endpoint: POST /admin/signup
// Registers a new admin
adminRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body;

    try {
        // Hash password before storing in database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin in database
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            message: "Admin signup successful"
        });

    } catch (err) {
        // Usually happens if email already exists
        res.status(500).json({
            message: "Admin may already exist"
        });
    }
});


// =========================
// ADMIN SIGNIN
// =========================
// Endpoint: POST /admin/signin
// Logs in admin and returns JWT token
adminRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;

    try {
        // Find admin by email
        const admin = await adminModel.findOne({ email });

        // If admin not found
        if (!admin) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);

        // If password incorrect
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        // Send token to client
        res.json({
            token: token
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});


// =========================
// CREATE COURSE
// =========================
// Endpoint: POST /admin/course
// Protected route (admin only)
// Creates a new course
adminRouter.post("/course", adminMiddleware, async function(req, res){
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    try {
        // Create course with admin as creator
        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        res.json({
            message: "Course Created",
            courseId: course._id
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating course"
        });
    }
});


// =========================
// UPDATE SINGLE COURSE
// =========================
// Endpoint: PUT /admin/course
// Protected route
// Admin can update only their own course
adminRouter.put("/course", adminMiddleware, async function(req, res){
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    try {
        await courseModel.updateOne(
            {
                _id: courseId,
                creatorId: adminId   // ensures admin owns the course
            },
            {
                title,
                description,
                imageUrl,
                price
            }
        );

        res.json({
            message: "Course Updated"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating course"
        });
    }
});


// =========================
// GET ALL COURSES BY ADMIN
// =========================
// Endpoint: GET /admin/course/bulk
// Returns all courses created by this admin
adminRouter.get("/course/bulk", adminMiddleware, async function(req, res){
    const adminId = req.userId;

    try {
        const courses = await courseModel.find({
            creatorId: adminId
        });

        res.json({
            courses
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching courses"
        });
    }
});


// Export router
module.exports = {
    adminRouter: adminRouter
};
