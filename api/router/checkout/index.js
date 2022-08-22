const express = require('express');
const app = express();
const Payment = require('./checkout-model-v2');

app.post('/', async (req, res) => {
  const { amount, customer, token, paymentMethod } = req.body;

  // console.log('values: ', req.body)

  // console.log('customer: ', customer)

  // console.log('amount: ', amount)

  // Payment.createCustomer(customer)
  //   .then(customerObj => {
  //     Payment.createIntent(paymentMethod, customerObj[0], customer, process.env.CONNECTID, "Evidenced Nutrition", amount)
  //       .then(intent => {
  //         Payment.createTransfer(intent, process.env.CONNECTID)
  //       })
  //   })

  var targetCustomer;

  const email = customer.info.customerInfoEmail;

  await Payment.searchCustomers(email).then((search) => {
    if (search == null) {
      Payment.createCustomer(customer, paymentMethod).then(
        (newCustomer) => {
          targetCustomer = newCustomer;
        }
      );
    } else {
      targetCustomer = search;
    }
  });

  await Payment.createIntent(amount, targetCustomer, paymentMethod)
    .then((intent) => {
      Payment.createTransfer(intent)
        .then((transfer) => {
          if (!transfer) {
            res.status(401).end();
            return;
          } else {
            res.status(200).json({ intent: intent.id });
          }
        })
        .catch((err) => {
          console.log('Transfer Error: ', err)
          res.status(500).end();
        });
    })
    .catch((err) => {
      console.log('Intent Error: ', err)
      res.status(500).end();
    });
});

module.exports = app;
