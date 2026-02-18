const express = require("express");

const app = express();

app.post("/users/signup", function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

app.post("/users/signin", function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

app.get("/users/purchases", function(req,res){
    res.json({
        message: "Course Purchases"
    })
})

app.post("/course/purchase", function(req,res){
    res.json({
        message: "Purchased course"
    })
})

app.get("/courses", function(req,res){
    res.json({
        message: "Courses Available"
    })
})

app.listen(3000);
