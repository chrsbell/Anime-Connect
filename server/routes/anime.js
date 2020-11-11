const express = require('express');
const axios = require('axios');
const router = express.Router();
const OAuth = require('../oauth');
const db = require('../database-neo4j');

// get anime by ranking
router.get('/ranking', async (req, res) => {
  const options = {
    url: 'https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=50',
    method: 'get',
    headers: {
      Authorization: `Bearer ${OAuth.accessToken}`,
    },
  };
  const api_res = await axios(options);
  debugger;
  if (api_res.status === 200) {
    res.status(200).send(api_res.data.data);
  } else {
    res.sendStatus(401);
  }
});

// get a user's anime list sorted by score and insert to db
router.get('/list/:username', async (req, res) => {
  const { username } = req.params;
  const options = {
    url: `https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status,rank&limit=50&sort=list_score`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${OAuth.accessToken}`,
    },
  };
  const api_res = await axios(options);
  debugger;
  if (api_res.status === 200) {
    api_res.data.data.forEach(async (entry) => {
      await db.addUserAnime(username, entry);
    });
    res.status(200).send(api_res.data.data);
  } else {
    res.sendStatus(401);
  }
});

// get details of an anime
router.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const options = {
    url: `https://api.myanimelist.net/v2/anime/${id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,recommendations,studios,statistics`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${OAuth.accessToken}`,
    },
  };
  const api_res = await axios(options);
  debugger;
  if (api_res.status === 200) {
    db.addAnime(api_res.data);
    res.status(200).send(api_res.data);
  } else {
    res.sendStatus(401);
  }
});

// get anime by season
router.get('/seasonal', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
