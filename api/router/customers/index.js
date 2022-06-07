const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SK);

app.use(express.json());


app.post("/", async (req, res) => {
  let { address, email, name, phone, shipping } = req.body;

  try {
    const customer = await stripe.customers.create({
      address,
      email,
      name,
      phone,
      shipping,
    });
    res.json({ customer: customer, success: true , id: customer.id});
  } catch (err) {
    console.log("Customer Creation error", err);
  }
});

// app.get("/all", async (req, res) => {
//     const customers = await stripe.customers.list({
//         limit: 5,
//     });

//     if(!customers){
//         res.json( {message: 'erorr rendering list: ', error})
//     } else {
//     res.json({message: 'rendering customer list: ', list: customers});
//     }
// });

// app.get("/:id", async (req, res) => {

//     const customers = await stripe.customers.list({
//         limit: 5,
//     });

//     if(!customers){
//         res.json( {message: 'erorr rendering list: ', error})
//     } else {
//     res.json({message: 'rendering customer list: ', list: customers});
//     }
// });

// app.post('/:id', async(req, res) => {
//     let {id, address} = req.body;

//     let customer = await stripe.customers.update(
//         id,
//         {
//             address: {
//                 city: address.addressCity,
//                 country: address.addressCountry,
//                 line1: address.addressLine1,
//                 line2: address.addressLine2,
//                 postal_code: address.addressPostal_code,
//                 state: address.addressState,
//             }
//         }
//     )
//     res.json({message: 'customer updated: ', customer: customer});
// })

module.exports = app;
