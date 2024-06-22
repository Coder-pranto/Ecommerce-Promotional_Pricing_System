const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    brandName: {
      type: String,
    },
    brandType: {
      type: String,
    },
    brandPhone:{
      type: String,
    },
    sellerIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'seller',
    }],
    brand_logo: {  
      type: String,
      default: '/brandLogo/logo.jpg', 
    },
    status:{
      type:Boolean,
      deafult:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('brand', brandSchema);

