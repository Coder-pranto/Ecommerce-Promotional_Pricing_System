const express = require('express');
const router = express.Router();

const categoryRouter = require("./categoryRouter.js");
const couponRouter = require("./couponRouter.js");
const discountRouter = require("./discountRouter.js");
const customerRouter = require("./customerRoute.js");
const sellerRouter = require("./sellerRoute.js");
const advertiseRouter = require("./adRouter.js");
const authRouter = require("./authRouter.js");
const brandRouter = require("./brandRouter.js");
const orderRouter = require("./orderRouter.js");
const mallRouter = require("./shoppingMallRouter");
const discountTypeRouter = require("./discountTypeRouter");
const reviewRouter = require("./reviewRouter");
const bannerRouter = require("./bannerRouter");



router.use("/category", categoryRouter);
router.use("/coupon", couponRouter);
router.use("/discount", discountRouter);
router.use("/advertise", advertiseRouter);
router.use("/customer", customerRouter);
router.use("/seller", sellerRouter);
router.use("/brand", brandRouter);
router.use("/auth", authRouter);
router.use("/order", orderRouter);
router.use("/mall",mallRouter);
router.use("/discountType", discountTypeRouter);
router.use("/review", reviewRouter);
router.use("/banner", bannerRouter);


module.exports = router;

// const multiCategoryRouter= require("./multiCategoryRouter");
// router.use("/multi", multiCategoryRouter);