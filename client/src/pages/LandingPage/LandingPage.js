import React from 'react';
import './LandingPage.css';
import Logo from '../../assets/images/logo_2js_games.png';
import {Link} from "react-router-dom";
import { Main, Img, H1, Div } from './LandingPageElements';

function LandingPage() {
  return (
    <Main>
      <div className="LandingPage">
        <H1 className='welcomeHeader'>Welcome!</H1>
        <Img src={Logo} alt='2js games logo'></Img>

        <Div>
          <Link to="/login">Log In</Link>
          <br/>
          <Link to="/login">Create an Account</Link>
        </Div>
        
      </div>
    </Main>
  );
}

export default LandingPage;
