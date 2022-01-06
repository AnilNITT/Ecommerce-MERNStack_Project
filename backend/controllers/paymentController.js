const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Stripe = require("stripe")
const stripe = new Stripe("sk_test_51K6CEsSCqGKG0ElcnWqKpoGRG6Bkkcc4631wb5Fk7desBhjcNHhdtx498g9UaF8IQ0l4opXgh7Dgmhjn8rRAaaEL00AZWwcp1V");

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "INR",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});


exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
