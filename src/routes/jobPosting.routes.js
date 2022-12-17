const { application } = require('express');
const express = require('express');
const JobsModel = require('../models/list.model');
const JobRouter = express.Router();



JobRouter.get("/",(req,res)=>{
    res.send("Hello")
})


JobRouter.post("/addPost" , async (req,res)=>{
    const {company,city,location,role,level,contract,position,language} = req.body;
    let d = new Date()
    var postedAt = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    try {
        let data = new JobsModel({company,city,location,role,level,contract,position,language,postedAt})
        await data.save();
        res.status(200).send("Data Added SuccessFully")    
    } catch (error) {
        res.send({"Error":error})
    }

})


JobRouter.get("/getPost" , async(req,res)=>{
    const {page=1,limit=10,order="asc"} = req.query
    const data =  await JobsModel.find({}).sort({["postedAt"]:order==="asc"? -1:1}).skip((page-1)*limit).limit(limit);
    res.status(200).send(data)
})


JobRouter.get("/search",async (req,res)=>{
    let {language} = req.query;
    try{
        let data = await JobsModel.find({ "language" : { "$regex": language , "$options": "i" }})
        console.log(data)
        res.status(200).send(data)
    }catch(err){
        res.send(err)
    }
})

JobRouter.get("/filter",async (req,res)=>{
    let {role} = req.query;
    let data = await JobsModel.find({role:role})
    res.status(200).send(data)

})

module.exports = JobRouter;