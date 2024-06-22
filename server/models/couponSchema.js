const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "Please provide the coupon code"],
      unique: true,
    },
    couponType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: [true, "Please provide the coupon type"],
      default: "percentage",
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please provide the discount percentage"],
    },
    validityPeriod: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    participatingSellers: [
      {
        sellerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "seller",
        },
        productDetails: {
          productName: {
            type: String,
          },
          description: {
            type: String,
          },
          productQuantity: {
            type: Number,
          },
          image: {
            type: String,
          },
        },
        
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
