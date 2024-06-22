const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Discount = require('../models/discountSchema');
const Category = require('../models/categorySchema');
const Subcategory = require('../models/subCategorySchema');
const Subsubcategory = require('../models/subsubCategorySchema');
const Subsubsubcategory = require('../models/subsubsubCategorySchema');
const Brand = require('../models/brandSchema');
const Seller = require('../models/sellerSchema');
const path = require('path');
const discountServices = require('../services/discountService');

const createDiscount = async (req, res) => {
  if (!req.body || !req.files) {
    throw new CustomError.BadRequestError(
      'Please provide discount information and upload an image!'
    );
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  // const maxSize = 1024 * 1024;

  // if (productImage.size > maxSize) {
  //   throw new CustomError.BadRequestError(
  //     "Please upload image smaller than 1MB"
  //   );
  // }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  const discountData = {
    product_name: req.body.product_name,
    price: req.body.price || 0,
    description: req.body.description,
    brand_id: req.body.brand_id || '',
    image: `https://api.discounthutdeshit.tailormaster.xyz/uploads/${productImage.name}`,
    category_id: req.body.category_id,
    subcategory_id: req.body.subcategory_id,
    sub_sub_category_id: req.body.sub_sub_category_id,
    sub_sub_sub_category_id: req.body.sub_sub_sub_category_id,
    discount_type: req.body.discount_type,
    discount: req.body.discount,
    seller_id: req.body.seller_id,
    start_datetime: req.body.start_datetime,
    end_datetime: req.body.end_datetime,
    sku: req.body.sku,
    status: req.body.status || 'pending',
  };

  // console.log(discountData);

  const discount = await Discount.create(discountData);

  res.status(StatusCodes.CREATED).json({ discount });
};

const getDiscount = async (req, res) => {
  // console.log(req.query)
  const { id, categoryId, subCategoryId, address, status, seller_id } =
    req.query;

  let sellerIds;

  if (address) {
    // get all seller for the specific address
    const sellersInAddress = await discountServices.getSellerByAddress(address);

    if (sellersInAddress.length === 0) {
      throw new CustomError.BadRequestError('No sellers found to the address!');
    }

    sellerIds = sellersInAddress.map((seller) => seller._id);
  }

  // find discount based on category sub category and specific address
  let query = { id, categoryId, subCategoryId, sellerIds, status, seller_id };

  const discounts = await discountServices.getDiscountService(query);

  if (discounts.length === 0) {
    throw new CustomError.BadRequestError(
      'Discounts not found with this query'
    );
  }

  res.status(StatusCodes.OK).json({ status: 'success', data: discounts });
};

const getSingleDiscount = async (req, res) => {
  const { id } = req.params;
  const discount = await Discount.findOne({ _id: id, status: 'approved' })
    .populate('category_id')
    .populate('subcategory_id')
    .populate('sub_sub_category_id')
    .populate('sub_sub_sub_category_id')
    .populate('discount_type');

  if (!discount) {
    throw new CustomError.BadRequestError('Failed to fetch the discount data');
  }
  res.status(StatusCodes.OK).json({ status: 'Success', data: discount });
};

const deleteDiscount = async (req, res) => {
  const discountId = req.params.id;

  const discount = await Discount.findByIdAndDelete(discountId);

  if (!discount) {
    throw new CustomError.NotFoundError('Discount not found');
  }

  res
    .status(StatusCodes.OK)
    .json({ status: 'Success', message: 'Discount deleted successfully' });
};

const updateDiscount = async (req, res) => {
  const discountId = req.params.id;

  const discount = await Discount.findByIdAndUpdate(discountId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!discount) {
    throw new CustomError.NotFoundError('Discount not found');
  }

  res.status(StatusCodes.OK).json({
    status: 'Success',
    message: 'Discount Update Successfully!',
    data: discount,
  });
};

const imageUpload = async (req, res) => {
  // console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.imageXYZ; // in postman ->form-data -> imageXYZ = pop.jpeg

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath); //* move the image file in 'imagepath' (important)

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

//* category based Discount search controller

const getQueryResultBasedOnCategory = async (req, res) => {
  const { categoryName } = req.params;

  const { searchQuery } = req.query;

  // console.log(categoryName);

  const category = await Category.findOne({ name: categoryName });

  if (!category) {
    throw new CustomError.NotFoundError('category not found!!!');
  }

  //* Construct query conditions based on category and search query
  let query = {
    category_id: category._id,
  };

  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'i'); // Case-insensitive search

    const productQuery = { product_name: { $regex: regex } };
    productQuery.category_id = category._id;
    const products = await Discount.find(productQuery);

    if (products.length > 0) {
      res.status(StatusCodes.OK).json({ products });
      return;
    }

    // Check if the searchQuery matches a brand name
    const brandQuery = { brandName: { $regex: regex } };
    const brand = await Brand.findOne(brandQuery);

    if (brand) {
      query.brand_id = brand._id;
    }

    // Check if the searchQuery matches a shop name
    const shopQuery = { shopName: { $regex: regex } };
    const shop = await Seller.findOne(shopQuery);

    if (shop) {
      query.seller_id = shop._id;
    }
  }

  const products = await Discount.find(query);
  // console.log(products.length);
  // .populate('brand_id')
  // .populate('category_id')
  // .populate('subcategory_id')
  // .populate('seller_id');
  // .populate('subcategory_id', 'name'); // only showing name field

  // console.log(searchQuery, query, products.length);

  res.status(StatusCodes.OK).json({ products });
};

//* Discount search globally

// const getQueryResultGlobally = async (req, res) => {
//   const { searchQuery } = req.query;
//   let query = {};

//   if (searchQuery) {

