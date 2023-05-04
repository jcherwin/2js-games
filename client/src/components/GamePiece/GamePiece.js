import React from 'react';
import './GamePiece.css';

function GamePiece({ piece }) {
  return <div className={`GamePiece ${piece}`}>{piece}</div>;
}

export default GamePiece;
