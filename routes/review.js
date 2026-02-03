const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/ExpressError.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const listingController = require("../controllers/review.js");


// POST Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(listingController.createReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(listingController.destroyReview));

module.exports = router;