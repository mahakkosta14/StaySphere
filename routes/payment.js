// const express = require("express");
// const router = express.Router();

// // Fake payment route
// router.post("/pay", (req, res) => {
//   const { listingId, price } = req.body;
//   console.log("Fake payment received for:", listingId, "Amount:", price);

//   // Simulate success
//   req.flash("success", "Payment successful! Room booked.");
//   res.redirect("/listings");
// });

// router.get("/cancel", (req, res) => {
//   req.flash("error", "Payment cancelled.");
//   res.redirect("/listings");
// });


// module.exports = router;

const express = require("express");
const router = express.Router();

router.post("/pay", (req, res) => {
  const { listingId, price } = req.body;
  console.log("Fake payment received for:", listingId, "Amount:", price);

  // Instead of redirecting, render a simple congratulations page
  res.render("paymentSuccess.ejs", {
    title: "Payment Successful",
    message: "🎉 Congratulations! Your room has been booked successfully.",
    price
  });
});

module.exports = router;
