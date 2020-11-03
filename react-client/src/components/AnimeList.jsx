import React, { useContext } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard.jsx';
import { Box, Grid, ResponsiveContext, InfiniteScroll } from 'grommet';

const AnimeList = ({ list }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box pad="large">
      <Grid columns={size !== 'small' ? 'small' : '100%'} gap="medium">
        <InfiniteScroll items={list}>
          {(item) => <AnimeCard key={item.node.id} entry={item} />}
        </InfiniteScroll>
      </Grid>
    </Box>
  );
};

export default AnimeList;
