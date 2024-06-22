const mongoose = require('mongoose');

const adPurchaseSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller', // change it later to 'Seller'
    required: [true, 'Please Provide the sellerId'],
  },
  adPackageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdPackage',
    required: [true, 'Please Provide the packageId'],
  },
  status: {
    type: String,
    enum: ['approve', 'reject', 'pending'],
    default: 'pending',
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('AdPurchase', adPurchaseSchema);

