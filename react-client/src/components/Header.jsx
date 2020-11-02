import React from 'react';
import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { Endpoints } from './constants.js';

class AppHeader extends React.Component {
  constructor({ history, loginCallback }) {
    super();
    this.loginCallback = loginCallback;
    this.history = history;
  }

  render() {
    return (
      <Grommet theme={grommet}>
        <Header background="light-4" pad="medium" height="xsmall">
          <Anchor
            icon={<GrommetIcon color="brand" />}
            label="Grommet Tools"
            onClick={() => {
              this.history.push(Endpoints.home);
            }}
          />
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
                          this.history.push(Endpoints.browse);
                        },
                      },
                      {
                        label: <Box pad="small">Connect</Box>,
                        onClick: () => {
                          this.history.push(Endpoints.connect);
                        },
                      },
                      {
                        label: <Box pad="small">Login</Box>,
                        onClick: () => {
                          this.history.push(Endpoints.login);
                          this.loginCallback();
                        },
                      },
                    ]}
                  />
                </Box>
              ) : (
                <Box justify="end" direction="row" gap="medium">
                  <Anchor
                    onClick={() => {
                      this.history.push(Endpoints.browse);
                    }}
                    label="Browse"
                  />
                  <Anchor
                    onClick={() => {
                      this.history.push(Endpoints.connect);
                    }}
                    label="Connect"
                  />
                  <Anchor
                    onClick={() => {
                      this.history.push(Endpoints.login);
                      debugger;
                      this.loginCallback();
                    }}
                    label="Login"
                  />
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
        </Header>
      </Grommet>
    );
  }
}

export default AppHeader;
