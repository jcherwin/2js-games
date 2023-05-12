import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN, CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import './LoginPage.css';
import { Main, Input } from './LoginPageElements';

function LoginPage() {
  const { state } = useLocation();
  const { title } = state;
  console.log(title);

  // States for registration
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [loginUser, { error: loginError }] = useMutation(LOGIN);
  const [signupUser, { error: signupError }] = useMutation(CREATE_USER);

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

      if (title === "Login") {
        try {
          const { data } = await loginUser({ variables: { username: name, password } });
          console.log('Logged in:', data.login);

          const token = data.login.token;
          Auth.login(token);
          
          // Handle successful login, e.g., redirect to home page or save the token
        } catch (error) {
          console.error('Error logging in:', error);
          // Handle login error, e.g., show an error message
        }
      } else if (title === "Create an Account") {
        try {
          const { data } = await signupUser({ variables: { username: name, password } });
          console.log('Signed up:', data.createUser);

          const token = data.createUser.token;
          Auth.login(token);
          // Handle successful sign up, e.g., redirect to home page or save the token
        } catch (error) {
          console.error('Error signing up:', error);
          // Handle sign up error, e.g., show an error message
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