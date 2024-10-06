const express = require("express");
const {
  getAllUsersController,
  getAllServicesController,
  getAllProductsController,
  changeServiceStatusController,
  changeProductStatusController,
  addproductController,
  getSummaryController,
  getAllContactsController,
  getUserByIdController,
  updateUserController,
  updateproductController
  

} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Endpoint to fetch all users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// Endpoint to fetch all services
router.get("/getAllServices", authMiddleware, getAllServicesController);

// GET User
router.post("/getUserInfo", authMiddleware, getUserByIdController);

// GET User
router.post("/updateUser", authMiddleware, updateUserController);


// Endpoint to fetch all services
router.get("/getAllMessages", authMiddleware, getAllContactsController);

router.get("/getSummary", authMiddleware, getSummaryController);

router.get("/getAllProducts", authMiddleware, getAllProductsController);
router.post("/add-product", authMiddleware,   addproductController);
router.post("/update-product", authMiddleware,   updateproductController);

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
