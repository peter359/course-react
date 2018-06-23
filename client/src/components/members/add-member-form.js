import React from "react";
import PropTypes from 'prop-types';

export default class AddMemberForm extends React.Component {
    static propTypes = {
        onAddMemberSubmit: PropTypes.func,
        users: PropTypes.array
    };

    state = {
		newMemberId: -1,
	};

    handleAddMemberChange = (e) => {
        this.setState({ newMemberId: parseInt(e.target.value, 10) });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.newMemberId === -1) {
            return;
        }
		this.props.onAddMemberSubmit(this.state.newMemberId);
		this.setState({newMemberId: -1});
    };

    render() {
        const btnName = "Add";
        return (
            <div>
                <h1>Add Member</h1>
                <form className="addMemberForm" onSubmit={this.handleSubmit}>
                    <select
                    className=""
                    value={this.state.newMemberId}
                    onChange={this.handleAddMemberChange}
                    >
                        <option value={-1} key={-1}></option>
                        {this.props.users.map(u => <option value={u.id} key={u.id}>{u.username}</option>)}
                    </select>
                    <input type="submit" value={btnName} />
                </form>
            </div>
        );
    }
}