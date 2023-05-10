import React from 'react';
import './LandingPage.css';
import Logo from '../../assets/images/logo_2js_games.png';
import {Link} from "react-router-dom";
import { Main, Img, H1, Div } from './LandingPageElements';


export const LoginSignInHandle = (event, message) =>
{
  // console.log('Link clicked');

  // // below refers to the link element
  // console.log(event.currentTarget);
  let newMessage = JSON.stringify(message)
  console.log(typeof(message));
  console.log(typeof(newMessage));
  return (
    <h1>{newMessage}</h1>
  )
};

function LandingPage() {
  return (
    <Main>
      <div className="LandingPage">
        <H1 className='welcomeHeader'>Welcome!</H1>
        <Img src={Logo} alt='2js games logo'></Img>

        <Div>
          <Link to="/login" state={{ title: "Login" }}>Log In</Link>
          <br/>
          <Link to="/signup" state={{ title: "Create an Account" }}>Create an Account</Link>
        </Div>
        
      </div>
    </Main>
  );
}


export default LandingPage;
