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
  updateUserController
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

// Apply service || POST
router.post("/add-service", authMiddleware, addserviceController);

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
router.get("/getAllProducts", getAllProductsController);

// BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);
// GET User
router.post("/getUserInfo", authMiddleware, getUserByIdController);

// GET User
router.post("/updateUser", authMiddleware, updateUserController);

// Booking Availability
router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

// Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
