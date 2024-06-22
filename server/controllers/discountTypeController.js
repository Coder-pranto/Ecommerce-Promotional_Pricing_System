const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const DiscountType = require('../models/discountTypeSchema');

// Create a new discount type
const createDiscountType = async (req, res) => {
  const { name } = req.body;
  const existingDiscountType = await DiscountType.findOne({ name });
  if (existingDiscountType) {
    throw new CustomError.BadRequestError('Discount type name already exists');
  }
  const discountType = await DiscountType.create({ name });
  res.status(StatusCodes.CREATED).json({ discountType });
};


// Get all discount types
const getAllDiscountTypes = async (req, res) => {
    const discountTypes = await DiscountType.find();
    res.status(StatusCodes.OK).json({ success: true, data: discountTypes });
};

// Get a single discount type by ID
const getDiscountTypeById = async (req, res) => {
    const discountType = await DiscountType.findById(req.params.id);
    if (!discountType) {
        throw new BadRequestError('Discount type not found');
    }
    res.status(StatusCodes.OK).json({ success: true, data: discountType });
};

// Update a discount type by ID
const updateDiscountTypeById = async (req, res) => {
  const { updatedName } = req.body;
  if (!updatedName) {
    throw new CustomError.NotFoundError( 'Updated name is required');
  }
  const discountType = await DiscountType.findByIdAndUpdate(
    req.params.id,
    { name:updatedName },
    { new: true, runValidators: true }
  );
  if (!discountType) {
    throw new CustomError.BadRequestError('Discount type not found');
  }
  res.status(StatusCodes.OK).json({ success: true, data: discountType });
};

// Delete a discount type by ID
const deleteDiscountTypeById = async (req, res) => {
    const discountType = await DiscountType.findByIdAndDelete(req.params.id);
    if (!discountType) {
      throw new CustomError.BadRequestError('Discount type not found');
    }
    res.status(StatusCodes.OK).json({ success: true, message: 'Discount type deleted successfully', data: discountType });
  };
  

module.exports = {
  createDiscountType,
  getAllDiscountTypes,
  getDiscountTypeById,
  updateDiscountTypeById,
  deleteDiscountTypeById,
};
