const stripe = require('stripe')(process.env.CONNECT_SK);
const express = require('express');
const app = express();
const ADMIN_ID = process.env.ADMIN_ACCOUNT_ID;

const Model = require('./webhookMethods');

app.use(express.raw());

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.WEBHOOK_SK;

app.post(
  '/',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      /* customer event handlers */
      case 'customer.source.created':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'customer.created':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'customer.updated':
        var handler = event.data.object;
        Model.muteHandler(handler);

      /* payment event handlers */
      case 'payment_method.attached':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'payment_intent.created':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'payment_intent.succeeded':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;

      /* Invoice handlers */
      case 'invoiceitem.created':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'invoice.created':
        var handler = event.data.object;
        Model.muteHandler(handler);
        // console.log('Created Invoice Item: ', handler);
        // Model.newInvoice(handler);
        break;
      case 'invoiceitem.updated':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'invoice.updated':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'invoice.paid':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'invoice.payment_succeeded':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;
      case 'invoice.finalized':
        var handler = event.data.object;
        // Model.muteHandler(handler);
        Model.invoiceFinalized(handler);
        break;

      /* Charge Event Handlers */
      case 'charge.succeeded':
        var handler = event.data.object;
        Model.muteHandler(handler);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

module.exports = app;
