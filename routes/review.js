const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, requireLogin, verifyReviewAuthor } = require("../middleware.js");
const { reviewPage, deleteReviewPage } = require("../controllers/review.js");

// Review Route
router.post("/", requireLogin, validateReview, wrapAsync( reviewPage ));

// Delete Review route
router.delete("/:reviewId", requireLogin, verifyReviewAuthor, wrapAsync( deleteReviewPage ));

module.exports = router;
