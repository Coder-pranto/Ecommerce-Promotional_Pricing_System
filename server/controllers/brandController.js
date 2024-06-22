const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Brand = require('../models/brandSchema');
const fs = require('fs');
const path = require('path');

// Create a new brand
const createBrand = async (req, res) => {
  if (!req.body || !req.files || !req.files.imageXYZ) {
    throw new CustomError.BadRequestError('Please upload a brand logo!');
  }

  // const { brandName, brandType } = req.body;
  const brandLogo = req.files.imageXYZ;

  if (!brandLogo.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload an image file');
  }

  const maxSize = 1024 * 1024;

  if (brandLogo.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload an image smaller than 1MB');
  }

  const imagePath = path.join(__dirname, '../public/brandLogo/' + `${brandLogo.name}`);
  await brandLogo.mv(imagePath);

   const brand = await Brand.create({...req.body, brand_logo: `/brandLogo/${brandLogo.name}`});

  res.status(StatusCodes.CREATED).json({ status: 'Creation Successful', data: brand });
};


// Get all brands
const getAllBrands = async (req, res) => {
    const brands = await Brand.find({});
    res.status(StatusCodes.OK).json({status: 'Data fetch successful', brands});
};


const updateBrandData = async (req, res) => {
  const { brandId } = req.params;

  const existingBrand = await Brand.findById(brandId);

  if (!existingBrand) {
    throw new CustomError.NotFoundError('Brand not found');
  }

  existingBrand.brandName = req.body.brandName  || existingBrand.brandName ;
  existingBrand.brandType = req.body.brandType  || existingBrand.brandType;
  existingBrand.brandPhone= req.body.brandPhone  || existingBrand.brandPhone;
  existingBrand.status = req.body.status !== undefined ? req.body.status : existingBrand.status;
    
  // Handle brand logo update
  if (req.files && req.files.imageXYZ) {

    // Delete the old image
    const imagePath = path.join(__dirname, '../public', existingBrand.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting category image:', err);
      } else {
        console.log('Category image deleted successfully');
      }
    });

    const brandLogo = req.files.imageXYZ;

    if (!brandLogo.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please upload an image file');
    }

    const maxSize = 1024 * 1024;

    if (brandLogo.size > maxSize) {
      throw new CustomError.BadRequestError('Please upload an image smaller than 1MB');
    }

    const newImagePath = path.join(__dirname, '../public/brandLogo/' + `${brandLogo.name}`);
    await brandLogo.mv(newImagePath);

    existingBrand.brand_logo = `/brandLogo/${brandLogo.name}`;
  }

   await existingBrand.save();
  const updatedBrand = await Brand.findById(brandId);

  res.status(StatusCodes.OK).json({ status: 'Update successful', data: updatedBrand });
};



// Update a brand and associate a seller
const updateBrandSeller = async (req, res) => {
  const { brandId } = req.params;
  const updatedBrand = await Brand.findByIdAndUpdate(
    brandId,
    { $addToSet: { sellerIds: req.body.sellerId} },
    { new: true }
  );

  if (!updatedBrand) {
    throw new CustomError.NotFoundError('Brand not found');
  }

  res.status(StatusCodes.OK).json({ status: 'Updation successful', data: updatedBrand });
};

// Delete a brand
const deleteBrand = async (req, res) => {
  const { brandId } = req.params;
  const deletedBrand = await Brand.findByIdAndDelete(brandId);
  if (!deletedBrand) {
    throw new CustomError.NotFoundError('Brand not found');
  }

  const brandLogoPath = path.join(__dirname, '../public', deletedBrand.brand_logo);

  // Delete the brand logo file from the file system
  fs.unlink(brandLogoPath, (err) => {
    if (err) {
      console.error('Error deleting brand logo file:', err);
    } else {
      console.log('Brand logo file deleted successfully');
    }
  });
   
  res.status(StatusCodes.OK).json({ status: 'Deletion successful', data: deletedBrand });
};

// Delete brand seller 
const deleteBrandSeller = async (req, res) => {
  const { brandId } = req.params;
  const { sellerId } = req.body;

  if (!sellerId) {
    throw new CustomError.BadRequestError('Seller ID is required');
  }

  const updatedBrand = await Brand.findByIdAndUpdate(
    brandId,
    { $pull: { sellerIds: sellerId } },
    { new: true }
  );

  if (!updatedBrand) {
    throw new CustomError.NotFoundError('Brand not found');
  }

  res.status(StatusCodes.OK).json({ status: 'Seller removal successful', data: updatedBrand });
};


module.exports = { createBrand, getAllBrands, updateBrandData, updateBrandSeller, deleteBrand,deleteBrandSeller };
