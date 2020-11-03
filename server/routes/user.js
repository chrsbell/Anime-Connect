const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../database-neo4j');
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
  if (api_res.status === 200) {
    db.addUser(api_res.data);
    res.status(200).json(api_res.data);
  } else {
    // user should authenticate first
    res.sendStatus(401);
  }
});

// gets the user's friends using neo4j query
router.get('friends', async (req, res) => {
  res.sendStatus(200);
});

// suggest friends to a user based on params using query
router.get('suggest', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
