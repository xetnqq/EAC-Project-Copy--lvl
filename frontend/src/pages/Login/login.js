import React, { Component } from 'react';
import './login.css';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
            rememberMe: false,
            errorMessage: ''
        };
    }

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const val = type === 'checkbox' ? checked : value;
        this.setState({ [name]: val });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { usernameOrEmail, password } = this.state;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameOrEmail, password })
        });
        const data = await response.json();
        console.log(data);

        if (data.message === "Login successful") {
            localStorage.setItem('loggedInUsername', data.user.username);
            window.location.href = '/home';
        } else {
            this.setState({ errorMessage: data.error });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

render() {
    return (
    <>
    <div className="container65">
        <div className="header-bar"></div>
            <form onSubmit={this.handleSubmit}>
                <div className="navigation">
                <div  className='login-options'>
                    <div className="login-text">Log In</div>
                    <div className="login-underline"></div>
                </div>
                    <a href='/sign-up' className='dec'><div className="signup-text">Sign Up</div></a>
                </div>
                <div className="form-wrapper">
                    <div className="input-group">
                        <div className="input-fields">
                            <input className='input-name' type="text" name="usernameOrEmail" value={this.state.usernameOrEmail} onChange={this.handleChange} placeholder="Username or Email" aria-label="Username or Email"/>
                        </div>
                    </div>
                     <div className="password-group">
                        <input className='input-password' type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" aria-label="Password"/>
                    </div>
                    <div className="options-container">
                        <label className="remember-me">
                            <input type="checkbox" name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} className="remember-checkbox" />
                            <span className="remember-label">Remember me</span>
                        </label>
                            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    </div>
                        <button type="submit" className="btn-login">Log in</button>
                        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
                    </div>
                </form>
            </div>
    </>
        );
    }
}

export default Login;
