const mongoose = require('mongoose');
const credentials = require('./credentials');
mongoose.connect(
  `mongodb://${credentials.user}:${credentials.password}@localhost/anilist_encrypted`,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('connected');
});

module.exports = db;
