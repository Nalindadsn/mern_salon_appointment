const express = require("express");
const {
  getAllUsersController,
  getAllServicesController,
  getAllProductsController,
  changeServiceStatusController,
  changeProductStatusController,
  addproductController,
  getSummaryController,
  getAllContactsController
  

} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Endpoint to fetch all users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// Endpoint to fetch all services
router.get("/getAllServices", authMiddleware, getAllServicesController);

// Endpoint to fetch all services
router.get("/getAllMessages", authMiddleware, getAllContactsController);

router.get("/getSummary", authMiddleware, getSummaryController);

router.get("/getAllProducts", authMiddleware, getAllProductsController);
router.post("/add-product", authMiddleware,   addproductController);

// Endpoint to change account status
router.post(
  "/changeServiceStatus",
  authMiddleware,
  changeServiceStatusController
);

router.post(
  "/changeProductStatus",
  authMiddleware,
  changeProductStatusController
);

module.exports = router;
