const Customer = require("../models/customerSchema");

// create a customer
const createCustomerService = async (customerInfo) => {
  const result = await Customer.create(customerInfo);
  return result;
};

// get all customer
const getAllCustomerService = async () => {
  const result = await Customer.find({});
  return result;
};

// update a customer
const updateACustomerService = async (id, data) => {
  const result = await Customer.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

// delete a customer
const deleteACustomerService = async (id) => {
  const result = await Customer.deleteOne({ _id: id });
  return result;
};
// // create a customer
// const loginService = async (email) => {
//   const result = await Customer.findOne({ email });
//   return result;
// };

module.exports = {
  createCustomerService,
  getAllCustomerService,
  updateACustomerService,
  deleteACustomerService,
};
