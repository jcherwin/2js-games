import React from 'react';
import './LandingPage.css';
import Logo from '../../assets/images/logo_2js_games.png'

function LandingPage() {
  return (
    <main>
      <div className="LandingPage">
        <h1>Landing Page</h1>
        <img src={Logo} alt='2js games logo'></img>
      </div>
    </main>
  );
}

export default LandingPage;
