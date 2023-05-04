import React from 'react';
import './GameStatus.css';

function GameStatus({ currentPlayer, winner, isDraw }) {
  let statusMessage;

  if (winner) {
    statusMessage = `Winner: ${winner}`;
  } else if (isDraw) {
    statusMessage = 'It\'s a draw!';
  } else {
    statusMessage = `Current player: ${currentPlayer}`;
  }

  return (
    <div className="GameStatus">
      <p>{statusMessage}</p>
    </div>
  );
}

export default GameStatus;
