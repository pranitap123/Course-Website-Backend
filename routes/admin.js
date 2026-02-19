const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middelware/admin");

adminRouter.post("/signup", function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/signin", function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

adminRouter.post("/course", adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    await courseModel.create({
        title,
         description, 
         imageUrl,
          price,
           adminId
    })
    res.json({
        message: "Course Created",
        courseId: course._id
    })
})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        courseId: adminId
    }, {
        title,
        description,
        imageUrl,
        price,
        courseId
    })
    res.json({
        message:"Course Updated",
        courseId: course._id
    })
})

adminRouter.put("/course/bulk",adminMiddleware,async function(req,res){
   const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.find({
        creatorId: adminId
    
    })
    res.json({
        message:"Course Updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}