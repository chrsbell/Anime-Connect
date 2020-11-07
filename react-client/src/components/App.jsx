import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Grommet, Box, grommet } from 'grommet';
import { customTheme } from './Themes.jsx';
import { Router, Route } from 'react-router';
import history from './history';
import { Endpoints } from './constants.js';
import AppHeader from './AppHeader.jsx';
import AnimeList from './AnimeList.jsx';
import SignUpForm from './SignUpForm.jsx';
import LoginForm from './LoginForm.jsx';
import SplashPage from './SplashPage.jsx';
import SuggestedFriendsList from './SuggestedFriendsList.jsx';
import _ from 'underscore';

const App = () => {
  // whether user is authenticated using MAL
  let [authenticated, setAuthenticated] = useState(false);
  // the user's information
  let [userData, setUserData] = useState({});
  // whether app has either authenticated or finished displaying splash animation
  let [isLoading, setLoading] = useState(true);
  // current list of anime
  let [animeList, setAnimeList] = useState([]);

  let splashPageRef = useRef(null);

  // component mount
  useEffect(() => {
    // avoid changing the current endpoint when the app is mounted
    setTimeout(() => {
      const endpoint = window.location.pathname.replace(/\//g, '');
      if (endpoint in Endpoints) {
        // go straight to content
        history.push(window.location.pathname);
      } else {
        // go to home
        history.push(Endpoints.home);
      }
      return getAuthenticationStatus();
    }, 3000);
  }, []);

  // gets the authenticated user's basic info
  const getUserData = () => {
    let source = axios.CancelToken.source();
    axios
      .get('/api/user/me', { cancelToken: source.token })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => source.cancel('Cancelled /api/user/me request during component unmount.');
  };

  // checks whether user is authenticated
  const getAuthenticationStatus = () => {
    let source = axios.CancelToken.source();
    axios.get('/api/oauth/status', { cancelToken: source.token }).then((res) => {
      // continue to initialize the app
      setAuthenticated(res.data);
    });
    return () => source.cancel('Cancelled /api/oauth/status request during component unmount.');
  };

  // gets a list of top rated anime
  const getTopAnime = () => {
    let source = axios.CancelToken.source();
    axios
      .get('/api/anime/ranking', { cancelToken: source.token })
      .then((res) => {
        if (res.data.length) {
          setAnimeList(
            _.map(res.data, (info) => {
              return _.extend({}, info.node, info.ranking);
            })
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return () => source.cancel('Cancelled /api/anime/ranking request during component unmount.');
  };

  // after successful authentication, get the user's data
  useEffect(() => {
    if (authenticated) {
      // get the user's information and navigate to browse
      setLoading(false);
      history.push(Endpoints.browse);
      const userCancel = getUserData();
      const animeListCancel = getTopAnime();
      return () => {
        userCancel();
        animeList();
      };
    }
  }, [authenticated]);

  // starts the MAL authentication process
  const authenticate = () => {
    let source = axios.CancelToken.source();
    axios
      .get('/api/oauth/authenticate')
      .then((res) => {
        const { redirectURL } = res.data;
        // redirect to MAL OAuth if url was received
        if (redirectURL) {
          window.location.href = redirectURL;
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return () =>
      source.cancel('Cancelled /api/oauth/authenticate request during component unmount.');
  };

  console.log('Re-rendered the App!');
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
          <Box fill>
            <AppHeader history={history} userData={userData} isLoading={isLoading} />
            <Route path={Endpoints.browse}>
              {authenticated ? <AnimeList animeList={animeList} /> : null}
            </Route>
            <Route path={Endpoints.connect}>
              {authenticated ? <SuggestedFriendsList me={userData} /> : null}
            </Route>
            <Route path={Endpoints.login}>
              <LoginForm history={history} authenticate={authenticate} />
            </Route>
            <Route path={Endpoints.signup}>
              <SignUpForm history={history} authenticate={authenticate} />
            </Route>
          </Box>
        ) : null}
      </Grommet>
    </Router>
  );
};

export default App;
