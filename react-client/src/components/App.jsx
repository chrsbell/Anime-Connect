import React from 'react';
import axios from 'axios';
import { Grommet } from 'grommet';
import AppHeader from './Header.jsx';
import { Router, Route, Link, withRouter } from 'react-router';
import history from './history';
import { Endpoints } from './constants.js';

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
        <Grommet plain>
          <AppHeader history={history} loginCallback={this.authenticate} />
          <h1>Item List</h1>
        </Grommet>
      </Router>
    );
  }
}

export default App;
