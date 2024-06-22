const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema(
  {
    bannerName: {
      type: String,
    },
    banner_image: {
      type: String,
      default: '/banner/banner.jpg',
    },
    caption: {
      type: String,
    },
    link: {
      type: String,
    },
    status: {
      type: Boolean,
      deafult: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('banner', bannerSchema);
