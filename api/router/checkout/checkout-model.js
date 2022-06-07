const stripe = require('stripe')(process.env.STRIPE_SK)
const { uuid } = require('uuidv4');

async function createCustomer(values) {
    // console.log('create values: ', values);

    const customers = await stripe.customers.list(
        {
          limit: 100,
        },
        {
          stripeAccount: process.env.CONNECTID,
        }
      );
    
      const { data } = customers;

      if (data.length == 0) {
        console.log('no customer found');
        const customer = await stripe.customers.create(
          {
            name: values.info.customerInfoFName + ' ' + values.info.customerInfoLName,
            address: {
              line1: values.address.addressLine1,
              line2: values.address.addressLine2,
              city: values.address.addressCity,
              state: values.address.addressState,
              postal_code: values.address.addressPostal_code,
            },
            email: values.info.customerInfoEmail,
          },
          {
            stripeAccount: process.env.CONNECTID,
          }
        );
        return customer;
      } else {
        const customer = data.filter((e) => e.email === values.info.customerInfoEmail);
    
        // console.log('customer found: ', found)
        return customer;
      }

}

async function createIntent(
    paymentMethod,
    customer,
    values,
    connectId,
    business,
    amount
  ) {
    // console.log('customer: ', customer)
  
    const TransferGroup = uuid();
  
    // const customerMethod = await stripe.customers.listPaymentMethods(
    //   customer.id,
    //   { type: 'card' },
    //   { stripeAccount: `${connectId}` }
    // );
  
    // if (customerMethod.data.length == 0) {
    //   console.log('no payment methods found');
  
    //   await stripe.customers.createSource(
    //     `${customer.id}`,
    //     { source: token.id },
    //     { stripeAccount: connectId }
    //   );
      
    // } else {
    //   // console.log('payments found: ', customerMethod.data[0]);
  
    //   for (var i = 0; i < customerMethod.data.length; i++) {
    //     if (
    //       customerMethod.data[i].card.last4 === paymentMethod.card.last4
    //     ) {
    //       console.log('card found');
    //       break;
    //     } else {
  
    //       await stripe.customers.createSource(
    //         `${customer.id}`,
    //         { source: token.id },
    //         { stripeAccount: connectId }
    //       );
  
    //       break;
    //     }
    //   }
    // }
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      confirm: true,
      payment_method: paymentMethod.id,
      receipt_email: customer.email,
      shipping: {
        name: customer.name,
        phone: customer.phone,
        address: {
          line1: values.address.addressLine1,
          line2: values.address.addressLine2,
          country: 'USA',
          postal_code: values.address.addressPostal_code,
          state: values.address.addressState,
        },
      },
      metadata: {
        customer: customer.id,
        business: business
      },
      transfer_group: TransferGroup,
      on_behalf_of: connectId
    });
  
    return paymentIntent;
  }
  
  async function createTransfer(intent, connectId) {
  
    let total = intent.amount;
  
    let fee = Math.round(total * 0.05 + 60);
  
    let amount = total - fee;
  
    // console.log('Intent: ', intent)
  
    const TransferGroup = intent.transfer_group;
  
    const TransactionSource = intent.charges.data[0].id
  
    // console.log('transfer group: ', TransferGroup);
    // console.log('Transaction Source: ', TransactionSource);
  
  
    const transfer = await stripe.transfers.create({
      amount: amount,
      currency: 'usd',
      destination: connectId,
      transfer_group: TransferGroup,
      source_transaction: TransactionSource
    });
  
    console.log('Payment Transaction Success')
  
    return transfer;
  }
  
  // console.log('new payment method: ', payment)
  
  module.exports = {
    createCustomer,
    createIntent,
    createTransfer,
  };