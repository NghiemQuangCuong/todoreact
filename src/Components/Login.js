import React, {useState} from 'react';
import '../CSS/Login.css';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);

        this.state = {
            usernameValid: true,
            passwordValid: true,
        };
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value,
            usernameValid: !!e.target.value
        });
    }
    
    onPasswordChange(e) {
        this.setState({
            password: e.target.value,
            passwordValid: !!e.target.value
        });
    }

    sendInfo() {
        console.log('Username:');
        console.log(this.state.username);
        console.log('Password');
        console.log(this.state.password);

        // const usernameValid = !!this.state.username;
        // const passwordValid = !!this.state.password;
        // // Update the messages
        // this.setState({usernameValid, passwordValid});

        // if (usernameValid && passwordValid) {
        //     // If the username & password are both valid, submit the form...
        // }
    }

    render()
    {
        // return jsx here
        return (
            <div className="container">
                <div className='loginform'>
                    <div className="header">
                        <h1>Welcome, Travellers!</h1>
                    </div>
                    
                    <div>
                        <p className="info">Username</p>
                        <input type="text" className="username" id="username" name="username" onInput={this.onUsernameChange} placeholder="Enter your username"/>
                    {!this.state.usernameValid && <p className="alert">Username cannot be blank!!!</p>}
                    </div>
                    
                    <div>
                        <p className="info">Password</p>
                        <input type="password" className="password" id="password" name="password" onInput={this.onPasswordChange} placeholder="Enter your password" type="password"/>
                        {!this.state.passwordValid && <p className="alert">Password cannot be blank!!!</p>}
                    </div>

                    <div>
                        <span>Don't have an account? 
                            Create <a className="create" href="">here!</a></span>
                        <span className="button">
                            <button className="buttonLogin" onClick={this.sendInfo} type="submit">Login</button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;