const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  board: {
    type: [[String]],
    default: Array.from({ length: 3 }, () => Array(3).fill('')),
  },
  currentPlayer: {
    type: String,
    enum: ['X', 'O'],
    default: 'X',
  },
  winner: {
    type: String,
    enum: ['X', 'O', 'DRAW', null],
    default: null,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
