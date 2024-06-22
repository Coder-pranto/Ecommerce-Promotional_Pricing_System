const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount'},
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'seller'}, 
        quantity: { type: Number, default: 1 }
    }],
    buyer: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
        address: { type: String, required:[true, "Address is required"]},
        district: { type: String, required: [true, "district is required"] },
        guest:{type:Boolean, deafult:false},
        guestName: { type: String},
        guestEmail: { type: String},
        guestPhone: { type: String},
    },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  {
    timestamps: true,
  });
  
module.exports = mongoose.model('Order', orderSchema);
