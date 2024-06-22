const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide the category name'],
      maxlength: 50,
      unique: true,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    subcategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
      },
    ],
    status:{
      type:Boolean,
      deafult:true
    },
    image: {
      type: String, 
      required: true,
      default:'/category/category_image.png'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);
