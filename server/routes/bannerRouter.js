const express = require('express');
const router = express.Router();

const {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBannerById,
    deleteBannerById
  } = require('../controllers/bannerController');


  
router.route('/').post(createBanner).get(getAllBanners);

router
  .route('/:bannerId')
  .get(getBannerById)
  .patch(updateBannerById)
  .delete(deleteBannerById);

  module.exports = router;