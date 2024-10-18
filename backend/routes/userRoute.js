const express = require("express");
const {
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
  getServiceByIdController,
  getAllUserContactsController,
  deleteUserContactController,
  updateserviceController,
  updateMessageController,
  getMessageByIdController,
  getAllTestimonialController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Router object
const router = express.Router();

// Routes
// POST || Login user
router.post("/login", loginController);

// POST || Register user
router.post("/register", registerController);

// Auth || POST
router.post("/getUserData", authMiddleware, authController);
router.get("/getUserMessages", authMiddleware, getAllUserContactsController);

// Apply service || POST
router.post("/add-service", authMiddleware, addserviceController);
// Apply service || POST
router.post("/updateService", authMiddleware, updateserviceController);
router.delete("/deleteMessage", authMiddleware, deleteUserContactController);

// Notification service || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// Notification service || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

// GET ALL serviceS
router.get("/getAllServices", getAllServicesController);

// GET ALL serviceS
router.get("/getAllTestimonial", getAllTestimonialController);

// GET ALL serviceS
router.get("/getAllProducts", getAllProductsController);

// BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);
// GET User
router.post("/getUserInfo", authMiddleware, getUserByIdController);

router.post("/getServiceInfo", authMiddleware, getServiceByIdController);

router.post("/getMessageInfo", authMiddleware, getMessageByIdController);
// GET User
router.post("/updateUser", authMiddleware, updateUserController);

// GET User
router.post("/updateMessage", authMiddleware, updateMessageController);

// Booking Availability
router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

// Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
