import React, { useState } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard.jsx';
import AnimeEntryModal from './AnimeEntryModal.jsx';
import { Box, Text, Heading, Image, Grid, ResponsiveContext, DataTable } from 'grommet';
import styled from 'styled-components';

const AnimeList = ({ animeList }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);

  // table columns
  const columns = [
    {
      property: 'main_picture',
      header: null,
      align: 'start',
      primary: true,
      render: (datum) => <AnimeCard src={datum.main_picture.medium} />,
    },
    {
      property: 'title',
      header: <Heading size="small">Title</Heading>,
    },
    {
      property: 'rank',
      header: <Heading size="small">Rank</Heading>,
      align: 'end',
    },
    {
      property: 'year',
      header: <Heading size="small">Year</Heading>,
      render: (datum) => <Text size="xlarge">{datum.start_season.year}</Text>,
      align: 'end',
    },
    {
      property: 'season',
      header: <Heading size="small">Season</Heading>,
      render: (datum) => <Text size="xlarge">{datum.start_season.season}</Text>,
      align: 'end',
    },
    {
      property: 'genres',
      header: <Heading size="small">Genres</Heading>,
      render: (datum) => datum.genres.map((genre) => <Text size="xlarge">{genre.name}</Text>),
      align: 'end',
    },
  ];

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
    <Box align="center" animation={['fadeIn', 'slideUp']} pad="medium">
      {showModal && currentListing ? (
        <AnimeEntryModal setShowModal={setShowModal} entry={currentListing} />
      ) : null}
      <DataTable
        onClickRow={(e) => {
          getDetailedAnimeData(e.datum.id);
        }}
        border={{
          color: 'border',
          side: 'horizontal',
          size: '1px',
        }}
        step={50}
        onMore={() => null}
        columns={columns}
        data={animeList}
      />
    </Box>
  );
};

export default AnimeList;
