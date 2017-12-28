import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import CreateLink from './components/CreateLink';
import LinkList from './components/LinkList';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to='/'>Link list</Link>
          <div>|</div>
          <Link to='/create'>New link</Link>
          <div>|</div>
          <Link to='/login'>Login</Link>
        </div>

        <div>
          <Switch>
            <Route path='/' exact component={LinkList} />
            <Route path='/create' component={CreateLink} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
