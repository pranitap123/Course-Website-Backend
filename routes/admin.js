const { Router } = require("express");
const adminRouter = Router();

const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middelware/admin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;


// =========================
// ADMIN SIGNUP
// =========================
adminRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body;

    try {
        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

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
        res.status(500).json({
            message: "Admin may already exist"
        });
    }
});


// =========================
// ADMIN SIGNIN
// =========================
adminRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;

    try {
        // Find admin by email
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        // Send token
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
adminRouter.post("/course", adminMiddleware, async function(req, res){
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    // Create course
    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId   // fixed field name
    });

    res.json({
        message: "Course Created",
        courseId: course._id
    });
});


// =========================
// UPDATE SINGLE COURSE
// =========================
adminRouter.put("/course", adminMiddleware, async function(req, res){
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    await courseModel.updateOne(
        {
            _id: courseId,
            creatorId: adminId   // fixed condition
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
});


// =========================
// GET ALL COURSES BY ADMIN
// =========================
adminRouter.get("/course/bulk", adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        courses
    });
});

module.exports = {
    adminRouter: adminRouter
};
