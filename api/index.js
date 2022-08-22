const express = require('express');
const cors = require('cors');
// const stripe = require('stripe')(process.env.STRIPE_SK);

const server = express();

const corsOptions = {
    origin: process.env.ORIGIN
}

server.use(cors());

const webhookRouter = require('./router/webhook');
server.use('/api/webhook', webhookRouter);

server.use(express.json());

server.get('/api', (req, res) => {
    res.status(200).json({message: 'The api is up and running'})
})

const userRouter = require('./router/users');
const blogRouter = require('./router/blog');
const authRouter = require('./router/auth');
const checkoutRouter = require('./router/checkout');
const customerRouter = require('./router/customers');

server.use('/api/users', userRouter);
server.use('/api/blog', blogRouter);
server.use('/api/auth', authRouter);
server.use('/api/checkout', checkoutRouter);
server.use('/api/customers', customerRouter)

// // webhook handler
// const endpointSecret = "whsec_80787ca4c46fa0a4000229c26ecf72c743b92048acbdc89c10613e7d4ec475ff";

// server.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'invoice.payment_succeeded':
//       const invoice = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       console.log('hitting webhook')
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

module.exports = server;