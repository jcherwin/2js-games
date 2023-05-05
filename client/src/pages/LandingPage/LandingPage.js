import React from 'react';
import './LandingPage.css';
import Logo from '../../assets/images/logo_2js_games.png';
import {Link} from "react-router-dom";

function LandingPage() {
  return (
    <main>
      <div className="LandingPage">
        <h1>Welcome!</h1>
        <img src={Logo} alt='2js games logo'></img>

        <div>
          <Link to="/login">Log In</Link>
          <br/>
          <Link to="/login">Create an Account</Link>
        </div>
        
      </div>
    </main>
  );
}

export default LandingPage;
