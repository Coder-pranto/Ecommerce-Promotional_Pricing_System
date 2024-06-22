const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Banner = require('../models/bannerSchema');
const fs = require('fs');
const path = require('path');

// Controller for creating a new banner
const createBanner = async (req, res) => {
    if (!req.body || !req.files || !req.files.banner_image) {
      throw new CustomError.BadRequestError('Please upload a banner image!');
    }
  
    const { bannerName, caption, link, status } = req.body;
    const bannerImage = req.files.banner_image;
  
    if (!bannerImage.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please upload an image file');
    }
  
    const maxSize = 1024 * 1024 * 6; // 6MB
  
    if (bannerImage.size > maxSize) {
      throw new CustomError.BadRequestError('Please upload an image smaller than 1MB');
    }
  
    const imagePath = path.join(__dirname, '../public/banner/' + `${bannerImage.name}`);
    await bannerImage.mv(imagePath);
  
    const newBanner = new Banner({
      bannerName,
      banner_image: `/banner/${bannerImage.name}`,
      caption,
      link,
      status
    });
  
    const savedBanner = await newBanner.save();
    res.status(StatusCodes.CREATED).json({ status: 'Banner Creation Successful', data: savedBanner });
  };
  

// Controller for getting all banners
const getAllBanners = async (req, res) => {
    const banners = await Banner.find();
    res.status(StatusCodes.OK).json({status: 'Data fetch successful', banners});
};

// Controller for getting a single banner by ID
const getBannerById = async (req, res) => {
    const banner = await Banner.findById(req.params.bannerId);
    if (!banner) {
        throw new CustomError.NotFoundError('Banner not found');
    }
    res.status(StatusCodes.OK).json({status: "Banner data fetch successfully", banner});
};

// Controller for updating a banner by ID
const updateBannerById = async (req, res) => {
    const { bannerName, caption, link, status } = req.body;
    const { bannerId } = req.params;
  
    const existingBanner = await Banner.findById(bannerId);
  
    if (!existingBanner) {
      throw new CustomError.NotFoundError('Banner not found');
    }
  
    existingBanner.bannerName = bannerName || existingBanner.bannerName;
    existingBanner.caption = caption || existingBanner.caption;
    existingBanner.link = link || existingBanner.link;
    existingBanner.status = status !== undefined ? status : existingBanner.status;
  
    // Handle banner image update
    if (req.files && req.files.banner_image) {
      // Delete the old image
      const imagePath = path.join(__dirname, '../public', existingBanner.banner_image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting banner image:', err);
        } else {
          console.log('Banner image deleted successfully');
        }
      });
  
      const bannerImage = req.files.banner_image;
  
      if (!bannerImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload an image file');
      }
  
      const maxSize = 1024 * 1024 * 6; // 6MB
  
      if (bannerImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload an image smaller than 6MB');
      }
  
      const newImagePath = path.join(__dirname, '../public/banner/' + `${bannerImage.name}`);
      await bannerImage.mv(newImagePath);
  
      existingBanner.banner_image = `/banner/${bannerImage.name}`;
    }
  
    await existingBanner.save();
    const updatedBanner = await Banner.findById(bannerId);
  
    res.status(StatusCodes.OK).json({ status: 'Update successful', data: updatedBanner });
  };
  

// Delete a banner by ID
const deleteBannerById = async (req, res) => {
    const { bannerId } = req.params;
  
    const deletedBanner = await Banner.findByIdAndDelete(bannerId);
  
    if (!deletedBanner) {
      throw new CustomError.NotFoundError('Banner not found');
    }
  
    const bannerImagePath = path.join(__dirname, '../public', deletedBanner.banner_image);
  
    // Delete the banner image file from the file system
    fs.unlink(bannerImagePath, (err) => {
      if (err) {
        console.error('Error deleting banner image file:', err);
      } else {
        console.log('Banner image file deleted successfully');
      }
    });
  
    res.status(StatusCodes.OK).json({ status: 'Deletion successful', data: deletedBanner });
  };
  

module.exports = {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBannerById,
    deleteBannerById
  };
