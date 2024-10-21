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
  updateproductController,
  getProductByIdController,
  updateproductDetailsController,
  deleteUserContactController,
  updateserviceController,
  getAllTestimonialController,
  deleteTestimonialController,
  getAllCouponsController,
  addCouponController,
  deleteCouponController,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Endpoint to fetch all users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// Endpoint to fetch all services
router.get("/getAllTestimonial", authMiddleware, getAllTestimonialController);

// Endpoint to fetch all services
router.get("/getAllServices", authMiddleware, getAllServicesController);

// GET User
router.post("/getUserInfo", authMiddleware, getUserByIdController);

// GET User
router.post("/updateUser", authMiddleware, updateUserController);
// GET User
router.post("/getProductInfo", authMiddleware, getProductByIdController);

// GET Product
router.post("/updateProduct", authMiddleware, updateproductDetailsController);

// Endpoint to fetch all services
router.get("/getAllMessages", authMiddleware, getAllContactsController);
// Endpoint to fetch all services
router.get("/getAllCoupons", authMiddleware, getAllCouponsController);

router.get("/getSummary", authMiddleware, getSummaryController);

router.get("/getAllProducts", authMiddleware, getAllProductsController);
router.post("/add-product", authMiddleware, addproductController);
router.post("/update-product", authMiddleware, updateproductController);
router.post("/update-service", authMiddleware, updateserviceController);

router.delete(
  "/deleteTestimonial",
  authMiddleware,
  deleteTestimonialController
);

// Endpoint to change account status
router.post(
  "/changeServiceStatus",
  authMiddleware,
  changeServiceStatusController
);
router.delete("/deleteMessage", authMiddleware, deleteUserContactController);

router.delete("/deleteCoupon", authMiddleware, deleteCouponController);

router.post(
  "/changeProductStatus",
  authMiddleware,
  changeProductStatusController
);

router.post("/add-coupon", authMiddleware, addCouponController);

module.exports = router;
