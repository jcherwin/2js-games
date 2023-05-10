import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GAME } from '../../utils/queries';
import { MAKE_MOVE } from '../../utils/mutations';
import GamePiece from '../GamePiece/GamePiece';
import './GameBoard.css';

function GameBoard({ gameId }) {
  // Fetch game data
  const { loading, error, data } = useQuery(GET_GAME, {
    variables: { gameId },
  });

  // Perform the MAKE_MOVE mutation
  const [makeMove] = useMutation(MAKE_MOVE);

  // Maintain the game state locally
  const [board, setBoard] = useState([]);

  // Update the local game state when the fetched game data changes
  useEffect(() => {
    if (data && data.game) {
      setBoard(data.game.board);
    }
  }, [data]);

  // Handle user input (e.g., clicking a cell)
  const handleCellClick = async (row, col) => {
    try {
      const { data } = await makeMove({
        variables: {
          gameId,
          playerId: 'playerId', // Replace with the actual playerId from context or props
          row,
          col,
        },
      });

      // Update the local game state with the new board from the server
      setBoard(data.makeMove.board);
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  if (loading) return <p>Loading game...</p>;
  if (error) return <p>Error fetching game data: {error.message}</p>;

  return (
    <div className="GameBoard">
      {board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <GamePiece piece={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
