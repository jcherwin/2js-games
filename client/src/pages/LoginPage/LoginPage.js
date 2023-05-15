import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN, CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { Main, Div1, Div2, H1, Input } from './LoginPageElements';
import './LoginPage.css';

function LoginPage() {

    // Determines the utility of the page based off the url path
    // const [title, setTitle] = useState('');
    // switch (window.location.pathname) {
    //     case "/login":
    //         if(title === ''){ setTitle('Login') } 
    //         break;
    //     case "/signup":
    //         if(title === ''){ setTitle('Create an Account') } 
    //         break;
    //     default: window.location.assign('/');
    // }

    const PATH = window.location.pathname;

    // States for registration
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [loginUser] = useMutation(LOGIN);
    const [signupUser] = useMutation(CREATE_USER);

    // Handling the name change
    const handleUsername = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || password === '') {
            setError(true);
        } else {
            setError(false);

            if (PATH === "/login") {
                try {
                    const { data } = await loginUser(
                        { variables: { username: name, password } }
                    );
                    //console.log('Logged in:', data.login);

                    const token = data.login.token;
                    Auth.login(token);
                } catch (error) {
                    console.error('Error logging in:', error);
                }
            } else if (PATH === "/signup") {
                try {
                    const { data } = await signupUser(
                        { variables: { username: name, password } }
                    );
                    //console.log('Signed up:', data.createUser);

                    const token = data.createUser.token;
                    Auth.login(token);
                } catch (error) {
                    console.error('Error signing up:', error);
                }
            }
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>{name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <Main className="form">
            <div>
                {PATH === "/login" ? (
                    <Div1>
                        <Div2>
                            <Link to="/signup">← Go to Signup</Link>
                            <Link to="/">🏠 Home</Link>
                        </Div2>
                        <H1>Login</H1>
                    </Div1>
                ) : (
                    <Div1>
                        <Div2>
                            <Link to="/login">← Go to Login</Link>
                            <Link to="/">🏠 Home</Link>
                        </Div2>
                        <H1>Create an Account</H1>
                    </Div1>
                )}

            </div>


            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Username</label>
                <Input onChange={handleUsername} className="input"
                    value={name} type="text" placeholder="username" />

                <label className="label">Password</label>
                <Input onChange={handlePassword} className="input"
                    value={password} type="password" placeholder='password' />

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </Main>
    );
}


export default LoginPage;