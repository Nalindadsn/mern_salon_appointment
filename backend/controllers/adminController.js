const productModel = require("../models/productModel");
const serviceModel = require("../models/serviceModel");
const contactModel = require("../models/contactModel");
const userModel = require("../models/userModel");
const appointmentModel = require("../models/appointmentModel");

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

const getSummaryController = async (req, res) => {
  try {
    const services = await serviceModel.find({});
    const products = await productModel.find({});
    const totalUsers = await userModel.find({});

    const admin=totalUsers.filter((user)=>user.isAdmin)
    const users=totalUsers.filter((user)=>user.isAdmin==false)

    // // const totalServices = services.length;
    // const totalProducts = products.length;
    const appointments=await appointmentModel.aggregate([
      { $match : { userId : req.body.userId } },
      {$set: {userId: {$toObjectId: "$userId"} }},
      {$set: {serviceId: {$toObjectId: "$serviceId"} }},
      {
$lookup : {
            from : 'users',
            localField : 'userId',
            foreignField : '_id',
            as : 'users'
        }
      },
      {
$lookup : {
            from : 'services',
            localField : 'serviceId',
            foreignField : '_id',
            as : 'service'
        }
      },
      { $sort : { createdAt : -1 } }
    ])
    const pendingAppointments=appointments.filter((appointment)=>appointment.status=="pending")
    const approvedAppointments=appointments.filter((appointment)=>appointment.status=="approved")

    const pendingServices=services.filter((service)=>service.status=="pending")
    const approvedServices=services.filter((service)=>service.status=="published")

    const pendingProducts=products.filter((product)=>product.status=="pending")
    const approvedProducts=products.filter((product)=>product.status=="published")

    res.status(200).send({
      success: true,
      message: "services data list",
      data: {products:products,
        services:services,
        totalUsers:totalUsers,
        admin:admin,
        users:users,
        pendingAppointments:pendingAppointments,
        approvedAppointments:approvedAppointments,
        pendingServices:pendingServices,
        approvedServices:approvedServices,
        pendingProducts:pendingProducts,
        approvedProducts:approvedProducts


      },
      // data: {pendingAppointments,completedAppointments,totalUsers,admin,users,totalServices,totalProducts},
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

const updateproductController = async (req, res) => {
  console.log(req.body);
  try {
    const newproduct = await productModel({ ...req.body, status: "pending" });
    await newproduct.save();
    // await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "product applied successfully",
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
const changeServiceStatusController = async (req, res) => {
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
    user.isservice = status === "published" ? true : false;
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
// service account status
const changeProductStatusController = async (req, res) => {
  try {
    console.log(req.body)
    const { productId, status } = req.body;
    const product = await productModel.findByIdAndUpdate(productId, { status });
    
    res.status(201).send({
      success: true,
      message: "product status updated",
      data: product,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in product status",
      error,
    });
  }
};


// get all contacts data
const getAllContactsController = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    res.status(200).send({
      success: true,
      message: "contacts data list",
      data: contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting contacts data",
      error,
    });
  }
};
const getUserByIdController = async (req, res) => {
  console.log(req.body)
  try {
    const User = await userModel.findOne({ _id: req.body._id });
    console.log(User)
    res.status(200).send({
      success: true,
      message: "single user info fetched",
      data: User,
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

// update service profile
const updateUserController = async (req, res) => {
  console.log(req.body)
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "user profile updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "user profile update issue",
      error,
    });
  }
};




const getProductByIdController = async (req, res) => {
  console.log(req.body)
  try {
    const User = await productModel.findOne({ _id: req.body.productId });
    res.status(200).send({
      success: true,
      message: "single user info fetched",
      data: User,
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

const updateproductDetailsController = async (req, res) => {
  console.log(req.body);
  try {
    // const updatedservice = await serviceModel({ ...req.body, status: "pending" });
    // await updatedservice.save();

    const updatedproduct = await productModel.findOneAndUpdate(
      { _id: req.body.productId },
      req.body
    );


    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "add-product-request",
      message: `${updatedproduct.name}  has updated`,
      data: {
        productId: updatedproduct._id,
        name: updatedproduct.name,
        onClickPath: "/admin/products",
      },
    });
    // await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "product updated successfully",
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

module.exports = {
  changeProductStatusController,
  getAllServicesController,
  getSummaryController,
  getAllProductsController,
  getAllUsersController,
  changeServiceStatusController,
  addproductController,
  getAllContactsController,
  getUserByIdController,
  updateUserController,
  updateproductController,

  
  updateproductDetailsController,
  getProductByIdController

};
