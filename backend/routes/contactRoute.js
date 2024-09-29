const express = require("express");
const {
  getcontactInfoController,
  createContactController,
} = require("../controllers/contactController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Endpoint to post single contact info
router.post("/getcontactInfo", authMiddleware, getcontactInfoController);

// Endpoint to update contact profile
router.post("/create", createContactController);


module.exports = router;
