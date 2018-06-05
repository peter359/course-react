import React from "react";
import newId from './newid'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
export default class RegisterForm extends React.Component {
    static propTypes = {
        onRegisterSubmit: PropTypes.func,
        location: PropTypes.object.isRequired
    };

    state = {
		firstName: '',
		lastName: '',
	};

    handleFirstNameChange = (e) => {
        this.setState({ firstName: e.target.value });
    };

    handleLastNameChange = (e) => {
        this.setState({ lastName: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var firstName = this.state.firstName.trim();
        var lastName = this.state.lastName.trim();
        if (!lastName || !firstName) {
            return;
        }
        // var add = this.props.location.pathname === '/blogposts/add' ? true : false;
		// var id = add ? newId() : this.props.id;
		var add = true;
        var id = newId();
		this.props.onRegisterSubmit(add, {id, firstName, lastName});
		this.setState({lastName: '', firstName: ''});
    };

    render(props) {
        // const { location } = this.props;
        // const btnName = location.pathname === '/blogposts/add' ? "Add" : "Edit";
        const btnName = "Add";
        return (
            <div>
                <h1>Register</h1>
                <form className="registerForm" onSubmit={this.handleSubmit}>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange}
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={this.state.lastName}
                            onChange={this.handleLastNameChange}
                        />
                    </div>
                    <div className="form-control">
                        <input type="submit" disabled={!this.state.lastName || !this.state.firstName} value={btnName} />
                    </div>
                </form>
            </div>
        );
    }
}