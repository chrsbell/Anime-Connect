import React, { useState, useEffect, useReducer } from 'react';
import _ from 'underscore';
import axios from 'axios';
import { Grommet, Box, grommet } from 'grommet';
import { customTheme } from './Themes.jsx';
import { Router, Route } from 'react-router';
import history from './history';
import { Endpoints } from './constants.js';
import { AppContext } from './AppContext.jsx';
import AppHeader from './AppHeader.jsx';
import AnimeList from './AnimeList.jsx';
import SignUpForm from './SignUpForm.jsx';
import LoginForm from './LoginForm.jsx';
import SplashPage from './SplashPage.jsx';
import SuggestedFriendsList from './SuggestedFriendsList.jsx';

const initialUserState = {
  authenticated: false, // whether user is userState.authenticated using MAL
  userData: {}, // the user's information
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'authenticate':
      return {
        ...state,
        authenticated: action.authenticated,
      };
    case 'userData':
      return {
        ...state,
        userData: action.userData,
      };
  }
};

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialUserState);
  // whether app has either userState.authenticated or finished displaying splash animation
  const [isLoading, setLoading] = useState(true);
  // current list of anime
  const [animeList, setAnimeList] = useState([]);

  // component mount
  useEffect(() => {
    // avoid changing the current endpoint when the app is mounted
    const endpoint = window.location.pathname.replace(/\//g, '');
    if (endpoint in Endpoints) {
      // go straight to content
      history.push(window.location.pathname);
    } else {
      // go to home
      history.push(Endpoints.home);
    }

    // get the user's authentication status
    const source = axios.CancelToken.source();
    axios
      .get('/api/oauth/status', { cancelToken: source.token })
      .then((res) => {
        // continue to initialize the app
        const { authenticated } = res.data;
        debugger;
        if (authenticated) {
          dispatch({ type: 'authenticate', authenticated });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => source.cancel('Cancelled /api/oauth/status request during component unmount.');
  }, []);

  // after successful authentication, get the user's data
  useEffect(() => {
    // gets the userState.authenticated user's basic info
    const getUserData = () => {
      const source = axios.CancelToken.source();
      axios
        .get('/api/user/me', { cancelToken: source.token })
        .then((res) => {
          dispatch({ type: 'userData', userData: res.data });
        })
        .catch((err) => {
          console.error(err);
        });
      return () => source.cancel('Cancelled /api/user/me request during component unmount.');
    };

    // gets a list of top rated anime
    const getTopAnime = () => {
      const source = axios.CancelToken.source();
      axios
        .get('/api/anime/ranking', { cancelToken: source.token })
        .then((res) => {
          if (res.data.length) {
            debugger;
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

    if (appState.authenticated === true) {
      // get the user's information and navigate to browse
      setLoading(false);
      history.push(Endpoints.browse);
      const userCancel = getUserData();
      const animeListCancel = getTopAnime();
      return () => {
        userCancel();
        animeListCancel();
      };
    }
  }, [appState.authenticated]);

  // starts the MAL authentication process
  const authenticate = () => {
    const source = axios.CancelToken.source();
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
            <AppContext.Provider value={{ appState, dispatch }}>
              <AppHeader history={history} />
              <Route path={Endpoints.browse}>
                {appState.authenticated ? <AnimeList animeList={animeList} /> : null}
              </Route>
              <Route path={Endpoints.connect}>
                {appState.authenticated ? <SuggestedFriendsList /> : null}
              </Route>
              <Route path={Endpoints.login}>
                <LoginForm history={history} authenticate={authenticate} />
              </Route>
              <Route path={Endpoints.signup}>
                <SignUpForm history={history} authenticate={authenticate} />
              </Route>
            </AppContext.Provider>
          </Box>
        ) : null}
      </Grommet>
    </Router>
  );
};

export default App;
