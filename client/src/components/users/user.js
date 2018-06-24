import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
    render() {
        return (
            <div className="row">
                {this.props.user.username}
                {/* <button
                title="Remove user"
                className="btn btn-small btn-danger pull-right"
                onClick={this.handleDelete}
                >
                    Remove<span className="glyphicon glyphicon-remove" />
                </button> */}
            </div>
        );
    }
}

export default User;