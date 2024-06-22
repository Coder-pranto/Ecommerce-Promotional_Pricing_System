const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  adPackageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdPackage', 
    required: true,
  },
  adDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdPost',
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

module.exports =  mongoose.model('Advertisement', advertisementSchema);
