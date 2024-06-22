const express = require("express");
const router = express.Router();
const {
  createDiscount,
  imageUpload,
  updateDiscount,
  deleteDiscount,
  getDiscount,
  getSingleDiscount,
  getQueryResultBasedOnCategory,
  getQueryResultGlobally
} = require("../controllers/discountController");
const verifyJWTToken = require("../middlewares/verifyJwtToken");

router.route("/").post(verifyJWTToken("seller", "admin"), createDiscount);

router.post("/uploadImage", verifyJWTToken("seller"), imageUpload);
router.get("/", verifyJWTToken("admin", "seller", "customer"), getDiscount);
router.get("/search/:categoryName", getQueryResultBasedOnCategory);
router.get("/search/global/q", getQueryResultGlobally);

router
  .route("/:id")
  .get( getSingleDiscount)
  // .get(verifyJWTToken("admin", "seller", "customer"), getSingleDiscount)
  .patch(verifyJWTToken("admin"), updateDiscount)
  .delete(verifyJWTToken("admin","seller"), deleteDiscount);
  // .delete(verifyJWTToken("admin"), deleteDiscount);

module.exports = router;
