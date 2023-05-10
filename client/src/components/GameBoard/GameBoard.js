import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GAME, ME } from '../../utils/queries';
import { MAKE_MOVE } from '../../utils/mutations';
import GamePiece from '../GamePiece/GamePiece';
import './GameBoard.css';

function GameBoard({ gameId }) {
  // Fetch game data
  const { loading: loadingGame, error: errorGame, data: dataGame } = useQuery(GET_GAME, {
    variables: { gameId },
  });

  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME);

  // Perform the MAKE_MOVE mutation
  const [makeMove] = useMutation(MAKE_MOVE);

  // Maintain the game state locally
  const [board, setBoard] = useState([]);

  // Update the local game state when the fetched game data changes
  useEffect(() => {
    if (dataGame && dataGame.game) {
      setBoard(dataGame.game.board);
    }
  }, [dataGame]);

  // Handle user input (e.g., clicking a cell)
  const handleCellClick = async (row, col) => {
    if (loadingMe || errorMe) return; // Prevent moves if user data is loading or has errors

    try {
      const { data } = await makeMove({
        variables: {
          gameId,
          playerId: dataMe.me.id,
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

  if (loadingGame || loadingMe) return <p>Loading game...</p>;
  if (errorGame) return <p>Error fetching game data: {errorGame.message}</p>;
  if (errorMe) return <p>Error fetching user data: {errorMe.message}</p>;

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
