const mongoose = require("mongoose");
const Joi = require("joi");

// Define a schema for testimonial input validation
const testimonialSchema = Joi.object({
  userId: Joi.string().min(2).max(50),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  rate: Joi.string().required(),
  message: Joi.string().min(2).max(50).required(),
  status: Joi.string(),
});

// Create a Mongoose schema
const testimonialMongooseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
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
    rate: {
      type: String,
      required: [true, "Rate is Required "],
    },

    message: {
      type: String,
      required: [true, "Please provide your message"],
      minlength: [2, "Your message must be at least 2 characters"],
    },

    status: {
      type: String,
      required: [true, "Please provide message status"],
      default: "pending",
    },

    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

// Add the Joi validation to the Mongoose schema
testimonialMongooseSchema.validateTestimonial = async function (testimonial) {
  return testimonialSchema.validateAsync(testimonial);
};

// Create a Mongoose model
const Testimonial = mongoose.model("Testimonial", testimonialMongooseSchema);

// Export the model
module.exports = Testimonial;
