import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';
import Base from './base';
import ViewSprint from './components/sprint/view-sprint'
import CreateTaskForm from './components/tasks/create-task-form'

import { TASK_STATE } from './enums'

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
      }
    };
  }

  render() {
    return (
      <div className="container">
        <ul className="main-menu">
          <li><Link to="/project/sprint">Active sprint</Link></li>
          <li><Link to="/project/sprint/create_task">Create task</Link></li>
        </ul>
        <hr />

        <div>{this.state.children}</div>

        <Route path="/" component={Base} />
        <Route path="/project/sprint" render={props => <ViewSprint {...this.props} sprint={this.state.sprint} />} />
        <Route path="/project/sprint/create_task" render={props => <CreateTaskForm onTaskCreated={this.onTaskCreated} />} />
      </div>
    );
  }

  onTaskCreated = (task) => {
    console.log(task);

    this.setState(prev => {
      return {
        ...prev,
        sprint: {
          ...prev.sprint,
          tasks: [...prev.sprint.tasks, task]
        }
      }
    })
  }
}

export default App;
