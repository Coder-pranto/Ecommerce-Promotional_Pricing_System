const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const customerServices = require("../services/customerService");
const generateJwtToken = require("../utils/generateJwtToken");

// controller for create a customer
const createCustomer = async (req, res) => {
  const customer = await customerServices.createCustomerService(req.body);

  if (!customer) {
    throw new CustomError.BadRequestError("Customer creation failed");
  }

  const { password, ...customerWithoutPass } = customer.toObject();
  res.status(StatusCodes.OK).json({
    status: "success",
    data: customerWithoutPass,
  });
};

// controller for get all customer
const getAllCustomers = async (req, res) => {
  const customers = await customerServices.getAllCustomerService();

  if (customers.length === 0) {
    throw new CustomError.BadRequestError("Failed to get customer");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: customers,
  });
};

// controller for update a customer
const updateACustomer = async (req, res) => {
  const customer = await customerServices.updateACustomerService(
    req.params.id,
    req.body
  );

  if (!customer.modifiedCount) {
    throw new CustomError.BadRequestError("Failed to update customer");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Customer successfully updated",
  });
};

// controller for delete a customer
const deleteACustomer = async (req, res) => {
  const customer = await customerServices.deleteACustomerService(req.params.id);

  if (!customer.deletedCount) {
    throw new CustomError.BadRequestError("Failed to delete customer");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Customer successfully deleted",
  });
};

// controller for login a customer
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     throw new CustomError.BadRequestError("Email and Password are required!");
//   }
//   const customer = await customerServices.loginService(email);

//   if (!customer) {
//     throw new CustomError.BadRequestError("Invalid email or password!");
//   }

//   // check the password
//   const isMatch = await customer.comparePassword(password);

//   if (!isMatch) {
//     throw new CustomError.BadRequestError("Invalid email or password!");
//   }

//   // generate jwt token
//   const payload = {
//     email: customer.email,
//     role: customer.role,
//   };

//   // console.log(customer);
//   const token = await generateJwtToken(payload);

//   const { password: pwd, ...otherInfoWithoutPass } = customer.toObject();
//   otherInfoWithoutPass.token = token;

//   res.status(StatusCodes.OK).json({
//     status: "success",
//     data: otherInfoWithoutPass,
//   });
// };

module.exports = {
  createCustomer,
  getAllCustomers,
  updateACustomer,
  deleteACustomer,
};
