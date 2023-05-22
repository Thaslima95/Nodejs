
const express=require('express');

const mongoose = require("mongoose");
require('dotenv').config;

//middlewares
const app=express();

mongoose.connect("mongodb+srv://admin:aafiya@EKART.nomsigp.mongodb.net/EKART");

app.listen(process.env.PORT,()=>{
    console.log("Backend Sever")
})

