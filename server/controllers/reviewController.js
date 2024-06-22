const Review = require('../models/reviewSchema');
const Seller = require('../models/sellerSchema');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');


// Create a new review
const createReview = async (req, res) => {
    const { customerId, sellerId, rating, title, comment } = req.body;

    if (!customerId || !sellerId || !rating || !comment) {
        throw new CustomError.BadRequestError("Please provide all required information to create a review.");
    }
    //* Check if the provided sellerId is valid
    const isValidSeller = await Seller.findById(sellerId);
    if (!isValidSeller) {
      throw new CustomError.NotFoundError(`No seller with id: ${sellerId}`);
    }

     //* Check if the user has already submitted a review for this seller shop
     const alreadySubmitted = await Review.findOne({sellerId, customerId});

      if (alreadySubmitted) {
        throw new CustomError.BadRequestError('Already submitted review for this seller shop');
      }

    const newReview = new Review({
      customerId,
      sellerId,
      rating,
      title,
      comment,
    });

    const createdReview = await newReview.save();

    res.status(StatusCodes.CREATED).json({ message: 'Review created successfully', review: createdReview });

  };

// Update a review by review ID
const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    throw new CustomError.NotFoundError('Review not found');
  }
  console.log(req.body);

  review.rating = req.body.rating;
  review.title = req.body.title;
  review.comment = req.body.comment;

  const updatedReview = await review.save();

  res.status(StatusCodes.OK).json(updatedReview);
};

// Delete a review by review ID
const deleteReview = async (req, res) => {
  const deletedReview = await Review.findOneAndDelete({ _id: req.params.reviewId });
  if (deletedReview.deletedCount === 0) {
      throw new CustomError.NotFoundError('Review not found');
  }
  res.status(StatusCodes.OK).json({ message: 'Review deleted successfully' });
};

// Delete all reviews under a seller shop by seller ID
const deleteReviewsBySellerId = async (req, res) => {
    const { sellerId } = req.params;

    const seller = await Seller.findById(sellerId);
    if (!seller) {
        throw new CustomError.NotFoundError({ message: `Seller with ID ${sellerId} not found` });
    }

    const deletedReviews = await Review.deleteMany({ sellerId });
    if (deletedReviews.deletedCount === 0) {
        return res.status(StatusCodes.OK).json({ message: `No reviews found for deletion` });
    }

    res.status(StatusCodes.OK).json({ message: `${deletedReviews.deletedCount} reviews deleted successfully` });
};


// Get a single review by review ID
const getSingleReview = async (req, res) => {
  const review = await Review.findById({_id:req.params.reviewId}).populate('customerId sellerId');
  if (!review) {
    throw new CustomError.NotFoundError('Review not found');
  }
  res.status(StatusCodes.OK).json(review);
};

// Get all reviews
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).sort("createdAt").populate('customerId sellerId');
  res.status(StatusCodes.OK).json({msg:"All reviews retrived",reviews});
};

// Get all reviews for a specific seller shop by seller ID
const getReviewsBySellerId = async (req, res) => {
  const { sellerId } = req.params;
  const reviews = await Review.find({ sellerId }).populate('customerId sellerId');;
  if (!reviews || reviews.length === 0) {
      throw new CustomError.NotFoundError('No reviews found for this seller shop');
  }
  res.status(StatusCodes.OK).json(reviews);
};


module.exports = {
  createReview,
  getSingleReview,
  getAllReviews,
  getReviewsBySellerId,
  updateReview,
  deleteReview,
  deleteReviewsBySellerId,
};
