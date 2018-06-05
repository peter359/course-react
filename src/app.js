import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import Base from './base';
import ViewSprint from './components/sprint/view-sprint'
import ViewMember from './components/members/view-members'
import RegisterForm from './components/register/register-form';
import { TASK_STATE } from './enums'
import './app.css';

@withRouter
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprint: {
        name: 'our first demo sprint',
        tasks: [
          { id: 1, title: 'Task 1', description: 'a lot of text haha', state: TASK_STATE.Open },
          { id: 2, title: 'Task 2', description: 'a lot of text haha', state: TASK_STATE.InProgress },
          { id: 3, title: 'Task 3', description: 'a lot of text haha', state: TASK_STATE.Resoved },
          { id: 4, title: 'Task 4', description: 'a lot of text haha', state: TASK_STATE.Closed },
          { id: 5, title: 'Task 5', description: 'a lot of text haha', state: TASK_STATE.Reopened },
        ]
      },
      users: [],
      project: 'React'
    };
  }

  onRegisterSubmit = (add, user) => {
    if (add) {
      this.setState(prevState => ({
        users: [
          ...prevState.users,
          user
        ]
      }));
    } else {
      this.setState(prevState => ({
        users: prevState.users.map(u => u.id === user.id ? user : u)
      }));
    }
  }

  render() {
    return (
      <div className="container">
        <ul className="main-menu">
          <li><Link to="/project/sprint">Active sprint</Link></li>
          <li><Link to="/project/members">Project members</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <hr />
        <Route path="/" component={Base} />
        <Route path="/project/sprint" render={props => <ViewSprint {...this.props} sprint={this.state.sprint} />} />
        <Route path="/project/members" render={props => <ViewMember {...this.props} members={this.state.users} project={this.state.project} />} />
        <Route path="/register" render={props => <RegisterForm {...this.props} onRegisterSubmit={this.onRegisterSubmit} />} />
      </div>
    );
  }
}

export default App;
