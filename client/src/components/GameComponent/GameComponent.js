import React, { useState, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import GameBoard from '../GameBoard/GameBoard';
import { GAME_UPDATED_SUBSCRIPTION } from '../../utils/subscriptions';

function GameComponent({ gameId }) {
  const { data, error, loading } = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { gameId },
  });

  const [game, setGame] = useState(null);

  useEffect(() => {
    if (data) {
      setGame(data.gameUpdated);
    }
  }, [data]);

  if (loading) {
    return <p>Loading game...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!game) {
    return <p>No game data available.</p>;
  }

  return (
    <div>
      <h2>Game ID: {game.id}</h2>
      <GameBoard gameId={gameId} /> {/* Pass gameId prop */}
      <p>Current Player: {game.currentPlayer}</p>
      {game.winner && <p>Winner: {game.winner}</p>}
      {game.isFinished && <p>The game has ended.</p>}
    </div>
  );
}

export default GameComponent;
