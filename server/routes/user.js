const express = require('express');
const axios = require('axios');
const router = express.Router();
const OAuth = require('../oauth');

router.get('/me', async (req, res) => {
  const options = {
    url: 'https://api.myanimelist.net/v2/users/@me',
    method: 'get',
    headers: {
      Authorization: `Bearer ${OAuth.accessToken}`,
    },
  };
  const api_res = await axios(options);
  debugger;
  if (api_res.status === 200) {
    res.status(200).json(api_res.data);
  } else {
    // user should authenticate first
    res.sendStatus(401);
  }
});

module.exports = router;
