const appointmentModel = require("../models/appointmentModel");
const serviceModel = require("../models/serviceModel");
const userModel = require("../models/userModel");

// get service info
const getserviceInfoController = async (req, res) => {
  try {
    const service = await serviceModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "service data fetch success",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in fetching service details",
    });
  }
};

// update service profile
const updateProfileController = async (req, res) => {
  try {
    const service = await serviceModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "service profile updated",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "service profile update issue",
      error,
    });
  }
};

// get single service
const getserviceByIdController = async (req, res) => {
  try {
    const service = await serviceModel.findOne({ _id: req.body.serviceId });
    res.status(200).send({
      success: true,
      message: "single service info fetched",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in single service info",
    });
  }
};

// get service appointments
const serviceAppointmentsController = async (req, res) => {
  try {
    const service = await serviceModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      // serviceId: service._id,
    });
    res.status(200).send({
      success: true,
      message: "service appointments fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in service appointments",
    });
  }
};

// update appointment status
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    let notification = user.notification || []; // Initialize notifcation to an empty array if it's undefined
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onClickPath: "/service-appointments",
    });
    await userModel.updateOne(
      { _id: user._id },
      { $set: { notification: notification } }
    );
    res.status(200).send({
      success: true,
      message: "appointment status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in update status",
    });
  }
};
const getAllServicesController = async (req, res) => {
  try {
    const services = await serviceModel.find({ status: "published" });
    res.status(200).send({
      success: true,
      message: "services lists fetched successfully",
      data: services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while fetching service",
    });
  }
};
module.exports = {
  getAllServicesController,
  getserviceInfoController,
  updateProfileController,
  getserviceByIdController,
  serviceAppointmentsController,
  updateStatusController,
};
