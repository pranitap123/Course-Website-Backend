// Import mongoose
const mongoose = require("mongoose");

// Extract Schema and ObjectId
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


// =========================
// USER SCHEMA
// =========================
const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});


// =========================
// ADMIN SCHEMA
// =========================
const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});


// =========================
// COURSE SCHEMA
// =========================
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
});


// =========================
// PURCHASE SCHEMA
// =========================
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});


// =========================
// MODELS
// =========================
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


// =========================
// EXPORT MODELS
// =========================
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};
