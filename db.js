// Import mongoose library to work with MongoDB
const mongoose = require("mongoose");

// console.log("Connected to Moongoose")
// (This line would only print text, not actually connect)

// Old direct connection string (now should be handled using dotenv)
// mongoose.connect("mongodb+srv://admin:password@cluster.mongodb.net/");

// Extract Schema constructor from mongoose
// Schema defines the structure of documents in a collection
const Schema = mongoose.Schema;

// ObjectId type used for references between collections
const ObjectId = mongoose.Types.ObjectId;


// =========================
// USER SCHEMA
// =========================
// Defines structure of user documents
const userSchema = new Schema({

    // Email must be unique for each user
    email: { type: String, unique: true },

    // Hashed password will be stored here
    password: String,

    // User's first name
    firstName: String,

    // User's last name
    lastName: String
});


// =========================
// ADMIN SCHEMA
// =========================
// Defines structure of admin documents
const adminSchema = new Schema({

    // Admin email must also be unique
    email: { type: String, unique: true },

    // Hashed password
    password: String,

    // Admin first name
    firstName: String,

    // Admin last name
    lastName: String
});


// =========================
// COURSE SCHEMA
// =========================
// Defines structure of course documents
const courseSchema = new Schema({

    // Title of the course
    title: String,

    // Course description
    description: String,

    // Price of the course
    price: Number,

    // Image URL for course thumbnail
    imageUrl: String,

    // Reference to the admin who created the course
    creatorId: ObjectId
});


// =========================
// PURCHASE SCHEMA
// =========================
// Stores which user bought which course
const purchaseSchema = new Schema({

    // ID of the user who purchased the course
    userId: ObjectId,

    // ID of the purchased course
    courseId: ObjectId
});


// =========================
// MODEL CREATION
// =========================
// Models are used to interact with collections in MongoDB

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


// =========================
// EXPORT MODELS
// =========================
// So they can be used in other files (routes, controllers, etc.)
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};
