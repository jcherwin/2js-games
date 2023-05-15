import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './utils/auth';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import NoMatch from './pages/NoMatch/NoMatch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={Auth.loggedIn() ? <Navigate to='/home' /> : <LandingPage />} />
          <Route path="/login" element={Auth.loggedIn() ? <Navigate to='/home' /> : <LoginPage />} />
          <Route path="/signup" element={Auth.loggedIn() ? <Navigate to='/home' /> : <LoginPage />} />
          <Route path="/home" element={Auth.loggedIn() ? <HomePage /> : <Navigate to='/login' />} />
          <Route path="/game" element={Auth.loggedIn() ? <GamePage /> : <Navigate to='/login' />} />
          <Route path="/game/:gameId" element={Auth.loggedIn() ? <GamePage /> : <Navigate to='/login' />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;