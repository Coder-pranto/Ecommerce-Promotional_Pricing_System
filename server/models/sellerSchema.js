const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true,
    },
    identityType: {
      type: String,
      enum: {
        values: ["nid", "tradeLicense"],
        message: "{VALUE} please provide nid/tradeLicense",
      },
    },
    identityImage: [{ type: String }],
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message:
          "{VALUE} not accepted. Please provide pending/approved/rejected",
      },
      default: "pending",
      trim: true,
    },
    email: String,
    phone: String,
    shopName: {
      type: String,
      required: [true, "Shop name is required"],
    },
    shopLogo: String,
    shopType: String,
    brandName: String,
    shoppingMall: String,
    shopAddress: {
      type: String,
      lowercase: true,
    },
    shopMap:String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // longitude, laitude
        // required: [true, 'Latitude and Longitude are required'],
      },
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

sellerSchema.index({ location: "2dsphere" });
sellerSchema.index({ customerId: 1 }, { unique: true });

module.exports = mongoose.model("seller", sellerSchema);
