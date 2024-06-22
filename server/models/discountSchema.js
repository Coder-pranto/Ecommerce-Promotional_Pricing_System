const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    sub_sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsubcategory",
    },
    sub_sub_sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsubsubcategory",
    },
    discount_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiscountType",
      required: [true, "Please provide discount_type"],
    },
    discount: {
      type: Number,
      required: true,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    start_datetime: {
      type: Date,
      required: true, // iso format : must use placeholder in frontend : YYYY-MM-DD
    },
    end_datetime: {
      type: Date,
      required: true,
    },
    sku: {
      type: String,
      required: [true, "Please provide sku"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Discount", discountSchema);
