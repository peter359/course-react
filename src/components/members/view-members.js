import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import Member from './member';
import AddMemberForm from './add-member-form';

@withRouter
class ViewMembers extends Component {

    render() {
        return (
            <div>
                <h1>Members of {this.props.project.name}</h1>
                {this.props.members.map(m => <Member key={m.id} {...this.props} member={m} onMemberRemove={this.props.onMemberRemove}/>)}
                <Link className="btn btn-primary" to="/project/members/add_member">Add Member</Link>

                <Route path="/project/members/add_member" render={props => <AddMemberForm {...this.props} />} />
            </div>
        );
    }
}

export default ViewMembers;