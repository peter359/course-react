import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: props.task
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.task.name}</h1>
                <div>{this.state.task.description}</div>
                <div>{this.state.task.state}</div>
            </div>
        );
    }
}

export default Task;