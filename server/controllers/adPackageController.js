const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const AdPackage = require("../models/adPackagesSchema");
const AdPurchase = require("../models/adPurchaseSchema");
const { getApprovedAdPackageService } = require("../services/adPackageService");

const getAllAdPackages = async (req, res) => {
  const adPackages = await AdPackage.find({});
  res.status(StatusCodes.OK).json(adPackages);
};

// get approved ad package
const getApprovedAdPackage = async (req, res) => {
  const adPackages = await getApprovedAdPackageService(req.query);
  if (adPackages.length === 0) {
    throw new CustomError.BadRequestError("No ad found!");
  }
  res.status(StatusCodes.OK).json(adPackages);
};

const createAdPackage = async (req, res) => {
  const { name, position, duration, price, status } = req.body;

  if (!name || !position || !duration || !price) {
    throw new CustomError.BadRequestError(
      "Name, position, duration, and price are required fields"
    );
  }

  const adPackage = new AdPackage({
    name,
    position,
    duration,
    price,
    status: status || false,
  });
  await adPackage.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Ad Package created successfully", adPackage });
};


const updateAdPackage = async(req,res)=>{
  const adPackageId = req.params.id;
  const adPackage = await AdPackage.findById(adPackageId);
  if (!adPackage) {
    throw new CustomError.BadRequestError("Advertise PackageId is not Exists!");
  }
 
  if (req.body.name) adPackage.name = req.body.name;
  if (req.body.position) adPackage.position = req.body.position;
  if (req.body.duration) adPackage.duration = req.body.duration;
  if (req.body.price) adPackage.price = req.body.price;
  if (req.body.status !== undefined) adPackage.status = req.body.status;

  await adPackage.save();
  res.status(StatusCodes.OK).json({ msg: "Ad Package updated successfully", adPackage });   
}

const deletePackage = async(req, res)=>{
  const adPackageId = req.params.id;
  const adPackage = await AdPackage.findByIdAndDelete(adPackageId);
  if (!adPackage) {
    throw new CustomError.BadRequestError("Advertise PackageId does not exist!");
  }
  res.status(StatusCodes.OK).json({ msg: "Ad Package Deleted successfully", adPackage }); 
}


const purchaseAdPackage = async (req, res) => {
  const adPackageId = req.params.id;
  const sellerId = req.body.sellerId;
  const adPackage = await AdPackage.findById(adPackageId);
  if (!adPackage) {
    throw new CustomError.BadRequestError("Advertise PackageId is not Exists!");
  }

  const adPurchase = new AdPurchase({ sellerId, adPackageId });

  await adPurchase.save();
  // console.log(adPurchase);
  res
    .status(StatusCodes.CREATED)
    .json({
      status: "success",
      msg: "Ad Package purchased successfully",
      data: adPurchase,
    });
};

const approveAdPurchase = async (req, res) => {
  const adPurchaseId = req.params.id;
  const adPurchase = await AdPurchase.findById(adPurchaseId);

  if (!adPurchase) {
    throw new CustomError.NotFoundError("Ad Purchase not found");
  }

  if (adPurchase.status === "pending") {
    adPurchase.status = "approve";

    const adPackage = await AdPackage.findById(adPurchase.adPackageId);

    if (!adPackage) {
      throw new CustomError.NotFoundError("Associated Ad Package not found");
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + adPackage.duration);
    adPurchase.expirationDate = expirationDate;
    await adPurchase.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Ad Package approved successfully" });
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Ad Package is not in pending status" });
  }
};

const rejectAdPurchase = async (req, res) => {
  const adPurchaseId = req.params.id;
  const adPurchase = await AdPurchase.findById(adPurchaseId);

  if (!adPurchase) {
    throw new CustomError.NotFoundError("Ad Purchase not found");
  }

  if (adPurchase.status === "pending") {
    adPurchase.status = "reject";
    await adPurchase.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Ad Package rejected successfully" });
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Ad Package is not in pending status" });
  }
};

module.exports = {
  createAdPackage,
  updateAdPackage,
  deletePackage,
  getAllAdPackages,
  purchaseAdPackage,
  approveAdPurchase,
  rejectAdPurchase,
  getApprovedAdPackage,
};
