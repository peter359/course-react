import React, { Component } from 'react';
import Task from './task';

class SprintTasksSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: props.tasks,
            title: props.title
        }
    }

    render() {
        return (
            <div>
                <h3>{this.state.title}</h3>
                {this.state.tasks.map(t => <Task key={t.id} {...this.props} task={t} />)}
            </div>
        );
    }
}

export default SprintTasksSection;