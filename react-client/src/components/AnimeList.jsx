import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard.jsx';
import { Box, Text, Heading, Image, Grid, ResponsiveContext, DataTable } from 'grommet';
import styled from 'styled-components';
import _ from 'underscore';

const AnimeList = () => {
  const size = useContext(ResponsiveContext);
  let [animeList, setAnimeList] = useState([]);

  // component mount
  useEffect(() => {
    return getTopAnime();
  }, []);

  // gets a list of top rated anime
  const getTopAnime = () => {
    let source = axios.CancelToken.source();
    axios
      .get('/api/anime/ranking', { cancelToken: source.token })
      .then((res) => {
        if (res.data.length) {
          setAnimeList(
            _.map(res.data, (info) => {
              return _.extend({}, info.node, info.ranking);
            })
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return () => source.cancel('Cancelled /api/anime/ranking request during component unmount.');
  };

  // table columns
  const columns = [
    {
      property: 'main_picture',
      header: null,
      align: 'start',
      primary: true,
      render: (datum) => <AnimeCard entry={datum} />,
    },
    {
      property: 'title',
      header: <Heading size="medium">Title</Heading>,
    },
    {
      property: 'rank',
      header: <Heading size="medium">Rank</Heading>,
      align: 'end',
    },
  ];

  return (
    <Box align="center" pad="medium">
      <DataTable
        onClickRow={() => null}
        border={{
          color: 'border',
          side: 'horizontal',
          size: '1px',
        }}
        step={10}
        columns={columns}
        data={animeList}
      />
    </Box>
  );
};

export default AnimeList;
