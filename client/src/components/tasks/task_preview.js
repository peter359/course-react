import React from 'react';

const TaskPreview = (props) => {
    return (
        <div>{props.task.title}</div>
    );
};

export default TaskPreview;