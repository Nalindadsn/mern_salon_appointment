const Joi = require("joi");
const mongoose = require("mongoose");

// Define the appointment schema
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // changed type to Date
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define a Joi schema for appointment validation
const appointmentJoiSchema = Joi.object({
  userId: Joi.string().required(),
  serviceId: Joi.string().required(),
  serviceInfo: Joi.string().required(),
  userInfo: Joi.string().required(),
  date: Joi.date().required(),
  fee: Joi.string().required(),
  status: Joi.string().required().default("pending"),
  time: Joi.string().required(),
}).options({ stripUnknown: true });

// Create the Appointment model
const AppointmentModel = mongoose.model("appointments", appointmentSchema);

// Add the Joi validation to the Mongoose schema
AppointmentModel.validateAppointment = async function () {
  return appointmentJoiSchema.validateAsync(this.toObject());
};

module.exports = AppointmentModel;
