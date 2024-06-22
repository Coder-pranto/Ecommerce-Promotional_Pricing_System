const express = require("express");
const router = express.Router();
const {
  createAdPackage,
  updateAdPackage,
  deletePackage,
  getAllAdPackages,
  purchaseAdPackage,
  approveAdPurchase,
  rejectAdPurchase,
  getApprovedAdPackage,
} = require("../controllers/adPackageController");
const verifyJWTToken = require("../middlewares/verifyJwtToken");

router.route("/").get(getAllAdPackages).post(verifyJWTToken("admin"), createAdPackage);
router.patch("/update/:id",verifyJWTToken("admin"), updateAdPackage);
router.delete("/delete/:id",verifyJWTToken("admin"), deletePackage);
router.get("/approved", getApprovedAdPackage);
router.patch(
  "/purchase/:id",
  verifyJWTToken("seller", "admin"),
  purchaseAdPackage
);
router.patch("/approve/:id", approveAdPurchase);
router.patch("/reject/:id", rejectAdPurchase);

module.exports = router;
