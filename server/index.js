const express = require('express');
// const db = require('../database-mongo');
const oauth = require('./oauth');
const app = express();

app.use(express.json());

const staticFiles = express.static(__dirname + '/../react-client/dist');

// use the same app for all endpoints
app.use('/', staticFiles);
app.use('/browse/', staticFiles);
app.use('/connect/', staticFiles);
app.use('/login/', staticFiles);

// MAL user authentication
app.use('/oauth', oauth.authenticate);

app.listen(3000, function () {
  console.log('Listening at http://localhost:3000');
});
