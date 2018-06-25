import React, { Component } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import Base from './base';
import ViewSprint from './components/sprint/view-sprint'
import CreateTaskForm from './components/tasks/create-task-form'
import ViewMember from './components/members/view-members'
import RegisterForm from './components/register/register-form';
import ViewUser from './components/users/view-users';
import Task from './components/tasks/task';
import { TASK_STATE } from './enums'
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprint: {
        name: 'Code base',
        tasks: []
      },
      users: [],
      members: [],
      project: {
        name: 'React',
        id: 1
      }
    };
  }

  loadTasksFromServer = () => {
    axios.get('/api/tasks/project/' + this.state.project.id)
      .then(({data: tasks}) => {
        this.setState(prev => {
          return {
            ...prev,
            sprint: {
              ...prev,
              tasks: tasks
            }
          }

        })
      })
      .catch((err) => {
        console.log(err)
      });
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

  handleUserRemove = (userId) => {
    axios.delete('/api/users/' + userId)
      .then(
        this.loadUsersFromServer()
      )
      .catch((err) => {
        console.error(err);
      });
  };

  handleUserEdit = (user) => {
    axios.put('/api/users/' + user.id, user)
      .then(
        this.loadUsersFromServer()
      )
      .catch((err) => {
        console.error(err);
      });
  };

  onTaskCreated = (task) => {
    axios.post('/api/tasks/project/' + this.state.project.id, task)
      .then(this.loadTasksFromServer)
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount = () => {
    this.loadMembersFromServer();
    this.loadUsersFromServer();
    this.loadTasksFromServer();
  }

  render() {
    return (
      <div className="container">
        <ul className="main-menu">
          <li><Link to="/project/sprint">Active sprint</Link></li>
          <li><Link to="/project/create_task">Create task</Link></li>
          <li><Link to="/project/members">Project members</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
        <hr />

        <Route path="/" component={Base} />
        <Route path="/project/sprint" render={props => <ViewSprint {...this.props} sprint={this.state.sprint} />} />
        <Route path="/project/create_task" render={props => <CreateTaskForm onTaskCreated={this.onTaskCreated} />} />
        <Route path="/project/members" render={props => <ViewMember {...this.props} members={this.state.members} users={this.state.users} project={this.state.project} onAddMemberSubmit={this.onAddMemberSubmit} onMemberRemove={this.handleMemberRemove}/>} />
        <Route path="/register" render={props => <RegisterForm {...this.props} onRegisterSubmit={this.onRegisterSubmit} />} />
        <Route path="/users" render={props => <ViewUser {...this.props} users={this.state.users} onUserRemove={this.handleUserRemove} onUserEdit={this.handleUserEdit} />} />
        <Route path="/task" render={props => <Task task={this.state.sprint.tasks[0]} />} />
      </div>
    );
  }
}

export default App;
