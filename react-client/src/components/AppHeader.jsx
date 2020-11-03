import React from 'react';
import { Grommet, Avatar, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import { Endpoints } from './constants.js';

const AppHeader = ({ history, userData, isLoading }) => {
  const isLoggedIn = Boolean(userData.id);
  let src;
  if (isLoading) {
    src = 'https://i.imgur.com/yIqQjiD.gif';
  } else if (isLoggedIn) {
    src = userData.picture;
  } else {
    src = 'https://a.ppy.sh/';
  }
  return (
    <Header background="light-4" pad="medium" height="xsmall">
      <Box direction="row" gap="medium" justify="start">
        <Anchor
          label="Anime Connect"
          onClick={() => {
            history.push(Endpoints.home);
          }}
        />
      </Box>
      <ResponsiveContext.Consumer>
        {(size) =>
          size === 'small' ? (
            <Box justify="end">
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">Browse</Box>,
                    onClick: () => {
                      history.push(Endpoints.browse);
                    },
                  },
                  {
                    label: <Box pad="small">Connect</Box>,
                    onClick: () => {
                      history.push(Endpoints.connect);
                    },
                  },
                  {
                    label: <Box pad="small">Sign Up</Box>,
                    onClick: () => {
                      history.push(Endpoints.signup);
                    },
                  },
                  {
                    label: <Box pad="small">Login</Box>,
                    onClick: () => {
                      history.push(Endpoints.login);
                    },
                  },
                ]}
              />
            </Box>
          ) : (
            <Box justify="end" direction="row" gap="medium">
              <Box direction="column" justify="center" align="center">
                <Anchor
                  onClick={() => {
                    history.push(Endpoints.browse);
                  }}
                  label="Browse"
                />
              </Box>
              <Box direction="column" justify="center" align="center">
                <Anchor
                  onClick={() => {
                    history.push(Endpoints.connect);
                  }}
                  label="Connect"
                />
              </Box>
              {!isLoggedIn ? (
                <Box direction="column" justify="center" align="center">
                  <Anchor
                    onClick={() => {
                      history.push(Endpoints.signup);
                    }}
                    label="Sign Up"
                  />
                </Box>
              ) : null}
              {!isLoggedIn ? (
                <Box direction="column" justify="center" align="center">
                  <Anchor
                    onClick={() => {
                      history.push(Endpoints.login);
                    }}
                    label="Login"
                  />
                </Box>
              ) : null}
              {isLoggedIn ? (
                <Box direction="column" justify="center" align="center">
                  <Anchor
                    onClick={() => {
                      history.push(Endpoints.signout);
                    }}
                    label="Sign Out"
                  />
                </Box>
              ) : null}
              <Box direction="column" justify="center" align="center">
                <Avatar size="medium" src={src} />
              </Box>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export default AppHeader;
