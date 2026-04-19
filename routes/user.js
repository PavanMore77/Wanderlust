// Sign-up, Login, & Logout Page

const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signupForm, signupPage, loginForm, loginPage, logoutPage} = require("../controllers/user.js");


// Sign-up Page
router.route("/signup")
    .get( signupForm )
    .post( wrapAsync( signupPage ));


// Login Page
router.route("/login")
    .get( loginForm )
    .post( saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), loginPage );


// Logout Page
router.get("/logout", logoutPage );


module.exports = router;
