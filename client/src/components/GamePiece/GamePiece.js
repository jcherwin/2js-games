import React from 'react';
import './GamePiece.css';
import {Div} from './GamePieceElement'

function GamePiece({ piece }) {
  return <Div className={`GamePiece ${piece}`}>{piece}</Div>;
}

export default GamePiece;
