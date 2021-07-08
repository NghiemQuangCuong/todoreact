import React from 'react';
import '../CSS/Register.css';

class Register extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render()
    {
        // return jsx here
        return (
            <div className='signupform'>
                <p>Username</p>
                <input type="text" className="username" id="username" name="username" placeholder="Enter your username"/>
                <p>Name</p>
                <input type="text" className="name" id="name" name="name" placeholder="Enter your Name"/>
                <p>Password</p>
                <input type="password" className="password" id="password" name="password" placeholder="Enter your password" type="password"/>
                <p>Retype Password</p>
                <input type="repassword" className="repassword" id="repassword" name="repassword" placeholder="Enter your password" type="password"/>
                <br/>
                <button onClick={this.sendInfo} type="button">Login</button>
            </div>
        )
    }
}

export default Register;