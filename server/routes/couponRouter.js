const express = require("express");
const router = express.Router();
const {
  generateCoupon,
  participateInCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupons,
  updateCouponProductQuantity,
} = require("../controllers/couponController");
const verifyJWTToken = require("../middlewares/verifyJwtToken");

router.post("/", verifyJWTToken("admin"), generateCoupon);
router.get("/", verifyJWTToken("admin", "seller", "customer"), getCoupons);
router.patch("/:id", verifyJWTToken("seller", "admin"), participateInCoupon);
router.delete("/:id", verifyJWTToken("admin"), deleteCoupon);
router.patch("/update/:id", updateCoupon);
router.patch("/:id", verifyJWTToken("seller", "admin"), participateInCoupon);
router.patch(
  "/product-quantity/:id",
  verifyJWTToken("seller", "admin"),
  updateCouponProductQuantity
);

module.exports = router;
