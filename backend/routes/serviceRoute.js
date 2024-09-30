const express = require("express");
const {
  getserviceInfoController,
  updateProfileController,
  getserviceByIdController,
  serviceAppointmentsController,
  updateStatusController,
  getAllServicesController,
} = require("../controllers/serviceController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Endpoint to post single service info
router.post("/getserviceInfo", authMiddleware, getserviceInfoController);
router.get("/getAllServices", getAllServicesController);
// Endpoint to update service profile
router.post("/updateProfile", authMiddleware, updateProfileController);

// Endpoint to post get single service info
router.post("/getserviceById", authMiddleware, getserviceByIdController);

// Endpoint to get service appointments
router.get(
  "/service-appointments",
  authMiddleware,
  serviceAppointmentsController
);

// Endpoint to post update status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
