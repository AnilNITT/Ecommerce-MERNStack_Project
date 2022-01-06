const express = require("express");
const { processPayment ,  sendStripeApiKey} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/payment/process").post( processPayment);

//router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;