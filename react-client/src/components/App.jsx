import React, { useState, useEffect } from 'react';
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
import SuggestedFriendsList from './SuggestedFriendsList.jsx';

const App = () => {
  let [authenticated, setAuthenticated] = useState(false);
  let [userData, setUserData] = useState({});
  let [isLoading, setLoading] = useState(true);

  // component mount
  useEffect(() => {
    // avoid changing the current endpoint when the app is mounted
    const endpoint = window.location.pathname.replace(/\//g, '');
    if (endpoint in Endpoints) {
      // go straight to content
      history.push(window.location.pathname);
      // return async cancellation function
      return getAuthenticationStatus();
    } else {
      // show the animation first
      history.push(Endpoints.home);
      const animationTimer = setTimeout(() => {
        getAuthenticationStatus();
      }, 3000);
      return () => clearTimeout(animationTimer);
    }
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

  // after authentication, get the user's data
  useEffect(() => {
    let userCancel = null;
    let animeCancel = null;
    if (authenticated) {
      userCancel = getUserData();
      history.push(Endpoints.browse);
      return () => {
        userCancel();
      };
    } else {
      // couldn't authenticate, so prompt user to log in/sign up
      history.push(Endpoints.login);
      setLoading(false);
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
          console.log(redirectURL);
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
      <Grommet background={{ dark: true }} full theme={customTheme}>
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
            <Route path={Endpoints.browse}>{authenticated ? <AnimeList /> : null}</Route>
            <Route path={Endpoints.connect}>
              {authenticated ? <SuggestedFriendsList me={userData} /> : null}
            </Route>
            <Route path={Endpoints.login}>
              <LoginForm history={history} authenticate={authenticate} />
            </Route>
            <Route path={Endpoints.signup}>
              <SignUpForm history={history} authenticate={authenticate} />
            </Route>
          </>
        ) : null}
      </Grommet>
    </Router>
  );
};

export default App;
