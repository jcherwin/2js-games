import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './LoginPage.css';
import { Main } from './LoginPageElements';
import {LoginSignInHandle} from '../LandingPage/LandingPage.js'

function LoginPage() {

    const { state } = useLocation();
    const { title } = state;
    console.log(title);

    // States for registration
    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleUsername = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // // Handling the email change
    // const handleEmail = (e) => {
    // setEmail(e.target.value);
    // setSubmitted(false);
    // };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (name === '' || email === '' || password === '') {
        if (name === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
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
                <h1>{title}</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Username</label>
                <input onChange={handleUsername} className="input"
                    value={name} type="text" />

                {/* <label className="label">Email</label>
        <input onChange={handleEmail} className="input"
        value={email} type="email" /> */}

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                    value={password} type="password" />

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </Main>
    );
}


export default LoginPage;


// function LoginPage() {
//   return (
//     <div className="LoginPage">
//       <h1>Login</h1>
//     </div>
//   );
// }

// export default LoginPage;