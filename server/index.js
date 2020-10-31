const express = require('express');
const db = require('../database-mongo');
const auth = require('./auth');

const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/../react-client/dist'));

// MAL user authentication
app.use('/authenticate', auth.authenticate);

app.get('/items', (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, function() {
  console.log('Listening at http://localhost:3000');
});