import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import UserContext from './context/UserContext';
import { useQuery } from '@apollo/client';
import { ME } from './utils/queries';

import './App.css';

function App() {

  const { loading, error, data } = useQuery(ME);

  // Check for loading state
  if (loading) return <p>Loading user data...</p>;

  // Check for error state
  if (error) return <p>Error fetching user data: {error.message}</p>;

  // Get the playerId from the data
  const playerId = data.me.id;

  const playerName = data.me.username;

  return (
    <UserContext.Provider value={{ playerId, playerName }}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;