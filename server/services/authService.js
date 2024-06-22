const Customer = require("../models/customerSchema");

// create a customer
const loginService = async (email) => {
  const result = await Customer.findOne({ email });
  return result;
};

module.exports = {
  loginService,
};
