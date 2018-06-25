import React from 'react';
import Task from './task';
import {Route, Link} from 'react-router-dom';

const TaskPreview = (props) => {
    return (
        <div>
            <Route path={'/task/' + props.task.id} render={props => <Task task={props.task} />} />
            <Link to={'/task/' + props.task.id}>{props.task.name}</Link>
        </div>
    );
};

export default TaskPreview;