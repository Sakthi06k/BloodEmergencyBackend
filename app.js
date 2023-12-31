const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/userSchema");

mongoose.connect("mongodb+srv://jv8110909191:ASas12.,@cluster0.m8dnfoi.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DBconnected")})
.catch(()=>{console.log("error");})

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register',async (req,res)=>{
    try{
        const user = await User.create({
            name : req.body.name,
            bloodGroup : req.body.bloodGroup, 
            city : req.body.city,
            mobileNo : req.body.mobileNo
        })
        console.log(user);
        res.json({status:"ok"});
    }
    catch(err){
        console.log(err);
        res.json({status:"failed"})
    }
})

app.get('/showDetails',async (req,res)=>{
    try{
        const data = await User.find({bloodGroup:req.headers.bloodgroup , city:req.headers.city},{_id:0,__v:0})
        console.log(data);
            res.json(data);
    }

    catch(err){
        console.log(err);
    }
})

app.listen(4000,"localhost",()=>{
    console.log("connected");
})


