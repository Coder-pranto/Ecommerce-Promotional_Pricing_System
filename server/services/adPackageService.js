const AdPackage = require("../models/adPackagesSchema");

const getApprovedAdPackageService = async (query) => {
  const { status } = query;
  let queryObject = {};
  if (status) {
    queryObject.status = status;
  }
  const result = await AdPackage.find(queryObject);
  return result;
};

module.exports = {
  getApprovedAdPackageService,
};
