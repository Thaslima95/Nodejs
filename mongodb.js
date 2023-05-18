// const MongoClient = require('mongodb').MongoClient;
// console.log("inside mongo")
// const url = "mongodb://localhost:27017/mydb";
// console.log("after mongo");

// MongoClient.connect(url, function(err, db) {
//     console.log("inside function")
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

const express=require('express');

const mongoose = require("mongoose");
require('dotenv').config;

//middlewares
const app=express();

mongoose.connect("mongodb+srv://admin:aafiya@cluster0.nomsigp.mongodb.net/?retryWrites=true&w=majority");

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

module.exports = mongoose.model("ProductsTable", prodcutsSchema);
