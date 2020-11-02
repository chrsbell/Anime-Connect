import React from 'react';
import axios from 'axios';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { Router, Route } from 'react-router';
import history from './history';
import { Endpoints } from './constants.js';
import AppHeader from './AppHeader.jsx';
import SignUpForm from './SignUpForm.jsx';
import LoginForm from './LoginForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    // avoid changing the current endpoint when the app is mounted
    const endpoint = window.location.pathname.replace(/\//g, '');
    if (endpoint in Endpoints) {
      history.push(window.location.pathname);
    } else {
      history.push(Endpoints.browse);
    }
  }

  // start the MAL authentication process
  // login details -> authenticate
  authenticate() {
    axios.get('/oauth').then((res) => {
      const { redirectURL } = res.data;
      // redirect to MAL OAuth if url was received
      if (redirectURL) {
        window.location.href = redirectURL;
      }
    });
  }

  render() {
    return (
      <Router history={history}>
        <Grommet full theme={grommet}>
          <AppHeader history={history} />
          <Route path={Endpoints.browse}></Route>
          <Route path={Endpoints.login}>
            <LoginForm history={history} authenticate={this.authenticate} />
          </Route>
          <Route path={Endpoints.signup}>
            <SignUpForm history={history} authenticate={this.authenticate} />
          </Route>
        </Grommet>
      </Router>
    );
  }
}

export default App;
