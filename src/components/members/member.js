import React, { Component } from 'react';

class Member extends Component {
    constructor(props) {
        super(props);

        this.state = { member: props.member };
    }

    render() {
        return (
            <div>{this.state.member.firstName} {this.state.member.lastName}</div>
        );
    }
}

export default Member;