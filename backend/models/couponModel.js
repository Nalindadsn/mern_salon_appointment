const Joi = require("joi");
const mongoose = require("mongoose");

// Define the coupon schema
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    isPercent: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: String,
      required: true,
      default: "active",
    },
  },
  { timestamps: true }
);

// Define a Joi schema for coupon validation
const couponJoiSchema = Joi.object({
  serviceId: Joi.string().required(),
  code: Joi.string().required(),
  isPercent: Joi.boolean().required(),
  amount: Joi.number().required(),
  expireDate: Joi.date().required(),
  isActive: Joi.string().required(),
}).options({ stripUnknown: true });

// Create the Coupon model
const CouponModel = mongoose.model("coupons", couponSchema);

// Add the Joi validation to the Mongoose schema
CouponModel.validateCoupon = async function () {
  return couponJoiSchema.validateAsync(this.toObject());
};

module.exports = CouponModel;
