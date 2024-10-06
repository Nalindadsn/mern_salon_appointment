const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const serviceModel = require("../models/serviceModel");
const productModel = require("../models/productModel");
const appointmentModel = require("../models/appointmentModel");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// login callback
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send("user not found");
    }
    // Compare hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("invalid password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "login success", success: true, token });
  } catch (error) {
    console.log(error);
    console.log(process.env.JWT_SECRET);
    res.status(500).send({ message: `error in login ctrl ${error.message}` });
  }
};

// register callback
const registerController = async (req, res) => {
  try {
    const { name, email, password,username } = req.body;

    // Hash and salt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// authenticate user
const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      user.password = undefined; // move this line here
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// apply for service account
const addserviceController = async (req, res) => {
  console.log(req.body);
  try {
    const newservice = await serviceModel({ ...req.body, status: "pending" });
    await newservice.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-service-request",
      message: `${newservice.firstName} ${newservice.lastName} has applied for a service account`,
      data: {
        serviceId: newservice._id,
        name: newservice.firstName + " " + newservice.lastName,
        onClickPath: "/admin/services",
      },
    });
    // await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "service account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while applying for service",
    });
  }
};

const updateserviceController = async (req, res) => {
  console.log(req.body);
  try {
    const newservice = await serviceModel({ ...req.body, status: "pending" });
    await newservice.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-service-request",
      message: `${newservice.firstName} ${newservice.lastName} has applied for a service account`,
      data: {
        serviceId: newservice._id,
        name: newservice.firstName + " " + newservice.lastName,
        onClickPath: "/admin/services",
      },
    });
    // await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "service account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while applying for service",
    });
  }
};

// get all notifications
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in notification",
      success: false,
      error,
    });
  }
};

// delete all notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

// get all services
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

// get all services
const getAllProductsController = async (req, res) => {
  console.log("req.body")
  try {
    const products = await productModel.find({ 
      status: "published"
     });
    res.status(200).send({
      success: true,
      message: "products lists fetched successfully",
      data: products,
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

// checking availability of appointment
const bookingAvailabilityController = async (req, res) => {
  try {
    // const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    // const startTime = moment(req.body.time, "HH:mm").toISOString();
    // const serviceId = req.body.serviceId;
    // const service = await serviceModel.findById(serviceId);
    // if (!service) {
    //   return res.status(404).send({
    //     message: "service not found",
    //     success: false,
    //   });
    // }
    // const start = moment(service.starttime, "HH:mm").toISOString();
    // const end = moment(service.endtime, "HH:mm").toISOString();
    // if (!moment(startTime).isBetween(start, end, undefined, "[]")) {
    //   return res.status(200).send({
    //     message: "appointment not available",
    //     success: false,
    //   });
    // }
    // const appointments = await appointmentModel.find({
    //   serviceId,
    //   date,
    //   time: startTime,
    // });
    // if (appointments.length > 0) {
    //   return res.status(200).send({
    //     message: "appointment not available",
    //     success: false,
    //   });
    // }
    return res.status(200).send({
      success: true,
      message: "appointment available",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error checking appointment availability",
    });
  }
};

// book appointment
const bookAppointmentController = async (req, res) => {
  try {
    
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const startTime = moment(req.body.time, "HH:mm").toISOString();
    const serviceId = req.body.serviceId;
    const service = await serviceModel.findById(serviceId);
    
    if (!service) {
      return res.status(404).send({
        message: "service not found",
        success: false,
      });
    }
    
    const start = moment(service.starttime, "HH:mm").toISOString();
    const end = moment(service.endtime, "HH:mm").toISOString();
console.log(service.starttime, service.endtime);
    console.log(!moment(startTime).isBetween(start, end, undefined, "[]"))

    if (!moment(startTime).isBetween(start, end, undefined, "[]")) {
      return res.status(400).send({
        message: "selected time is not within service's available range",
        success: false,
      });
    }console.log(start, end);
   

    const appointments = await appointmentModel.find({
      serviceId,
      date,
    });
    if (appointments.length >= service.maxPatientsPerDay) {
      return res.status(400).send({
        message: "maximum number of appointments reached for this day",
        success: false,
      });
    }
    
   
    const existingAppointment = await appointmentModel.findOne({
      serviceId,
      date,
      time: startTime,
    });

    
    if (existingAppointment) {
      return res.status(400).send({
        message: "appointment already booked for this time slot",
        success: false,
      });
    }
    const newAppointment = new appointmentModel({
      serviceId,
      userId: req.body.userId,
      date,
      time: startTime,
      serviceInfo: req.body.serviceInfo,
      userInfo: req.body.userInfo,
    });
    await newAppointment.save();


    return res.status(200).send({
      success: true,
      message: "appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in booking appointment",
    });
  }
};

// get user appointments
const userAppointmentsController = async (req, res) => {
  try {
    const pipeline = [
      {
        '$lookup' : {
            'from' : 'users',
            'localField' : 'user_id',
            'foreignField' : '_id',
            'as' : 'users'
        }
      }
    ]
console.log(req.body.userId+"--")
    const appointments = await appointmentModel.aggregate([
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
      }
    ])
    console.log(appointments[appointments.length-1])



    // const appointments = await appointmentModel.find({
    //   userId: req.body.userId,
    // });
    
    
    
    res.status(200).send({
      success: true,
      message: "users appointments fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in user appointments",
    });
  }
};

const getUserByIdController = async (req, res) => {
  console.log(req.body)
  try {
    const User = await userModel.findOne({ _id: req.body.userId });
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
module.exports = {
  loginController,
  registerController,
  authController,
  addserviceController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllServicesController,
  getAllProductsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  getUserByIdController,
  updateUserController,
  updateserviceController
};
