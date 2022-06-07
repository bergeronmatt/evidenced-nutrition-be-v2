const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());

server.use(cors());

server.get('/api', (req, res) => {
    res.status(200).json({message: 'The api is up and running'})
})

const userRouter = require('./router/users');
const blogRouter = require('./router/blog');
const authRouter = require('./router/auth');

server.use('/api/users', userRouter)
server.use('/api/blog', blogRouter)
server.use('/api/auth', authRouter)

module.exports = server;