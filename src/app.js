import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link , withRouter} from 'react-router-dom';
import Base from './base';
import ViewSprint from './components/sprint/view-sprint'

@withRouter
class App extends Component {
  state = {
    blogposts: [],
    filter: 'all'
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div className="container">
        <ul className="main-menu">
          <li><Link to="/project/sprint">Active sprint</Link></li>
        </ul>
        <hr />
        <Route path="/" component={Base} />
        <Route path="/project/sprint" render={ props => <ViewSprint />} />
      </div>
    );
  }
}

export default App;
