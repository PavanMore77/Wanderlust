const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const reviewPage = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;
  await newReview.save();

  listing.reviews.push(newReview._id);
  await listing.save();

  req.flash("success", "New Review Created !");
  res.redirect(`/listings/${listing._id}`);
};

const deleteReviewPage = async (req, res) => {
  let {id, reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews : reviewId }});
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted !");
  res.redirect(`/listings/${id}`);
};

module.exports = { reviewPage, deleteReviewPage };
