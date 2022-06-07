const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SK);
const Payment = require('./checkout-model');

app.post("/", async (req, res) => {
  const {amount, customer, token, paymentMethod} = req.body;

  // console.log('values: ', req.body)

  // console.log('customer: ', customer)

  console.log('amount: ', amount)

  Payment.createCustomer(customer)
    .then(customerObj => {
      Payment.createIntent(paymentMethod, customerObj[0], customer, process.env.CONNECTID, "Evidenced Nutrition", amount)
        .then(intent => {
          Payment.createTransfer(intent, process.env.CONNECTID)
        })
    })
});

module.exports = app;
