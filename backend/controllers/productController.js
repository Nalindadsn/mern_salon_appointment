const appointmentModel = require("../models/appointmentModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

// get product info
const getproductInfoController = async (req, res) => {
  try {
    const product = await productModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "product data fetch success",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in fetching product details",
    });
  }
};

// update product profile
const updateServiceController = async (req, res) => {
  try {
    const product = await productModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "product profile updated",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "product profile update issue",
      error,
    });
  }
};

// get single product
const getproductByIdController = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.body.productId });
    res.status(200).send({
      success: true,
      message: "single product info fetched",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in single product info",
    });
  }
};

// get product appointments
const productAppointmentsController = async (req, res) => {
  try {
    const product = await productModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      productId: product._id,
    });
    res.status(200).send({
      success: true,
      message: "product appointments fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in product appointments",
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
      onClickPath: "/product-appointments",
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

module.exports = {
  getproductInfoController,
  updateServiceController,
  getproductByIdController,
  productAppointmentsController,
  updateStatusController,
};
