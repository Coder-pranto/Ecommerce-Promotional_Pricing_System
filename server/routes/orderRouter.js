const express = require('express');
const router = express.Router();
const {
  createOrder,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/all', getAllOrders);
router.get('/:id', getSingleOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
