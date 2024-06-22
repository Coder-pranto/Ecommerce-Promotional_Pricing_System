const mongoose = require('mongoose');

const subsubsubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the subsubsubcategory name'],
      maxlength: 50,
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
    subsubcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subsubcategory',
      required:true
    },
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

subsubsubcategorySchema.index({ name: 1, subsubcategory: 1 }, { unique: true });

module.exports = mongoose.model('Subsubsubcategory', subsubsubcategorySchema);