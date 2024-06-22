const express = require("express");
const sellerController = require("../controllers/sellerController");
const verifyJWTToken = require("../middlewares/verifyJwtToken");
const sellerRouter = express.Router();

sellerRouter.post(
  "/add-profile",
  verifyJWTToken("admin", "customer"),
  sellerController.createSellerAddProfile
);

sellerRouter.patch(
  "/add-address/:id",
  verifyJWTToken("admin", "customer"),
  sellerController.updateSellerAddAddress
);

sellerRouter.patch(
  "/add-identity/:id",
  verifyJWTToken("admin", "customer"),
  sellerController.updateSellerAddIdentity
);

sellerRouter.patch(
  "/locationUpdate/:id",
  sellerController.updateSellerLocation
);

sellerRouter.get(
  "/all",
  verifyJWTToken("admin"),
  sellerController.getAllSeller
);

sellerRouter.patch(
  "/:id",
  verifyJWTToken("admin", "seller"),
  sellerController.updateAseller
);

sellerRouter.delete(
  "/:id",
  verifyJWTToken("admin"),
  sellerController.deleteAseller
);

module.exports = sellerRouter;