//     const regex = new RegExp(searchQuery, 'i'); // Case-insensitive search

//     const productQuery = { product_name: { $regex: regex } };
//     const products = await Discount.find(productQuery);

//     if (products.length > 0) {
//       res.status(StatusCodes.OK).json({ products });
//       return;
//     }

//     // Check if the searchQuery matches a brand name
//     const brandQuery = { brandName: { $regex: regex } };
//     const brand = await Brand.findOne(brandQuery);

//     if (brand) {
//       query.brand_id = brand._id;
//     }

//     // Check if the searchQuery matches a shop name
//     const shopQuery = { shopName: { $regex: regex } };
//     const shop = await Seller.findOne(shopQuery);

//     if (shop) {
//       query.seller_id = shop._id;
//     }

//     //check if searchQuery matches a category name
//     const categoryQuery = { name: { $regex: regex }};
//     const category = await Category.findOne(categoryQuery);
//     if (category){
//       query.category_id = category._id;
//     }
//     //check if searchQuery matches a subcategory name
//     const subcategoryQuery = { name: { $regex: regex }};
//     const subcategory = await Subcategory.findOne(subcategoryQuery)
//     if (subcategory){
//       query.subcategory_id = subcategory._id;
//       // console.log(subcategory._id)
//       // console.log(query)
//     }
//     //check if searchQuery matches a subsubcategory name
//     const subsubcategoryQuery = { name: { $regex: regex }};
//     const subsubcategory = await Subsubcategory.findOne(subsubcategoryQuery)
//     if (subsubcategory){
//       query.sub_sub_category_id = subsubcategory._id;
//     }
//     //check if searchQuery matches a subsubsubcategory name
//     const subsubsubcategoryQuery = { name: { $regex: regex }};
//     const subsubsubcategory = await Subsubsubcategory.findOne(subsubsubcategoryQuery)
//     if (subsubsubcategory){
//       query.sub_sub_sub_category_id = subsubsubcategory._id;
//     }

//     console.log(query);

//   }
//   const products = await Discount.find(query);
//   res.status(StatusCodes.OK).json({ count: products.length, products});
// };

const getQueryResultGlobally = async (req, res) => {
  const { searchQuery } = req.query;
  let query = {};

  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'i'); // Case-insensitive search

    // Find products by product name
    const products = await Discount.find({
      product_name: { $regex: regex },
    }).populate('discount_type');
    if (products.length > 0) {
      return res
        .status(StatusCodes.OK)
        .json({ count: products.length, products });
    }

    // Check if the searchQuery matches a brand name
    const brand = await Brand.findOne({ brandName: { $regex: regex } });
    if (brand) {
      query.brand_id = brand._id;
      const matchedProducts = await Discount.find(query).populate(
        'discount_type'
      );
      return res
        .status(StatusCodes.OK)
        .json({ count: matchedProducts.length, products: matchedProducts });
    }

    // Check if the searchQuery matches a shop name
    const shop = await Seller.findOne({ shopName: { $regex: regex } });
    if (shop) {
      query.seller_id = shop._id;
      const matchedProducts = await Discount.find(query).populate(
        'discount_type'
      );
      return res
        .status(StatusCodes.OK)
        .json({ count: matchedProducts.length, products: matchedProducts });
    }

    //check if searchQuery matches a category name
    const category = await Category.findOne({ name: { $regex: regex } });
    if (category) {
      query.category_id = category._id;
      const matchedProducts = await Discount.find(query).populate(
        'discount_type'
      );
      return res
        .status(StatusCodes.OK)
        .json({ count: matchedProducts.length, products: matchedProducts });
    }

    //check if searchQuery matches a subcategory name
    const subcategory = await Subcategory.findOne({ name: { $regex: regex } });
    if (subcategory) {
      query.subcategory_id = subcategory._id;
      const matchedProducts = await Discount.find(query).populate(
        'discount_type'
      );
      return res
        .status(StatusCodes.OK)
        .json({ count: matchedProducts.length, products: matchedProducts });
    }

    //check if searchQuery matches a subsubcategory name
    const subsubcategory = await Subsubcategory.findOne({
      name: { $regex: regex },
    });
    if (subsubcategory) {
      query.sub_sub_category_id = subsubcategory._id;
      const matchedProducts = await Discount.find(query).populate(
        'discount_type'
      );
      return res
        .status(StatusCodes.OK)
        .json({ count: matchedProducts.length, products: matchedProducts });
    }

    //check if searchQuery matches a subsubsubcategory name
    const subsubsubcategory = await Subsubsubcategory.findOne({
      name: { $regex: regex },
    });
    if (subsubsubcategory) {
      query.sub_sub_sub_category_id = subsubsubcategory._id;
      const matchedProducts = await Discount.find(query).populate(
        'discount_type'
      );
      return res
        .status(StatusCodes.OK)
        .json({ count: matchedProducts.length, products: matchedProducts });
    }
  }

  // Find products matching the query
  const matchedProducts = await Discount.find(query).populate('discount_type');
  res
    .status(StatusCodes.OK)
    .json({ count: matchedProducts.length, products: matchedProducts });
};

module.exports = {
  createDiscount,
  getDiscount,
  imageUpload,
  updateDiscount,
  deleteDiscount,
  getSingleDiscount,
  getQueryResultBasedOnCategory,
  getQueryResultGlobally,
};

/* 

const query = {
    category_id: category._id,
  };

  if (searchQuery) {
    const regexQuery = { $regex: new RegExp(searchQuery, 'i') }; // Case-insensitive search
    query.$or = [
      { product_name: regexQuery }, // Search by product name
      { 'brand_id.brandName': regexQuery }, // Search by brand name
    ];
  } 
  
  */
