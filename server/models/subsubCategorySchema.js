const mongoose = require('mongoose');

const subsubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the subsubcategory name'],
      maxlength: 50,
      unique: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required:true
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
      required:true
    },
    subsubsubCategory:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subsubsubcategory',
    }],
    discountPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount_Post',
      },
      status:{
        type: Boolean,
        default:true
      }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Subsubcategory', subsubcategorySchema);

