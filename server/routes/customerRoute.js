const express = require("express");
const customerController = require("../controllers/customerController");
const customerRouter = express.Router();

customerRouter.post("/", customerController.createCustomer);
customerRouter.get("/", customerController.getAllCustomers);
customerRouter.patch("/:id", customerController.updateACustomer);
customerRouter.delete("/:id", customerController.deleteACustomer);

module.exports = customerRouter;
