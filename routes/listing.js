// Sub - files

const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing, requireLogin, verifyOwner } = require("../middleware.js");
const { indexPage, NewPage, showPage, createPage, editPage, updatePage, deletePage } = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route & Create Route
router.route("/")

    .get( wrapAsync( indexPage ))
    .post( requireLogin, upload.single("listing[image]"), validateListing, wrapAsync( createPage ));


//New Route
router.get("/new", requireLogin, NewPage );


//Show Route, Update Route, Delete Route
router.route("/:id")

    .get( wrapAsync( showPage ))
    .put( requireLogin, verifyOwner, upload.single("listing[image]"), validateListing, wrapAsync( updatePage ))
    .delete( requireLogin, verifyOwner, wrapAsync( deletePage ));


//Edit Route
router.get("/:id/edit", requireLogin, verifyOwner, wrapAsync( editPage ));


module.exports = router;
