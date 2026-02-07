const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const listingController = require("../controllers/user.js");

router.route("/signup")
.get( listingController.renderSignupForm)
.post( wrapAsync(listingController.SignupUser));

router.route("/login")
.get( listingController.renderLoginForm)
.post( saveRedirectUrl, passport.authenticate("local",{ 
    failureRedirect : "/login",
    failureFlash : true,
    }), listingController.loginUser
);
// .post( saveRedirectUrl, (req, res, next) => {

//   return passport.authenticate("local", (err, user, info) => {

//     if (err) {
//       return next(err);
//     }

//     if (!user) {
//       const message = info?.message || "Invalid username or password";
//       req.flash("error", message);
//       return res.redirect("/login");
//     }

//     return req.logIn(user, (err) => {

//       if (err) {
//         return next(err);
//       }

//       req.flash("success", "Welcome back to Wanderlust! You are logged in!");

//       const redirectUrl = res.locals.redirectUrl || "/listings";

//       delete req.session.redirectUrl;

//       return res.redirect(redirectUrl);

//     });

//   })(req, res, next);

// });

router.get("/logout", listingController.logoutUser);

module.exports = router;