const express = require('express');
const router = express.Router();
const {createBrand, getAllBrands, updateBrandData, updateBrandSeller, deleteBrand, deleteBrandSeller} = require('../controllers/brandController');


router.route('/').post(createBrand).get(getAllBrands);

router.route('/:brandId').patch(updateBrandSeller).delete(deleteBrand);

router.patch('/update/:brandId', updateBrandData);
router.patch('/delete/:brandId', deleteBrandSeller);

module.exports = router;
