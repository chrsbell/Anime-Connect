const AuthenticationClient = require('auth0').AuthenticationClient;
const pkceChallenge = require('pkce-challenge');
const axios = require('axios');
const { client_id, client_secret } = require('./credentials.js');
const _ = require('underscore');
const qs = require('qs');

let code_challenge = pkceChallenge(128).code_challenge;
let code_verifier = code_challenge;
let code = null;

// MAL user specific data
let tokenType = null;
let expiresIn = null;
let accessToken = null;
let refreshToken = null;

// get an authorization code from MAL
const authorizeUser = async (req, res) => {
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
  res.status(201).json({ redirectURL: `${url}?${paramString.slice(0, paramString.length - 1)}` });
};

// get the user's access token
const getAccessToken = async (req, res) => {
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
  // save this data to mongo
  tokenType = data.token_type;
  expiresIn = data.expires_in;
  accessToken = data.access_token;
  refreshToken = data.refresh_token;
  res.redirect('/');
};

// authenticate a user first, then get the access token
// todo: save user's token data to mongo (associate with user id)
const authenticate = async (req, res) => {
  // check if a code was received
  const error = req.query.error;
  if (error) {
    // the user likely didn't authorize correctly
    res.redirect('/');
  }

  // try looking up user data from mongo

  // try getting the authorization code from the url
  if (!code) {
    code = req.query.code;
  }
  if (!code) {
    await authorizeUser(req, res);
  } else if (!accessToken) {
    await getAccessToken(req, res);
  } else {
    console.log('Already authenticated!');
    res.sendStatus(200);
  }
};

module.exports = {
  authorizeUser,
  getAccessToken,
  authenticate,
  tokenType,
  expiresIn,
  accessToken,
  refreshToken,
}