// shoppingMallModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingMallSchema = new Schema(
  {
    shoppingMallName: {
      type: String,
    },
    sellerIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'seller',
    }],
    status:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ShoppingMall', shoppingMallSchema);
