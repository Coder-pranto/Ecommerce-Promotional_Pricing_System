const mongoose = require("mongoose");
const Seller = require('./sellerSchema');

const reviewSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'seller',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      // required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
  },
  {
    timestamps: true,
  }
);

// Ensure that a customer can review a seller only once
reviewSchema.index({ customerId: 1, sellerId: 1 }, { unique: true });

// Static method to calculate average rating for a seller shop
reviewSchema.statics.calculateAverageRating = async function (sellerId) {
  const stats = await this.aggregate([
    {
      $match: { sellerId: sellerId },
    },
    {
      $group: {
        // _id: "$sellerId",
        _id: null,
        nReviews: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Seller.findByIdAndUpdate(sellerId, {
      averageRating: Math.ceil(stats[0]?.avgRating),
      numReviews: stats[0]?.nReviews,
    });
  } else {
    await Seller.findByIdAndUpdate(sellerId, {
      averageRating: 0,
      numReviews: 0,
    });
  }
};

// Middleware to calculate average rating after saving a review
reviewSchema.post("save", function () {
  this.constructor.calculateAverageRating(this.sellerId);
});

// Middleware to calculate average rating after deleting a review
reviewSchema.post("findOneAndDelete", async function (doc) {
  console.log(doc);
  await this.model.calculateAverageRating(doc.sellerId);
});



module.exports = mongoose.model("Review", reviewSchema);
