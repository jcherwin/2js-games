import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" component={HomePage} />
          <Route path="/game/:gameId" component={GamePage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
