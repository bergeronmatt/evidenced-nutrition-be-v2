const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());

const corsOptions = {
    origin: process.env.ORIGIN
}

server.use(cors(corsOptions));

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

module.exports = server;