const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.SignupUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });

        await User.register(newUser, password);

        req.flash("success", "Welcome to Wanderlust");
        return res.redirect("/listings");

    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
};

// module.exports.SignupUser = async (req, res, next) => {
//     try {
//         let { username, email, password } = req.body;
//         const newUser = new User({ username, email });

//         let registeredUser = await User.register(newUser, password);

//         req.login(registeredUser, (err) => {
//             if (err) {
//                 return next(err);   //  now next exists
//             }
//             req.flash("success", "Welcome to Wanderlust");
//             return res.redirect("/listings"); //  return added
//         });

//     } catch (e) {
//         req.flash("error", e.message);
//         return res.redirect("/signup"); //  return added
//     }
// };

// module.exports.SignupUser = (async (req, res, next) => {
//     try{
//         let {username, email, password} = req.body;
//         const newUser = new User({username, email});
//         let registeredUser  = await User.register(newUser, password);
//         console.log(registeredUser);
//         req.login(registeredUser,(err) => {
//         if(err) {
//             return next(err);
//         }
//         req.flash("success", "Welcome to Wanderlust");
//         return res.redirect("/listings");
//     });
//     }catch(e){
//         req.flash("error", e.message);
//         return res.redirect("/signup");
//     }  
// });

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
};

module.exports.loginUser = async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust! You are logged in!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }

module.exports.logoutUser =  (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out");
        return res.redirect("/listings")
    })
}