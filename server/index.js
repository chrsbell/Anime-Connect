const express = require('express');
const db = require('./database-neo4j');
const animeRoute = require('./routes/anime.js');
const userRoute = require('./routes/user.js');
const OAuthRoute = require('./routes/oauth.js');

const app = express();

app.use(express.json());

const staticFiles = express.static(__dirname + '/../react-client/dist');

// use the same app for all endpoints
app.use('/', staticFiles);
app.use('/browse/', staticFiles);
app.use('/connect/', staticFiles);
app.use('/login/', staticFiles);
app.use('/signup/', staticFiles);

// Anime info API
app.use('/api/anime', animeRoute);

// User API
app.use('/api/user', userRoute);

// MAL user authentication
app.use('/api/oauth', OAuthRoute);

app.listen(3000, function () {
  console.log('Listening at http://localhost:3000');
});

const closeServer = () => {
  db.closeDriver();
  // console.log(db.session);
  process.exit();
};

process.on('exit', closeServer);
process.on('SIGINT', closeServer);
process.on('SIGUSR1', closeServer);
process.on('SIGUSR2', closeServer);
process.on('uncaughtException', closeServer);
