import React from 'react';
import { TASK_STATE } from '../../enums'

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onTaskCreated: props.onTaskCreated,
            state: TASK_STATE.Open
        }
    }

    render() {
        return (
            <div>
                <input type="text" id="name" name="name" placeholder="Name" onChange={this.onNameTextChange} />
                <div>
                    <textarea rows="4" cols="50" placeholder="Description..." onChange={this.onDescriptionTextChange} />
                </div>
                <div>
                    <select onChange={this.onStatusChange}>
                        <option value={TASK_STATE.Open}>Open</option>
                        <option value={TASK_STATE.InProgress}>InProgress</option>
                        <option value={TASK_STATE.Resolved}>Resolved</option>
                        <option value={TASK_STATE.Closed}>Closed</option>
                        <option value={TASK_STATE.Reopened}>Reopened</option>
                    </select>
                </div>
                <button className="btn btn-danger" onClick={this.onCreatebuttonClick}>Create</button>
            </div>
        );
    }

    onCreatebuttonClick = () => {
        // validation
        this.state.onTaskCreated({
            name: this.state.name,
            description: this.state.description,
            state: this.state.state
        });
    }

    onNameTextChange = (e) => {
        e.persist();
        this.setState(prev => {
            return {
                ...prev,
                name: e.target.value
            };
        });
    }

    onDescriptionTextChange = (e) => {
        e.persist();
        this.setState(prev => {
            return {
                ...prev,
                description: e.target.value
            };
        });
    }

    onStatusChange = (e) => {
        e.persist();
        
        let state = parseInt(e.target.value);

        this.setState(prev => {
            return {
                ...prev,
                state: state
            }
        })
    }
}

export default CreateTaskForm;