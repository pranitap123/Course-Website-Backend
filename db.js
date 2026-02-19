const mongoose = require("mongoose");
//console.log("Connected to Moongoose")
//mongoose.connect("mongodb+srv://admin:smxBNltsHGRTGkfX@cluster0.ygnl0xo.mongodb.net/");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const userSchema = new Schema({

    email: String, 
    password: String,
    firstName: String,
    lastName: String
});

const adminSchema = new Schema({
email: String,
password: String,
firstName: String,
lastName: String
});

const courseSchema = new Schema({
title: String, 
description: String,
price: Number, 
imageUrl: String,
creatorId: ObjectId 
});

const purchaseSchema = new Schema({
userId: ObjectId,
courseId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.export = {
    userModel,
    adminModel, 
    courseModel,
    purchaseModel
}