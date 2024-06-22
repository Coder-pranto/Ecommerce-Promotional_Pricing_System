const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const sellerServices = require("../services/sellerService");
const path = require("path");

// controller for create seller > add profile
const createSellerAddProfile = async (req, res) => {
  const getCutomerInfoForThisSeller =
    await sellerServices.getCustomerInfoService(req.body.customerId);

  if (!getCutomerInfoForThisSeller) {
    throw new customError.BadRequestError("You need to be a customer before seller!");
  }

  // upload shop logo
  const shopLogo = req.files.shopLogo;
  const shopLogoImagePath = path.join(__dirname,"../public/uploads/" + `${shopLogo.name}`);

  await shopLogo.mv(shopLogoImagePath);
  req.body.shopLogo = `uploads/${shopLogo.name}`;

  const seller = await sellerServices.createSellerAddProfile(req.body);

  if (!seller) {
    throw new customError.BadRequestError("Seller creation failed");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: seller,
  });
};

// controller for update seller > add address
const updateSellerAddAddress = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new customError.BadRequestError("Please provide seller id in params");
  }
  const seller = await sellerServices.updateSellerAddAddress(id, req.body);
  if (!seller.modifiedCount) {
    throw new customError.BadRequestError("Failed to update seller!");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Seller update successfull!",
  });
};

const updateSellerAddIdentity = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new customError.BadRequestError("Provide seller id!");
  }

  console.log(req.files);

  // upload nid or trade license images
  const identityImages = req.files.identityImage;
  if (req.body.identityType === "nid" && !identityImages.length > 0) {
    throw new customError.BadRequestError("Please provide two parts of nid!");
  }
  const uploadedImages = [];
  if (identityImages?.length > 0) {
    await Promise.all(
      identityImages.map(async (image) => {
        imagePath = path.join(
          __dirname,
          "../public/uploads/" + `${image.name}`
        );
        await image.mv(imagePath);
        uploadedImages.push(`uploads/${image.name}`);
      })
    );
  } else {
    imagePath = path.join(
      __dirname,
      "../public/uploads/" + `${identityImages.name}`
    );
    await identityImages.mv(imagePath);
    uploadedImages.push(`uploads/${identityImages.name}`);
  }
  req.body.identityImage = uploadedImages;
  const seller = await sellerServices.updateSellerAddIdentity(id, req.body);

  if (!seller.modifiedCount) {
    throw new customError.BadRequestError("Failed to update add identity!");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "seller update successfull",
  });
};

// controller for update seller location
const updateSellerLocation = async (req, res) => {
  const sellerId = req.params.id;
  const { latitude, longitude, shopMap } = req.body;

  const updatedSeller = await sellerServices.updateSellerLocationService(
    sellerId,
    [longitude, latitude],
    shopMap
  );

  if (!updatedSeller) {
    throw new customError.BadRequestError("Failed to update seller location");
  }
  res.status(StatusCodes.OK).json({ status: "success", data: updatedSeller });
};

// controller for get all seller
const getAllSeller = async (req, res) => {
  const sellers = await sellerServices.getAllSellerService();
  if (sellers.length === 0) {
    throw new customError.BadRequestError("No sellers found!");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: sellers,
  });
};

// controller for update a seller
const updateAseller = async (req, res) => {
  const seller = await sellerServices.updateASellerService(
    req.params.id,
    req.body
  );

  if (!seller.modifiedCount) {
    throw new customError.BadRequestError("Failed to update!");
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Seller successfully updated",
  });
};

// controller for update a seller
const deleteAseller = async (req, res) => {
  // change seller as customer
  await sellerServices.getCustomerbySellerIdService(req.params.id);

  const seller = await sellerServices.deleteASellerService(req.params.id);

  if (!seller.deletedCount) {
    throw new customError.BadRequestError("Failed to delete!");
  }
  console.log(seller);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Seller successfully deleted",
  });
};

module.exports = {
  createSellerAddProfile,
  updateSellerAddAddress,
  updateSellerAddIdentity,
  getAllSeller,
  updateAseller,
  deleteAseller,
  updateSellerLocation,
};
