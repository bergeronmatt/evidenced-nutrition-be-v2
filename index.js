require('dotenv').config();

const server = require('./api');

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`=== SERVER IS RUNNING ON http;//localhost:${port}`);
})