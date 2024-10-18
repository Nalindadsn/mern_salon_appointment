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
  createTestimonialController,
  getTestimonialByIdController,
  updateTestimonialController,
  deleteTestimonialController,
  getPublishedTestimonialController,
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
router.get("/getPublishedTestimonial", getPublishedTestimonialController);

// Apply service || POST
router.post("/add-service", authMiddleware, addserviceController);
// Apply service || POST
router.post("/updateService", authMiddleware, updateserviceController);
router.delete("/deleteMessage", authMiddleware, deleteUserContactController);
router.delete(
  "/deleteTestimonial",
  authMiddleware,
  deleteTestimonialController
);

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
router.get("/getAllTestimonial", authMiddleware, getAllTestimonialController);

// GET ALL serviceS
router.get("/getAllProducts", getAllProductsController);

// BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);
// GET User
router.post("/getUserInfo", authMiddleware, getUserByIdController);

router.post("/getServiceInfo", authMiddleware, getServiceByIdController);

router.post("/getMessageInfo", authMiddleware, getMessageByIdController);

router.post(
  "/getTestimonialInfo",
  authMiddleware,
  getTestimonialByIdController
);

// GET User
router.post("/updateUser", authMiddleware, updateUserController);

// GET User
router.post("/updateMessage", authMiddleware, updateMessageController);
router.post("/updateTestimonial", authMiddleware, updateTestimonialController);

// Booking Availability
router.post(
  "/booking-availability",
  authMiddleware,
  bookingAvailabilityController
);

// Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

router.post("/createTestimonial", createTestimonialController);

module.exports = router;
