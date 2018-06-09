//This fires up our server, connects it to our front-end, and directs url requests to their proper route functions.


const path = require('path')
const express = require('express')
// const routes = require('./routes/routes')
const server = express()

server.use(express.static(path.join(__dirname, '../public')))//this connects the server to the front-end, by connecting this server to the index.html file in our public folder.

// server.use('/', routes)

module.exports = server


