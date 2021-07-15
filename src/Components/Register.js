import React, {useState} from 'react';
import '../CSS/Register.css';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRepasswordChange = this.onRepasswordChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);

        this.state = {
            usernameValid: true,
            nameValid: true,
            passwordValid: true,
            repasswordValid: true,
        };
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value,
            usernameValid: !!e.target.value
        });
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value,
            nameValid: !!e.target.value
        });
    }
    
    onPasswordChange(e) {
        this.setState({
            password: e.target.value,
            passwordValid: !!e.target.value
        });
    }

    onRepasswordChange(e) {
        this.setState({
            repassword: e.target.value,
            repasswordValid: !!e.target.value
        });
    }

    sendInfo() {
        console.log('Username:');
        console.log(this.state.username);

        console.log('Name:');
        console.log(this.state.name);

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
                <div className='signupform'>
                    <div className="info">
                        <p>Username</p>
                        <input type="text" className="username" id="username" name="username" onInput={this.onUsernameChange} placeholder="Enter your username"/>
                        {!this.state.usernameValid && <p className="alert">Username cannot be blank</p>}
                    </div>

                    <div className="info">
                        <p>Name</p>
                        <input type="text" className="name" id="name" name="name" onInput={this.onNameChange} placeholder="Enter your Name"/>
                        {!this.state.nameValid && <p className="alert">Name cannot be blank</p>}
                    </div>

                    <div>
                        <p className="info">Password</p>
                        <input type="password" className="password" id="password" name="password" onInput={this.onPasswordChange} placeholder="Enter your password" type="password"/>
                        {!this.state.passwordValid && <p className="alert">Password cannot be blank</p>}
                    </div>

                    <div>
                        <p className="info">Retype password</p>
                        <input type="repassword" className="repassword" id="repassword" name="repassword" onInput={this.onRepasswordChange} placeholder="Re enter your password" type="password"/>
                        {!this.state.repasswordValid && <p className="alert">Password cannot be blank</p>}
                    </div>


                    <div>
                        <span>

                        </span>

                        <span className="button">
                            <button className="button" onClick={this.sendInfo} type="submit">Sign Up</button>
                        </span>
                    </div>
                </div>
           </div>
        )
    }
}

export default Login;