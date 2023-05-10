import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/game/:gameId" element={<GamePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;