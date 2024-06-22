const { StatusCodes } = require("http-status-codes");
const ShoppingMall = require('../models/shoppingMallSchema');
const Seller = require('../models/sellerSchema');


const createShoppingMall = async (req, res) => {
  const { shoppingMallName, sellerId } = req.body;

  let shoppingMall;

  if (shoppingMallName) {
    shoppingMall = await ShoppingMall.findOne({ shoppingMallName });
    // If not, create a new one
    if (!shoppingMall) {
      shoppingMall = await ShoppingMall.create({ shoppingMallName });
    }
  }

  if (sellerId) {
    shoppingMall.sellerIds.push(sellerId);
    await shoppingMall.save();
  }

  res.status(StatusCodes.CREATED)
     .json({message: 'Shopping Mall created successfully',data: shoppingMall});
  
};

const getAllShoppingMalls = async (req, res) => {
    const shoppingMalls = await ShoppingMall.find();
    res.status(StatusCodes.OK)
       .json({ message: 'All shopping malls fetched successfully', data: shoppingMalls });
  }

module.exports = { createShoppingMall, getAllShoppingMalls };
