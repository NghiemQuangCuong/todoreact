import React, {useState} from 'react';
import '../CSS/Login.css';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;
        this.state = {};
    }

    sendInfo(event) {
        console.log(event)
    }

    render()
    {
        // return jsx here
        return (
            <div className='loginform'>
                <p>Username</p>
                <input type="text" className="username" id="username" name="username" placeholder="Enter your username"/>
                <p>Password</p>
                <input type="password" className="password" id="password" name="password" placeholder="Enter your password" type="password"/>
                <br/>
                <button onClick={this.sendInfo} type="button">Login</button>
            </div>
        )
    }
}

export default Login;