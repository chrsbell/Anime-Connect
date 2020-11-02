const express = require('express');
const axios = require('axios');
const router = express.Router();
const OAuth = require('../oauth');

router.get('/all', async (req, res) => {
  const options = {
    url: 'https://api.myanimelist.net/v2/anime',
    method: 'get',
    headers: {
      Authorization: `Bearer ${OAuth.accessToken}`,
    },
  };
  const api_res = await axios(options);
  debugger;
  res.sendStatus(200);
});

module.exports = router;
