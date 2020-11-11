import React from 'react';
import axios from 'axios';
import { Grommet, Box } from 'grommet';
import { customTheme } from './Themes.jsx';
import { Router, Route } from 'react-router';
import history from './history';
import { Endpoints } from './constants.js';
import AppHeader from './AppHeader.jsx';
import AnimeList from './AnimeList.jsx';
import SignUpForm from './SignUpForm.jsx';
import LoginForm from './LoginForm.jsx';
import SplashPage from './SplashPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userData: {},
      animeList: [],
      isLoading: true,
    };
    this.authenticate = this.authenticate.bind(this);
    this.getAuthenticationStatus = this.getAuthenticationStatus.bind(this);
    this.animeList = React.createRef();
  }

  componentDidMount() {
    // avoid changing the current endpoint when the app is mounted
    const endpoint = window.location.pathname.replace(/\//g, '');
    if (endpoint in Endpoints) {
      // go straight to content
      history.push(window.location.pathname);
      this.getAuthenticationStatus();
    } else {
      // show the animation first
      history.push(Endpoints.home);
      setTimeout(() => {
        this.getAuthenticationStatus();
      }, 3000);
    }
  }

  // get the authenticated uesr's basic info
  getUserData() {
    axios.get('/api/user/me').then((res) => {
      this.setState({
        userData: res.data,
      });
    });
  }

  // get a list of top rated anime
  getTopAnime() {
    axios.get('/api/anime/ranking').then((res) => {
      if (res.data.length) {
        history.push(Endpoints.browse);
        this.setState({
          animeList: res.data,
          isLoading: false,
        });
      }
    });
  }

  // check whether user is authenticated
  getAuthenticationStatus() {
    axios.get('/api/oauth/status').then((res) => {
      const { authenticated } = res.data;
      // continue to initialize the app
      if (authenticated) {
        this.getUserData();
        this.getTopAnime();
      }
      this.setState(
        {
          authenticated,
        },
        () => {
          if (!authenticated) {
            // couldn't authenticate, so prompt user to log in/sign up
            history.push(Endpoints.login);
            this.setState({
              isLoading: false,
            });
          }
        }
      );
    });
  }

  // start the MAL authentication process
  // login details -> authenticate
  authenticate() {
    axios.get('/api/oauth/authenticate').then((res) => {
      const { redirectURL } = res.data;
      // redirect to MAL OAuth if url was received
      if (redirectURL) {
        console.log(redirectURL);
        window.location.href = redirectURL;
      }
    });
  }

  render() {
    const { authenticated, animeList, userData, isLoading } = this.state;
    console.log(isLoading);
    return (
      <Router history={history}>
        <Grommet full theme={customTheme}>
          <Route path={Endpoints.home}>
            {isLoading ? (
              <Box justify="center" align="center">
                <SplashPage />
              </Box>
            ) : null}
          </Route>
          {!isLoading ? (
            <>
              <AppHeader history={history} userData={userData} isLoading={isLoading} />
              <Route path={Endpoints.browse}>
                {authenticated ? <AnimeList list={animeList} /> : null}
              </Route>
              <Route path={Endpoints.login}>
                <LoginForm history={history} authenticate={this.authenticate} />
              </Route>
              <Route path={Endpoints.signup}>
                <SignUpForm history={history} authenticate={this.authenticate} />
              </Route>
            </>
          ) : null}
        </Grommet>
      </Router>
    );
  }
}

export default App;
