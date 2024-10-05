const express = require("express");
const {
  getproductInfoController,
  updateServiceController,
  getproductByIdController,
  productAppointmentsController,
  updateStatusController,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Endpoint to post single product info
router.post("/getproductInfo", authMiddleware, getproductInfoController);

// Endpoint to update product profile
router.post("/updateService", authMiddleware, updateServiceController);

// Endpoint to post get single product info
router.post("/getproductById", authMiddleware, getproductByIdController);

// Endpoint to get product appointments
router.get(
  "/product-appointments",
  authMiddleware,
  productAppointmentsController
);

// Endpoint to post update status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
