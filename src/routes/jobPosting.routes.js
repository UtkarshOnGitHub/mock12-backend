const { application } = require('express');
const express = require('express');
const JobsModel = require('../models/list.model');
const JobRouter = express.Router();



JobRouter.get("/",(req,res)=>{
    res.send("Hello")
})


JobRouter.post("/addPost" , async (req,res)=>{
    const {company,city,location,role,level,contract,position,language} = req.body;
    let d = new Date().toString()
    d = d.split(" ")
    var postedAt = `${d[2]}-${d[1]}-${d[3]}`
    try {
        let data = new JobsModel({company,city,location,role,level,contract,position,language,postedAt})
        await data.save();
        res.status(200).send("Data Added SuccessFully")    
    } catch (error) {
        res.send({"Error":error})
    }

})


JobRouter.get("/getPost" , async(req,res)=>{
    const data =  await JobsModel.find({});
    res.status(200).send(data)
})


JobRouter.get("/search",async (req,res)=>{
    let {language} = req.body;
    try{
        let data = await JobsModel.find({ "language" : { "$regex": language , "$options": "i" } })
        console.log(data)
        res.status(200).send(data)
    }catch(err){
        res.send(err)
    }
})

module.exports = JobRouter;