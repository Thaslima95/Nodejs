
const express=require('express');

const mongoose = require("mongoose");
require('dotenv').config;

//middlewares
const app=express();

mongoose.connect("mongodb+srv://admin:aafiya@EKART.nomsigp.mongodb.net/EKART");

app.listen(process.env.PORT,()=>{
    console.log("Backend Sever")
})
const prodcutsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    quantity:{
        type:Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewTable", prodcutsSchema);
