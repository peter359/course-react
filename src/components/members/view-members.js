import React, { Component } from 'react';
import Member from './member';

class ViewMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: props.members,
            project: props.project
        }
    }

    render() {
        return (
            <div>
                <h1>Members of {this.state.project}</h1>
                {this.state.members.map(m => <Member key={m.id} {...this.props} member={m} />)}
            </div>
        );
    }
}

export default ViewMembers;