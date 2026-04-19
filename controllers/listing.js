const Listing = require("../models/listing.js");

// Index Page 
const indexPage = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// New Page 
const NewPage = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Page 
const showPage = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");

  if(!listing) {
    req.flash("error", "Requested listing not found !");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Create Page 
const createPage = async (req, res) => {

  if (!req.file) {
    req.flash("error", "Image is required!");
    return res.redirect("/listings/new");
  }

  let url = req.file.path;
  let filename = req.file.filename;
  
  const { listing } = req.body;
  const newListing = new Listing(listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();

  req.flash("success", "New listing Created !");
  res.redirect("/listings");

};

// Edit Page 
const editPage = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if(!listing) {
    req.flash("error", "Requested listing not found !");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

// Update Page 
const updatePage = async (req, res) => {

  let { id } = req.params;
  const { listing } = req.body;
  let updatedListing = await Listing.findByIdAndUpdate(id, { ...listing }, { new: true });

  if(req.file) {

    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();

  }

  req.flash("success", "listing Updated !");
  res.redirect(`/listings/${id}`);

};

// Delete Page 
const deletePage = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "listing Deleted !");
  res.redirect("/listings");
};

module.exports = { indexPage, NewPage, showPage, createPage, editPage, updatePage, deletePage };
