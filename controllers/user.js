const User = require("../models/user.js");

// Signup Page
const signupForm = (req, res) => {
    res.render("users/signup.ejs");
};

const signupPage = async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Account created successfully! Welcome to Wanderlust 🎉");
            res.redirect("/listings");
        });  
    }
    catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

// Login Page
const loginForm = (req, res) => {
    res.render("users/login.ejs");
};

const loginPage = (req, res) => {
    req.flash("success", "Welcome back to Wanderlust !");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Logout Page
const logoutPage = (req, res, next) => {

    req.logout((err) => {

        if(err) {
            return next(err);
        }

        req.flash("success", "you are logged out!");
        res.redirect("/listings");

    });
};

module.exports = { signupForm, signupPage, loginForm, loginPage, logoutPage };
