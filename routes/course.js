const { Router } = require("express");
const courseRouter = Router();


courseRouter.post("/purchase", function(req,res){
    res.json({
        message: "Purchased course"
    })
})

courseRouter.get("/preview", function(req,res){
    res.json({
        message: "Courses Available"
    })
})



module.exports = {
    courseRouter: courseRouter
}