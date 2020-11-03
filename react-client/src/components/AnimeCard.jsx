import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Heading,
  CardBody,
  CardHeader,
  Grid,
  Grommet,
  Text,
  Image,
  Stack,
} from 'grommet';

const AnimeCard = ({ entry }) => {
  // set the animation state using hooks (to do)
  const [effect, setEffect] = useState('zoomIn');
  return (
    <Card elevation="large" width="medium" animation={effect}>
      <Stack anchor="bottom-left">
        <CardBody height="medium">
          <Image fit="cover" src={entry.node.main_picture.large} />
        </CardBody>
        <CardHeader
          pad={{ horizontal: 'small', vertical: 'small' }}
          background="#000000A0"
          width="medium"
          justify="start"
        >
          <Box>
            <Heading level="3" margin="none">
              {entry.node.title}
            </Heading>
          </Box>
        </CardHeader>
      </Stack>
    </Card>
  );
};

export default AnimeCard;
