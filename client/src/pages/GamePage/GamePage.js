import React from 'react';
import GameComponent from '../../components/GameComponent/GameComponent';
import GameStatus from '../../components/GameStatus/GameStatus';
import './GamePage.css';

function GamePage() {
  // You'll need to get the gameId, either from the URL, context, or local storage
  // For the sake of this example, I'm setting a static gameId value
  const gameId = 'yourGameIdHere';

  return (
    <div className="GamePage">
      <h1>Tic-Tac-Toe</h1>
      <GameComponent gameId={gameId} />
      <GameStatus />
    </div>
  );
}

export default GamePage;
