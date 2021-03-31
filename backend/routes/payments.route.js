const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51IaNZlCILXbg6WUSrunHuSSL8Pr50JLnnOWNqOuESBqw6y1m5TLXQKIt3AWITKrSia762fviBnQczSMCFe9pS45A00hvLpQytJ"
);

const calculateOrderAmount = () => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
const chargeCustomer = async (customerId) => {
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });
  // Charge the customer and payment method immediately
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    customer: customerId,
    payment_method: paymentMethods.data[0].id,
    off_session: true,
    confirm: true,
  });
  if (paymentIntent.status === "succeeded") {
    console.log("✅ Successfully charged card off session");
  }
};

router.post("/create-payment-intent", async (req, res) => {
  try {
      const product = req.body.product;
      // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
      // and attach the PaymentMethod to a new Customer
      const customer = await stripe.customers.create();
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        setup_future_usage: "off_session",
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      console.log(error.message);
  }
});

module.exports = router;
