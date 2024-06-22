const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the subcategory name'],
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
    subsubcategory:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subsubcategory',
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

module.exports = mongoose.model('Subcategory', subcategorySchema);

