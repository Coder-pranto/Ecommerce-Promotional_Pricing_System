const mongoose = require('mongoose');

const adPackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name for the ad package.'],
    },
    position: {
      type: String,
      required: [true, 'Please specify the position (top, sidebar, footer) for the ad package.'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide the duration for the ad package.'],
    },
    price: {
      type: Number,
      required: [true, 'Please specify the price for the ad package.'],
    },
    status:{
      type : Boolean ,
      default : false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AdPackage', adPackageSchema);
