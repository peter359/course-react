import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
    static propTypes = {
        onMemberRemove: PropTypes.func
    };

    handleDelete = () => {
        this.props.onUserRemove(this.props.user.id);
    };

    handleEdit = () => {
        this.props.selectUser(this.props.user);
        // console.log(`Edit ${this.props.user.id}`);
    };

    render() {
        return (
            <div className="row">
                {this.props.user.username}
                <button
                title="Remove user"
                className="btn btn-small btn-danger pull-right"
                onClick={this.handleDelete}
                >
                    Remove<span className="glyphicon glyphicon-remove" />
                </button>
                <button
                title="Edit user"
                className="btn btn-small btn-warning pull-right"
                onClick={this.handleEdit}
                >
                    Edit<span className="glyphicon glyphicon-pencil" />
                </button>
            </div>
        );
    }
}

export default User;