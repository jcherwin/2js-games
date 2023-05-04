import React from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import GameStatus from '../../components/GameStatus/GameStatus';
import './GamePage.css';

function GamePage() {
  return (
    <div className="GamePage">
      <h1>Tic-Tac-Toe</h1>
      <GameBoard />
      <GameStatus />
    </div>
  );
}

export default GamePage;
