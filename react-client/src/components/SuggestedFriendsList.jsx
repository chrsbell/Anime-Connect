import React, { useState, useEffect, useContext } from 'react';
import { Box, Carousel, Button, DataTable, Heading, Avatar, Text } from 'grommet';
import axios from 'axios';
import AnimeEntryModal from './AnimeEntryModal.jsx';
import AnimeCard from './AnimeCard.jsx';
import { UserContext } from './UserContext.jsx';

// table columns
const columns = [
  {
    property: 'main_picture',
    header: null,
    align: 'start',
    primary: true,
    render: (datum) => <AnimeCard src={datum.animeInfo.main_picture} />,
  },
  {
    property: 'title',
    header: <Heading size="small">Title</Heading>,
    render: (datum) => <Text size="xlarge">{`${datum.animeInfo.title}`}</Text>,
  },
  {
    property: 'rank',
    header: <Heading size="small">Rank</Heading>,
    render: (datum) => <Text size="xlarge">{`${datum.animeInfo.rank}`}</Text>,
    align: 'end',
  },
  {
    property: 'their_rating',
    header: <Heading size="small">Their Rating</Heading>,
    render: (datum) => <Text size="xlarge">{`${datum.friendStats.user_rating}`}</Text>,
    align: 'end',
  },
  {
    property: 'my_rating',
    header: <Heading size="small">My Rating</Heading>,
    render: (datum) => <Text size="xlarge">{`${datum.myStats.user_rating}`}</Text>,
    align: 'end',
  },
];

const SuggestedFriends = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const [currentListing, setCurrentListing] = useState(null);

  // get friends once component mounts
  useEffect(() => {
    axios.get('/api/user/suggest').then((res) => {
      res.data.forEach((friend) => {
        friend[1].anime.sort((a, b) => {
          let aScore = a.myStats.user_rating + a.friendStats.user_rating;
          let bScore = b.myStats.user_rating + b.friendStats.user_rating;
          return bScore - aScore;
        });
      });
      debugger;
      setSuggestedFriends(res.data);
    });
  }, []);

  const getDetailedAnimeData = (id) => {
    axios
      .get(`/api/anime/details/${id}`)
      .then((res) => {
        setCurrentListing(res.data);
        setShowModal(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Box align="center" size="width" pad="medium">
      {showModal && currentListing ? (
        <AnimeEntryModal setShowModal={setShowModal} entry={currentListing} />
      ) : null}
      {suggestedFriends.length ? (
        <>
          <Box
            direction="row"
            margin="medium"
            pad="medium"
            animation="fadeIn"
            justify="center"
            align="center"
          >
            <Button
              disabled={currentUser === 0}
              label="Previous User"
              margin="medium"
              onClick={() => {
                if (currentUser > 0) {
                  setCurrentUser(currentUser - 1);
                }
              }}
            />
            <Button href={`https://myanimelist.net/profile/${suggestedFriends[currentUser][0]}`}>
              <Avatar size="large" src={`${suggestedFriends[currentUser][1].userInfo.picture}`} />
            </Button>
            <Heading size="small">{`You and ${suggestedFriends[currentUser][0]} love these anime!`}</Heading>
            <Button
              disabled={currentUser === suggestedFriends.length - 1}
              label="Next User"
              margin="medium"
              onClick={() => {
                if (currentUser < suggestedFriends.length - 1) {
                  setCurrentUser(currentUser + 1);
                }
              }}
            />
          </Box>
          <Box>
            <DataTable
              onClickRow={(e) => {
                getDetailedAnimeData(e.datum.animeInfo.mal_id);
              }}
              border={{
                color: 'border',
                side: 'horizontal',
                size: '1px',
              }}
              step={10}
              onMore={() => null}
              columns={columns}
              data={suggestedFriends[currentUser][1].anime}
            />
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default SuggestedFriends;
