const mongoose = require("mongoose");

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

module.exports = mongoose.model("Products", prodcutsSchema);