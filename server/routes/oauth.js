const express = require('express');
const axios = require('axios');
const router = express.Router();
const OAuth = require('../oauth');

router.get('/authenticate', OAuth.authenticate);

router.get('/status', (req, res) => {
  if (OAuth.accessToken) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(200).json({ authenticated: false });
  }
});

module.exports = router;
