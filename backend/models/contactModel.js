const mongoose = require("mongoose");
const Joi = require("joi");

// Define a schema for contact input validation
const contactSchema = Joi.object({
  userId: Joi.string().min(2).max(50),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  phone: Joi.string().min(2).max(50).required(),
  message: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
});

// Create a Mongoose schema
const contactMongooseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required:false,
  },
  firstName: {
    type: String,
    required: [true, "Please provide your firstName"],
    minlength: [2, "Your firstName must be at least 2 characters"],
    maxlength: [50, "Your firstName cannot exceed 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your lastName"],
    minlength: [2, "Your lastName must be at least 2 characters"],
    maxlength: [50, "Your lastName cannot exceed 50 characters"],
  },
  
  phone: {
    type: String,
    required: [true, "Please provide your phone"],
    minlength: [2, "Your phone must be at least 2 characters"],
    maxlength: [50, "Your phone cannot exceed 50 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide your message"],
    minlength: [2, "Your message must be at least 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add the Joi validation to the Mongoose schema
contactMongooseSchema.validateContact = async function (contact) {
  return contactSchema.validateAsync(contact);
};

// Create a Mongoose model
const Contact = mongoose.model("Contact", contactMongooseSchema);

// Export the model
module.exports = Contact;
