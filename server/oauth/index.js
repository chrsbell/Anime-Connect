const pkceChallenge = require('pkce-challenge');
const axios = require('axios');
const { client_id, client_secret } = require('./credentials.js');
const _ = require('underscore');
const qs = require('qs');

// Code verifier should be set equal to code verifier for plain type transformation
let code_challenge = pkceChallenge(128).code_challenge;
let code_verifier = code_challenge;
let code = null;

// Get an authorization code from MAL
const authenticateUser = async (req, res) => {
  const url = 'https://myanimelist.net/v1/oauth2/authorize';
  const params = {
    response_type: 'code',
    client_id,
    code_challenge,
  };
  let paramString = '';
  _.each(params, (value, key) => {
    paramString = `${paramString}${key}=${encodeURIComponent(value)}&`;
  });
  res.status(201).json({
    redirectURL: `${url}?${paramString.slice(0, paramString.length - 1)}`,
  });
};

// Get the MAL user's access token
const authenticateUserToken = async (req, res) => {
  const options = {
    url: 'https://myanimelist.net/v1/oauth2/token',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: qs.stringify({
      client_id,
      client_secret,
      code,
      code_verifier,
      grant_type: 'authorization_code',
    }),
  };
  const { data } = await axios(options);
  OAuth.tokenType = data.token_type;
  OAuth.expiresIn = data.expires_in;
  OAuth.accessToken = data.access_token;
  console.log(data.access_token);
  OAuth.refreshToken = data.refresh_token;
  res.redirect('/');
};

// Authenticate a user first, then get the access token
// todo: save user's token data to mongo (associate with user id)
const authenticate = async (req, res) => {
  // check if a code was received
  const error = req.query.error;
  if (error) {
    // the user likely didn't authorize correctly
    res.redirect('/');
  }

  // try getting the authorization code from the url
  if (!code) {
    code = req.query.code;
  }
  if (!code) {
    await authenticateUser(req, res);
  } else if (!OAuth.accessToken) {
    await authenticateUserToken(req, res);
  } else {
    console.log('Already authenticated!');
    res.sendStatus(200);
  }
};

let OAuth = (module.exports = {
  authenticate,
  authenticateUser,
  authenticateUserToken,
  // MAL user specific data
  tokenType: null,
  expiresIn: null,
  accessToken: null,
  refreshToken: null,
});
