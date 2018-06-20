import React, { Component } from 'react';
import SprintTasksSection from '../tasks/sprint-tasks-section'
import { TASK_STATE } from '../../enums';

class ViewSprint extends Component {
    constructor(props) {
        super(props)

        this.state = { sprint: props.sprint };
    }

    render() {
        return (
            <div>
                

                <h1>List sprint tasks - {this.state.sprint.name}</h1>
                <SprintTasksSection {...this.props} tasks={this.openedTasks()} title={'Open'} />
                <SprintTasksSection {...this.props} tasks={this.inProgressTasks()} title={'InProgress'} />
                <SprintTasksSection {...this.props} tasks={this.resolvedTasks()} title={'Resolved'} />
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