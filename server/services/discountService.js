const Discount = require("../models/discountSchema");
const Seller = require("../models/sellerSchema");

const getSellerByAddress = async (address) => {
  const result = await Seller.find({ "shopDetails.shopAddress": address });
  return result;
};

const getDiscountService = async (query) => {
  const { id, categoryId, subCategoryId, sellerIds, status, seller_id } = query;

  let queryObject = {};
  if (id) {
    queryObject._id = id;
  }
  if (categoryId) {
    queryObject.category_id = categoryId;
  }

  if (subCategoryId) {
    queryObject.subcategory_id = subCategoryId;
  }

  if (sellerIds) {
    queryObject.seller_id = { $in: sellerIds };
  }

  if (status) {
    queryObject.status = status;
  }
  if (seller_id) {
    queryObject.seller_id = seller_id;
  }
  // console.log(queryObject.seller_id)
  const result = await Discount.find(queryObject)
    .sort("-createdAt")
    .populate({ path: "brand_id" })
    .populate({ path: "category_id" })
    .populate({ path: "subcategory_id" })
    .populate({ path: "seller_id" })
    .populate({ path: "sub_sub_category_id" })
    .populate({ path: "sub_sub_sub_category_id" })
    .populate({ path: "discount_type" })
    .exec();
  // console.log(result);
  return result;
};

module.exports = {
  getSellerByAddress,
  getDiscountService,
};
