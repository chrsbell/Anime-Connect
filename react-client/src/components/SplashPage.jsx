import React, { useState } from 'react';

import { Box, Diagram, Grommet, Stack, Text, Heading } from 'grommet';
import customTheme from './Themes.jsx';
import { User } from 'grommet-icons';

const connection = (fromTarget, toTarget, { ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color: 'accent-4',
  thickness: 'xsmall',
  round: true,
  type: 'curved',
  ...rest,
});

const UserContainer = ({ id, align }) => {
  console.log(id);
  return (
    <Box align={align || 'center'} alignSelf="center" direction="row" gap="medium" key={id}>
      <User id={id} size="xlarge" color="neutral-3" />
    </Box>
  );
};

const Container = ({ index }) => <UserContainer id={index} align="center" />;

const SplashPage = () => {
  // splash animation
  const [draw, toggleDraw] = useState(true);
  const [fadeAnimation, setFadeAnimation] = useState('fadeIn');

  setTimeout(() => {
    setFadeAnimation('fadeOut');
    toggleDraw(false);
  }, 1400);

  const connections = [];

  if (draw) {
    connections.push(connection('4', '1', { anchor: 'vertical' }));
    connections.push(connection('4', '2', { anchor: 'vertical' }));
    connections.push(connection('4', '3', { anchor: 'vertical' }));
  }

  return (
    <Box align="center">
      <Box
        animation={{
          type: fadeAnimation,
          delay: 0,
          duration: 750,
          size: 'xsmall',
        }}
        pad="large"
      >
        <Stack>
          <Box>
            <Box alignSelf="center" margin={{ bottom: 'large' }}>
              <Container index={1} />
              <Box pad="small" />
              <Box id="4" width="xsmall" margin={{ bottom: 'large', top: 'xlarge' }} />
            </Box>
            <Box direction="row" gap="xlarge">
              {[2, 3].map((id) => (
                <Container key={id} index={id} />
              ))}
            </Box>
          </Box>
          <Diagram connections={connections} />
        </Stack>
      </Box>
      <Box
        fill
        animation={{
          type: fadeAnimation,
          delay: 750,
          duration: 750,
          size: 'xsmall',
        }}
      >
        <Heading level="1" size="large">
          Anime Connect
        </Heading>
      </Box>
    </Box>
  );
};

export default SplashPage;
