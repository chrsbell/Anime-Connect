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
import styled from 'styled-components';

const StyledCard = styled(Card).attrs((props) => {
  console.log(props.animation);
  return { className: props.animation };
})`
  @keyframes grow {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
  @keyframes shrink {
    from {
      transform: scale(1.1);
    }
    to {
      transform: scale(1);
    }
  }
  &.grow {
    animation: grow 200ms linear both;
  }
  &.shrink {
    animation: shrink 200ms linear both;
  }
`;

const AnimeCard = ({ entry }) => {
  // set the animation state using hooks
  const [animation, setAnimation] = useState('none');

  return (
    <StyledCard
      elevation="large"
      onMouseOver={() => {
        setAnimation('grow');
      }}
      onMouseLeave={() => {
        setAnimation('shrink');
      }}
      width="medium"
      animation={animation}
    >
      <Stack anchor="bottom-left">
        <CardBody height="medium">
          <Image fit="cover" src={entry.node.main_picture.large} />
        </CardBody>
        <CardHeader
          pad={{ horizontal: 'small', vertical: 'small' }}
          background="#000000A0"
          width="medium"
          justify="start"
          height={{ min: '100px' }}
        >
          <Box>
            <Text size="small" margin="none">
              {entry.node.title}
            </Text>
          </Box>
        </CardHeader>
      </Stack>
    </StyledCard>
  );
};

export default AnimeCard;
