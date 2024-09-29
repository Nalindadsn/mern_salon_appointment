const productModel = require("../models/productModel");
const serviceModel = require("../models/serviceModel");
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    // get all users data
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

// get all services data
const getAllServicesController = async (req, res) => {
  try {
    const services = await serviceModel.find({});
    res.status(200).send({
      success: true,
      message: "services data list",
      data: services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting services data",
      error,
    });
  }
};

// get all services data
const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "products data list",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting products data",
      error,
    });
  }
};

const addproductController = async (req, res) => {
  console.log(req.body);
  try {
    const newproduct = await productModel({ ...req.body, status: "pending" });
    await newproduct.save();
    // await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "product account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while applying for product",
    });
  }
};

// service account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { serviceId, status } = req.body;
    const service = await serviceModel.findByIdAndUpdate(serviceId, { status });
    const user = await userModel.findOne({ _id: service.userId });
    const notification = user.notification;
    notification.push({
      type: "service-account-request-updated",
      message: `your service account request has ${status}`,
      onClickPath: "/notification",
    });
    user.isservice = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "account status updated",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in account status",
      error,
    });
  }
};

module.exports = {
  getAllServicesController,
  getAllProductsController,
  getAllUsersController,
  changeAccountStatusController,
  addproductController
};
