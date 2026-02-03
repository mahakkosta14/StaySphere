const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router.route("/")
.get( wrapAsync(listingController.index)) //index Route
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)); //create Route

//New Route
router.get ("/new", isLoggedIn,(listingController.renderNewForm));

//search Route
router.route("/search")
.get(wrapAsync(listingController.searchListing));

router.route("/:id")
.get ( wrapAsync(listingController.showListing))  //show Route
.put (isLoggedIn, isOwner, upload.single("listing[image]"), validateListing , wrapAsync(listingController.updateListing))  //update Route
.delete (isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));  //delete Route

//edit Route
router.get ("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;

