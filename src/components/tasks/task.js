import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = { task: props.task };
    }

    render() {
        return (
            <div>{this.state.task.title}</div>
        );
    }
}

export default Task;