import React from 'react';

const TaskPreview = (props) => {
    return (
        <div>{props.task.name}</div>
    );
};

export default TaskPreview;