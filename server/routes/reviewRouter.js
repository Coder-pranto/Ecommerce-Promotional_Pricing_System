const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.post('/', reviewController.createReview);

router.get('/:reviewId', reviewController.getSingleReview);

router.get('/', reviewController.getAllReviews);

router.get('/seller/:sellerId', reviewController.getReviewsBySellerId);

router.patch('/:reviewId', reviewController.updateReview);

router.delete('/:reviewId', reviewController.deleteReview);

router.delete('/seller/:sellerId', reviewController.deleteReviewsBySellerId);

module.exports = router;
