const mongoose = require("mongoose");
const Joi = require("joi");

// Define the service schema
const serviceSchema = new mongoose.Schema({
  userId: {
    type: String,
  },

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

  feesPerConsultation: {
    type: Number,
    required: [true, "Fee is required"],
  },
  discount: {
    type: Number,
    required: [true, "Fee is required"],
  },
  status: {
    type: String,
    default: "published",
  },
  starttime: {
    type: String,
    required: [true],
  },
  endtime: {
    type: String,
    required: [true],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a Joi schema for service validation
const docSchema = Joi.object({
  userId: Joi.string(),
  name: Joi.string().required().min(2),
  description: Joi.string(),
  image: Joi.string().required().min(2),
  feesPerConsultation: Joi.number().required(),
  status: Joi.string().default("pending"),
  starttime: Joi.string().required(),
  endtime: Joi.string().required(),
  createdAt: Joi.date().default(Date.now),
});

// Add the Joi validation to the Mongoose schema
serviceSchema.validateservice = async function () {
  return docSchema.validateAsync(this.toObject());
};

// Create the service model
const serviceModel = mongoose.model("services", serviceSchema);
module.exports = serviceModel;
