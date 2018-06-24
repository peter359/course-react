import React, { Component } from 'react';
// import { Route, Link, withRouter } from 'react-router-dom';
import User from './user';

class ViewUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            selectedUser: {}
        };
    }

    handlePasswordChange = (e) => {
        this.setState({ newPassword: e.target.value });
    };

    selectUser = (selected) => {
        this.setState({ selectedUser: selected });
        document.getElementById('edit').classList.remove('hidden');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var newPassword = this.state.newPassword.trim();
        var user = {...this.state.selectedUser, password: newPassword};
        if (!newPassword) {
            return;
        }
        this.props.onUserEdit(user);
        document.getElementById('edit').classList.add('hidden');
		this.setState({newPassword: '', selectedUser: {}});
    };

    handleCancel = (e) => {
        document.getElementById('edit').classList.add('hidden');
		this.setState({newPassword: '', selectedUser: {}});
    };

    render() {
        return (
            <div>
                <h1>Users</h1>
                {this.props.users.map(u => <User key={u.id} {...this.props} user={u} selectUser={this.selectUser} />)}
                <div id="edit" className="hidden">
                    <h2>Edit {this.state.selectedUser.usename}</h2>
                    <form className="editUserForm">
                        <div className="form-control">
                            <input
                                type="password"
                                placeholder="new password"
                                value={this.state.newPassword}
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                        <div className="form-control">
                            <button type="button" onClick={this.handleSubmit} disabled={!this.state.newPassword} >Submit</button>
                            <button type="button" onClick={this.handleCancel} >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ViewUsers;