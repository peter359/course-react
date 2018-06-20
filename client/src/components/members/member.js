import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Member extends Component {
    static propTypes = {
        onMemberRemove: PropTypes.func
    };

    handleDelete = () => {
        this.props.onMemberRemove(this.props.member.id);
    };

    render() {
        return (
            <div className="row">
                {this.props.member.firstName} {this.props.member.lastName}
                <button
                title="Remove member"
                className="btn btn-small btn-danger pull-right"
                onClick={this.handleDelete}
                >
                    <span className="glyphicon glyphicon-remove" />
                </button>
            </div>
        );
    }
}

export default Member;