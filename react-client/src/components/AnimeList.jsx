import React, { useContext } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard.jsx';
import { Box, Grid, ResponsiveContext, InfiniteScroll } from 'grommet';

const AnimeList = ({ list }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid columns={size !== 'small' ? 'small' : '100%'} gap="medium">
      <InfiniteScroll items={list}>
        {(item) => <AnimeCard key={item.node.id} entry={item} />}
      </InfiniteScroll>
    </Grid>
  );
};

export default AnimeList;
