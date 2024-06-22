const Coupon = require("../models/couponSchema");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

// service for get coupon
const getCouponsService = async (query) => {
  const { id, couponType, validityPeriod, status } = query;
  let queryObject = {};

  if (id) {
    queryObject._id = id;
  }
  if (couponType) {
    queryObject.couponType = couponType;
  }
  if (validityPeriod) {
    queryObject.validityPeriod = validityPeriod;
  }
  if (status) {
    queryObject.status = status;
  }

  const result = await Coupon.find(queryObject);
  return result;
};

// service for get coupon by id
const getCouponById = async (id) => {
  const result = await Coupon.findOne({ _id: id });
  return result;
};

// service for update coupon product quantity
const updateCouponProductQuantity = async (couponId, sellerId, quantity) => {
  const coupon = await getCouponById(couponId);
  if (!coupon) {
    throw new CustomError.BadRequestError("No coupon found with this id!");
  }

  // Find the seller by seller id
  const sellerIndex = coupon.participatingSellers.findIndex(
    (seller) => seller.sellerId.toString() === sellerId
  );
  if (sellerIndex === -1) {
    throw new CustomError.BadRequestError("No seller found with this id!");
  }

  // Calculate new product quantity
  const newQuantity =
    coupon.participatingSellers[sellerIndex].productDetails.productQuantity -
    quantity;

  // Throw error if new quantity is less than 0
  if (newQuantity < 0) {
    throw new CustomError.BadRequestError("You have no product for sale!");
  }

  // Update product quantity
  coupon.participatingSellers[sellerIndex].productDetails.productQuantity =
    newQuantity;

  // Save the changes to the database
  await coupon.save();
  return coupon;
};

module.exports = {
  getCouponsService,
  updateCouponProductQuantity,
  getCouponById,
};
