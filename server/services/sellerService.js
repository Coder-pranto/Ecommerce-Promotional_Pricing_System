const Customer = require("../models/customerSchema");
const Seller = require("../models/sellerSchema.js");
const CustomError = require("../errors");

// create a seller
const getCustomerInfoService = async (customerId) => {
  const result = await Customer.findOne({ _id: customerId });
  return result;
};

// create seller > add profile
const createSellerAddProfile = async (sellerInfo) => {
  const result = await Seller.create(sellerInfo);
  return result;
};

// update seller > add address
const updateSellerAddAddress = async (id, sellerInfo) => {
  const result = await Seller.updateOne({ _id: id }, sellerInfo, {
    runValidators: true,
  });
  return result;
};

// update seller > add identity
const updateSellerAddIdentity = async (id, identityInfo) => {
  const result = await Seller.updateOne({ _id: id }, identityInfo, {
    runValidators: true,
  });
  return result;
};

// get all seller
const getAllSellerService = async () => {
  const result = await Seller.find({});
  return result;
};

// update a seller
const updateASellerService = async (id, data) => {
  const result = await Seller.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

// change seller role as customer
const changeSellerRoleAsCustomerService = async (id) => {
  const seller = await Seller.findOne({ _id: id });
  if (!seller) {
    throw new CustomError.BadRequestError("No seller found for delete");
  }
  const customer = await Customer.findOne({ _id: seller?.customerId });
  if (customer) {
    customer.role = "customer";
    await customer.save();
  } else {
    return;
  }
};

// delete a seller
const deleteASellerService = async (id) => {
  const result = await Seller.deleteOne({ _id: id });
  return result;
};

const updateSellerLocationService = async (sellerId, newCoordinates, shopMap) => {
  const updatedSeller = await Seller.findByIdAndUpdate(
    sellerId,
    {
      $set: {
        location: {
          type: "Point",
          coordinates: newCoordinates,
        },
        shopMap: shopMap
      },
    },
    { new: true }
  );
  return updatedSeller;
};


module.exports = {
  createSellerAddProfile,
  updateSellerAddAddress,
  updateSellerAddIdentity,
  getCustomerInfoService,
  getAllSellerService,
  updateASellerService,
  getCustomerbySellerIdService: changeSellerRoleAsCustomerService,
  deleteASellerService,
  updateSellerLocationService,
};
