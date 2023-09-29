const express = require('express');
const rateLimiter = require('./rate-limit/rate-limit.js');

const app = express();

app.use(express.json());

/** Configure routes */
app.get('/', (req, res) => {res.send('Hello World!');});
app.get('/take/:verb/:path*', rateLimiter.limitRequests);

/** Error handling */

// catch undefined routes and respond with 404
app.use(function(req, res, next) {
    res.status(404).send("route not found")
  });

// catch server errors and respond with 500
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

module.exports = app;

