const AuthenticationClient = require('auth0').AuthenticationClient;
const pkceChallenge = require('pkce-challenge');
const axios = require('axios');
const credentials = require('./credentials.js');

console.log(credentials);

module.exports.authenticate = async () => {
  const url = 'https://myanimelist.net/v1/oauth2/authorize';
  const code_challenge = pkceChallenge(128);
  const params = {
    response_type: 'code',
    code_challenge,
  };
  const res = await axios.get(url, params);
}