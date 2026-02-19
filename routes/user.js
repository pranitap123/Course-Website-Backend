// Import Router from express
// Router helps us create modular route files
const { Router } = require("express");

// Import user model from database file
const { userModel } = require("../db");

// Import bcrypt for password hashing
const bcrypt = require("bcrypt");

// Import zod for request validation
const { z } = require("zod");

// Create a new router instance
const userRouter = Router();

const jwt = require("jsonwebtoken");

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;



// =========================
// ZOD VALIDATION SCHEMA
// =========================
// This schema defines the expected structure of signup data
const signupSchema = z.object({
    email: z.string().email(),          // must be a valid email
    password: z.string()
        .min(8)                         // minimum length 8
        .regex(/[a-z]/, "Must contain lowercase")
        .regex(/[A-Z]/, "Must contain uppercase")
        .regex(/[0-9]/, "Must contain number")
        .regex(/[^A-Za-z0-9]/, "Must contain special character"),
    firstName: z.string().min(2),
    lastName: z.string().min(2)
});


// =========================
// USER SIGNUP ROUTE
// =========================
// Endpoint: POST /user/signup
// Used to register a new user
userRouter.post("/signup", async function(req, res){

    // Validate request body using Zod
    const parsedData = signupSchema.safeParse(req.body);

    // If validation fails
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsedData.error.issues
        });
    }

    // Extract validated data
    const { email, password, firstName, lastName } = parsedData.data;

    try {
        // Hash the password before storing
        // 10 = salt rounds (recommended)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in database
        await userModel.create({
            email: email,
            password: hashedPassword, // store hashed password
            firstName: firstName,
            lastName: lastName
        });

        res.json({
            message: "Signup successful"
        });

    } catch (err) {
        // Handle errors (duplicate email, DB issues, etc.)
        res.status(500).json({
            message: "User may already exist or database error"
        });
    }
});


// =========================
// USER SIGNIN ROUTE
// =========================
// Endpoint: POST /user/signin
// Used for user login
// =========================
// USER SIGNIN ROUTE
// =========================
// Endpoint: POST /user/signin
// Used for user login
userRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;

    try {
        // Find user only by email
        const user = await userModel.findOne({ email });

        // If user not found
        if (!user) {
            return res.status(403).json({
                message: "Incorrect Credentials"
            });
        }

        // Compare entered password with hashed password in DB
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If password does not match
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Incorrect Credentials"
            });
        }

        // If credentials are correct, create JWT token
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        // Send token to client
        res.json({
            token: token
        });

    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({
            message: "Server error"
        });
    }
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
