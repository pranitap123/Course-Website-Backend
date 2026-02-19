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

adminRouter.put("/course", function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

adminRouter.put("/course/bulk", function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}