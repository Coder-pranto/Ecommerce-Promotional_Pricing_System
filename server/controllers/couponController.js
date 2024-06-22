const Coupon = require("../models/couponSchema");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const couponServices = require("../services/couponService");

const generateCoupon = async (req, res) => {
  // const { couponCode, couponType, discountPercentage, validityPeriod } = req.body;
  const coupon = await Coupon.create(req.body);

  res.status(StatusCodes.CREATED).json({ status: "Success", data: coupon });
};

const participateInCoupon = async (req, res) => {
  if (!req.body || !req.files) {
    throw new CustomError.BadRequestError(
      "Please provide total information and upload an image!"
    );
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const imagePath = path.join(
    __dirname,
    "../public/coupon/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  const couponId = req.params.id;

  const { productName, description, productQuantity } = req.body;

  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    throw new CustomError.NotFoundError("Invalid Coupon Id!");
  }

  coupon.participatingSellers.find((seller) => {
    const currentQuantity = seller.productDetails.productQuantity;
    const upcomingQuantity = req.body.productQuantity;
    if (currentQuantity === upcomingQuantity) {
      if (currentQuantity > upcomingQuantity) {
        throw new CustomError.BadRequestError(
          `Sorry, You have participated for ${currentQuantity} products!`
        );
      }
      throw new CustomError.BadRequestError("Seller already participated !");
    }
  });
  console.log(coupon.participatingSellers);

  // Add the seller's participation to the coupon
  coupon.participatingSellers.push({
    sellerId: req.body.sellerId,
    productDetails: {
      productName,
      description,
      productQuantity,
      image: `https://api.discounthutdeshit.tailormaster.xyz/coupon/${productImage.name}`,
    },
  });

  await coupon.save();

  res.status(StatusCodes.OK).json({ status: "Success", data: coupon });
};

const updateCoupon = async (req, res) => {
  const couponId = req.params.id;
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    return new CustomError.NotFoundError("No Coupon Found");
  }
  const { status } = req.body;
  const updateCoupon = await Coupon.findByIdAndUpdate(
    couponId,
    { status },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ status: "Success", data: updateCoupon });
};


const deleteCoupon = async (req, res) => {
  const couponId = req.params.id;
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    return new CustomError.NotFoundError("No Coupon Found");
  }
  const deleteCoupon = await Coupon.findByIdAndDelete(couponId);

  res.status(StatusCodes.OK).json({ status: "Success", data: deleteCoupon });
};

// coupon query > get coupons

const getCoupons = async (req, res) => {
  const { id, couponType, validityPeriod, status } = req.query;

  const coupons = await couponServices.getCouponsService(req.query);
  console.log(coupons.participatingSellers);

  if (coupons.length === 0) {
    throw new CustomError.BadRequestError("Coupon not found with this query");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: coupons,
  });
};

// controller for update coupon product quantity
const updateCouponProductQuantity = async (req, res) => {
  const { id } = req.params;
  const { sellerId, quantity } = req.body;
  if (!sellerId || !quantity) {
    throw new CustomError.BadRequestError(
      "Seller id or product quantity is missing!"
    );
  }

  const updatedCoupon = await couponServices.updateCouponProductQuantity(
    id,
    sellerId,
    quantity
  );
  console.log(updatedCoupon);
  if (!updatedCoupon) {
    throw new CustomError.BadRequestError("Failed to update product quantity!");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Coupon product quantity updated!",
    data: updatedCoupon,
  });
};

module.exports = {
  generateCoupon,
  participateInCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupons,
  updateCouponProductQuantity,
};
