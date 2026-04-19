// Middleware file

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { joiSchema, reviewSchema } = require("./newSchema.js");

// joi detect error :- Normal Schema
const validateListing = (req, res, next) => {

  let { error } = joiSchema.validate(req.body);

  if(error) {
    let errMsg = error.details.map((el) =>  el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  else {
    next();
  }
}

// joi detect error :- Review Schema
const validateReview = (req, res, next) => {

  let { error } = reviewSchema.validate(req.body);

  if(error) {
    let errMsg = error.details.map((el) =>  el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  else {
    next();
  }
}

// verify User login & Create listing

const requireLogin = (req, res, next) => {

  if(!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
    
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const verifyOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
     return res.redirect(`/listings/${id}`);
  }
   next();
}

const verifyReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports = {validateListing, validateReview, requireLogin, saveRedirectUrl, verifyOwner, verifyReviewAuthor};

