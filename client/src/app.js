import React, { Component } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import Base from './base';
import ViewSprint from './components/sprint/view-sprint'
import CreateTaskForm from './components/tasks/create-task-form'
import ViewMember from './components/members/view-members'
import RegisterForm from './components/register/register-form';
import { TASK_STATE } from './enums'
import './app.css';

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
      members: [],
      project: {
        name: 'React',
        id: 1
      }
    };
  }

  loadUsersFromServer = () =>
    axios.get('/api/users/')
      .then(({ data: users }) => {
        // console.log("GET" , members);
        this.setState({
          users: users
        });
      })
      .catch((err) => {
        console.error(err);
      });

  loadMembersFromServer = () =>
    axios.get('/api/projects/' + this.state.project.id + '/members')
      .then(({ data: members }) => {
        // console.log("GET" , members);
        this.setState({
          members: members
        });
      })
      .catch((err) => {
        console.error(err);
      });

  onRegisterSubmit = (add, user) => {
    if (add) {
      // this.setState(prevState => ({
      //   users: [
      //     ...prevState.users,
      //     user
      //   ]
      // }));
      axios.post('/api/users/', user)
        .then(
          this.loadUsersFromServer()
        )
        .catch((err) => {
            console.error(err);
        });
    } else {
      // this.setState(prevState => ({
      //   users: prevState.users.map(u => u.id === user.id ? user : u)
      // }));
    }
  }

  onAddMemberSubmit = (userId) => {
    if (typeof(this.state.members.find(u => u.id === userId)) === 'undefined') {
      // this.setState(prevState => ({
      //   members: [
      //     ...prevState.members,
      //     user
      //   ]
      // }));
      // this.props.history.push('/project/members');
      axios.post('/api/projects/' + this.state.project.id + '/members/' + userId)
      .then(
        this.loadMembersFromServer()
      )
      .catch((err) => {
          console.error(err);
      });
    }
  }

  handleMemberRemove = (memberId) => {
    // this.setState(prevState => ({
    //   members: prevState.members.filter(m => m.id !== memberId)
    // }))
    axios.delete('/api/projects/' + this.state.project.id + '/members/' + memberId)
      .then(
        this.loadMembersFromServer()
      )
      .catch((err) => {
        console.error(err);
      });
  };

  onTaskCreated = (task) => {
    task.id = this.state.sprint.tasks.length + 1;

    this.setState(prev => ({
        ...prev,
        sprint: {
          ...prev.sprint,
          tasks: [...prev.sprint.tasks, task]
        }
    }));

    console.log(this.state);
  }

  componentDidMount = () => {
    this.loadMembersFromServer();
    this.loadUsersFromServer();
  }

  render() {
    return (
      <div className="container">
        <ul className="main-menu">
          <li><Link to="/project/sprint">Active sprint</Link></li>
          <li><Link to="/project/create_task">Create task</Link></li>
          <li><Link to="/project/members">Project members</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <hr />

        <Route path="/" component={Base} />
        <Route path="/project/sprint" render={props => <ViewSprint {...this.props} sprint={this.state.sprint} />} />
        <Route path="/project/create_task" render={props => <CreateTaskForm onTaskCreated={this.onTaskCreated} />} />
        <Route path="/project/members" render={props => <ViewMember {...this.props} members={this.state.members} users={this.state.users} project={this.state.project} onAddMemberSubmit={this.onAddMemberSubmit} onMemberRemove={this.handleMemberRemove}/>} />
        <Route path="/register" render={props => <RegisterForm {...this.props} onRegisterSubmit={this.onRegisterSubmit} />} />
      </div>
    );
  }
}

export default App;
