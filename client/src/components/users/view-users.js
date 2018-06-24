import React, { Component } from 'react';
// import { Route, Link, withRouter } from 'react-router-dom';
import User from './user';

class ViewUsers extends Component {

    render() {
        return (
            <div>
                <h1>Users</h1>
                {this.props.users.map(u => <User key={u.id} {...this.props} user={u} />)}
            </div>
        );
    }
}

export default ViewUsers;