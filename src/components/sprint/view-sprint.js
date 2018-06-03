import React, { Component } from 'react';
import SprintTasksSection from '../tasks/sprint-tasks-section'
import { TASK_STATE } from '../../enums';
import { Route, Link, withRouter } from 'react-router-dom';
import CreateTaskForm from '../tasks/create-task-form'

class ViewSprint extends Component {
    constructor(props) {
        super(props)

        this.state = { sprint: props.sprint };
    }

    render() {
        return (
            <div>
                <Link to="/project/sprint/create_task">Create task</Link>

                <h1>List sprint tasks - {this.state.sprint.name}</h1>
                <SprintTasksSection {...this.props} tasks={this.openedTasks()} title={'Open'} />
                <SprintTasksSection {...this.props} tasks={this.inProgressTasks()} title={'InProgress'} />
                <SprintTasksSection {...this.props} tasks={this.resolvedTasks()} title={'Resolved'} />

                <Route path="/project/sprint/create_task" render={props => <CreateTaskForm />} />
            </div>
        );
    }

    openedTasks() {
        return this.state.sprint.tasks.filter((t) => t.state === TASK_STATE.Open || t.state === TASK_STATE.Reopened);
    }

    inProgressTasks() {
        return this.state.sprint.tasks.filter((t) => t.state === TASK_STATE.InProgress);
    }

    resolvedTasks() {
        return this.state.sprint.tasks.filter((t) => t.state === TASK_STATE.Resoved || t.state === TASK_STATE.Closed);
    }
}

export default ViewSprint;