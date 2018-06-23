import React from "react";
import newId from './newid'
import PropTypes from 'prop-types';

export default class RegisterForm extends React.Component {
    static propTypes = {
        onRegisterSubmit: PropTypes.func
    };

    state = {
		username: '',
		email: '',
		password: '',
	};

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    handlEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var username = this.state.username.trim();
        var email = this.state.email.trim();
        var password = this.state.password.trim();
        if (!email || !username || !password) {
            return;
        }
        // var add = this.props.location.pathname === '/blogposts/add' ? true : false;
		// var id = add ? newId() : this.props.id;
		var add = true;
        var id = newId();
		this.props.onRegisterSubmit(add, {id, username, email, password});
		this.setState({email: '', username: '', password: ''});
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
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handlEmailChange}
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handlPasswordChange}
                        />
                    </div>
                    <div className="form-control">
                        <input type="submit" disabled={!this.state.email || !this.state.username || !this.state.password} value={btnName} />
                    </div>
                </form>
            </div>
        );
    }
}