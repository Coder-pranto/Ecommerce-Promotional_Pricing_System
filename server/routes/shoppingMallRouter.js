const express = require('express');
const router = express.Router();
const {
  createShoppingMall,
  getAllShoppingMalls,
} = require('../controllers/shoppingMallController');

router.get('/all', getAllShoppingMalls);
router.post('/', createShoppingMall);


module.exports = router;
