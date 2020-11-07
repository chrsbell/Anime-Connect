import React, { useState } from 'react';
import { Text, Stack, Image, Layer, Box, Button, Heading } from 'grommet';
import { Star, Favorite } from 'grommet-icons';

const AnimeEntryModal = ({ entry, setShowModal }) => {
  return (
    <Layer
      animation="slide"
      full
      margin="large"
      onEsc={() => setShowModal(false)}
      onClickOutside={() => setShowModal(false)}
    >
      <Stack anchor="top-left">
        <Box direction="row" pad="small" background="light-3">
          <Box direction="column" pad="small" background="dark-5">
            <Box direction="column">
              <Image fill fit="contain" src={entry.main_picture.large} />
            </Box>
            <Box direction="row" justify="center" pad="small">
              <Star color="#F7BF63" />
              <Text>{`#${entry.rank} highest rated anime of all time`}</Text>
            </Box>
            <Box direction="row" justify="center" pad="small">
              <Favorite color="#E85D74" />
              <Text>{`#${entry.popularity} most popular anime`}</Text>
            </Box>
          </Box>
          <Box direction="column" width={{ max: '50vw' }} pad="large" background="light-2">
            <Box direction="column" pad="small">
              <Heading>{`${entry.title}`}</Heading>
              <Heading>{`${entry.alternative_titles.ja}`}</Heading>
              <Text>{`${entry.synopsis}`}</Text>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Layer>
  );
};

export default AnimeEntryModal;
