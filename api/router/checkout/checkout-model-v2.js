const stripe = require('stripe')(process.env.STRIPE_SK);
const res = require('express/lib/response');
const { uuid } = require('uuidv4');

// Search Stripe for existing customers

async function searchCustomers(email) {
  try {
    const customer = await stripe.customers.search({
      query: `email:\"${email}\"`,
    });

    if (customer.data.length === 0) {
      return null;
    } else {
      return customer.data[0];
    }
  } catch (err) {
    console.log('Error: ', err);
    return;
  }
}

// Create New Customer

async function createCustomer(customer, paymentMethod) {
  try {
    const name = `${customer.info.customerInfoFName} ${customer.info.customerInfoLName}`;

    const newCustomer = await stripe.customers.create({
      name: name,
      email: customer.info.customerInfoEmail,
      address: {
        city: customer.address.addressCity,
        line1: customer.address.addressLine1,
        line2: customer.address.addressLine2,
        postal_code: customer.address.addressPostal_code,
        state: customer.address.addressState,
      },
      payment_method: paymentMethod.id,
    });

    const newPayment = await stripe.customers.listPaymentMethods(
      newCustomer.id,
      {
        type: 'card',
      }
    );

    await stripe.paymentMethods.update(
      newPayment.data[0].id,
      {
        billing_details: {
          name: name,
          address: {
            city: customer.address.addressCity,
            line1: customer.address.addressLine1,
            line2: customer.address.addressLine2,
            postal_code: customer.address.addressPostal_code,
            state: customer.address.addressState,
          },
          email: customer.info.customerInfoEmail,
        },
      }
    );

    return newCustomer;
  } catch (err) {
    return;
  }
}

// Create paymentIntent and save payment method

async function createIntent(amount, customer, paymentMethod) {
  const TransferId = uuid();

  // Get all payment methods associated with the customer

  try{

    const paymentList = await stripe.customers.listPaymentMethods(
      customer.id,
      {
        type: 'card',
      }
    );

    // console.log("Customer Payment Methods: ", paymentList.data);
    // console.log("Test payment method fingerprint: ", paymentList.data[0].card.last4);
    // console.log("Submitted payment method fingerpring: ", paymentMethod.card.last4)

    var submittedLast4 = paymentMethod.card.last4;
    var card_id;

    for(var i = 0; i < paymentList.data.length; i++) {
      if(paymentList.data[i].card.last4 === submittedLast4){
        card_id = paymentList.data[i].id;
      } else {
        card_id = paymentMethod.id

        const attached = await stripe.paymentMethods.attach(
          card_id,
          {customer: customer.id}
        );

        const updated =await stripe.paymentMethods.update(
          card_id,
          {
            billing_details: {
              name: customer.id,
              address: {
                city: customer.address.city,
                line1: customer.address.line1,
                line2: customer.address.line2,
                postal_code: customer.address.postal_code,
                state: customer.address.state,
              },
              email: customer.email,
            },
          }
        );

      }
    }

  }catch(err) {
    return;
  }

  try {

    const intent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      customer: customer.id,
      currency: 'USD',
      capture_method: 'automatic',
      amount: amount,
      description: 'Evidenced Nutrition Consultation Fee',
      confirm: true,
      payment_method: card_id,
      receipt_email: customer.email,
      metadata: {
        on_behalf_of: 'Evidenced Nutrition',
      },
      transfer_group: TransferId,
    });

    return intent;
  } catch (err) {
    return;
  }
}

// Create Transfer

async function createTransfer(intent) {
  let total = intent.amount;

  let fee = Math.round(total * 0.05 + 60);

  let amount = total - fee;

  let transactionSource = intent.charges.data[0].id;

  try {
    const transfer = await stripe.transfers.create({
      amount: amount,
      currency: 'usd',
      destination: 'acct_1J0q6DGFndXMjubu',
      transfer_group: intent.transfer_group,
      source_transaction: transactionSource,
    });
    return transfer;
  } catch (err) {
    return;
  }
}

module.exports = {
  searchCustomers,
  createCustomer,
  createIntent,
  createTransfer,
};
