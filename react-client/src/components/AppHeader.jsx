import React, { useContext } from 'react';
import { AppContext } from './AppContext.jsx';
import { Avatar, Grommet, Header, Heading, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import { Endpoints } from './constants.js';
import { customTheme } from './Themes.jsx';

const AppHeader = ({ history }) => {
  const { appState, dispatch } = useContext(AppContext);
  let src;
  if (!appState.authenticated) {
    // placeholder image
    src = 'https://a.ppy.sh/';
  } else {
    src = appState.userData.picture;
  }
  return (
    <Header background="dark-1" pad="medium" height="xsmall">
      <Box direction="row" gap="medium" justify="start">
        <Heading level="1" size="medium">
          <Anchor
            onClick={() => {
              history.push(Endpoints.browse);
            }}
            label="Anime Connect"
          />
        </Heading>
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
            <Box justify="end" direction="row" gap="large">
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
              {!appState.authenticated ? (
                <Box direction="column" justify="center" align="center">
                  <Anchor
                    onClick={() => {
                      history.push(Endpoints.signup);
                    }}
                    label="Sign Up"
                  />
                </Box>
              ) : null}
              {!appState.authenticated ? (
                <Box direction="column" justify="center" align="center">
                  <Anchor
                    onClick={() => {
                      history.push(Endpoints.login);
                    }}
                    label="Login"
                  />
                </Box>
              ) : null}
              {appState.authenticated ? (
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
