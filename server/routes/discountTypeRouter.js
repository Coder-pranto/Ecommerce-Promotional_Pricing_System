const express = require('express');
const router = express.Router();
const {
  createDiscountType,
  getAllDiscountTypes,
  getDiscountTypeById,
  updateDiscountTypeById,
  deleteDiscountTypeById,
} = require('../controllers/discountTypeController');

// Routes

router.route('/')
  .post(createDiscountType)
  .get(getAllDiscountTypes);

router.route('/:id')
  .get(getDiscountTypeById)
  .patch(updateDiscountTypeById)
  .delete(deleteDiscountTypeById);

module.exports = router;

