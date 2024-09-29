const mongoose = require("mongoose");
const Joi = require("joi");

// Define the product schema
const productSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: [true, " name is required"],
    minlength: [2, "Your  name must be at least 2 characters"],
    maxlength: [50, "Your  name cannot exceed 50 characters"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  description: {
    type: String,
    minlength: [2, "Your description must be at least 2 characters"],
  },
  brand: {
    type: String,
    minlength: [2, "Your description must be at least 2 characters"],
  },
 
  status: {
    type: String,
    default: "approved",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a Joi schema for product validation
const docSchema = Joi.object({
  name: Joi.string().required().min(2),
  description: Joi.string(),
  brand: Joi.string(),
  image: Joi.string().required().min(2),
  status: Joi.string().default("pending"),
  createdAt: Joi.date().default(Date.now),
});

// Add the Joi validation to the Mongoose schema
productSchema.validateproduct = async function () {
  return docSchema.validateAsync(this.toObject());
};

// Create the product model
const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
