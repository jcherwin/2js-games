const { AuthenticationError } = require('apollo-server-express');
const Game = require('../models/Game');
const User = require('../models/User');
const { signToken } = require('../utils/auth');
const { checkWinner, isBoardFull } = require('../utils/helpers');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();


const GAME_UPDATED = 'GAME_UPDATED';

const resolvers = {
  Query: {
    getUser: async (parent, { id }) => {
      return await User.findById(id);
    },
    getGame: async (parent, { id }) => {
      return await Game.findById(id);
    },
    getAllGames: async () => {
      return await Game.find({});
    },
    me: async (parent, args, { user }) => {
      if (user) {
        return await User.findOne({ _id: user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // Add your createUser, createGame, joinGame, and makeMove mutation resolvers here
    createUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      if (!user) {
        throw new AuthenticationError('Something is wrong!');
      }
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      if (!username) {
        throw new AuthenticationError('Please provide a username');
      }

      // Find the user by email or username
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this username');
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
    }

      // Create and sign a JWT token
      const token = signToken(user);

      return { token, user };
    },
    createGame: async (parent, { playerId }) => {
      const user = await User.findById(playerId);
      if (!user) {
        throw new Error('User not found');
      }
  
      const game = new Game({ players: [playerId] });
      await game.save();
  
      user.games.push(game.id);
      await user.save();
  
      return game;
    },
    joinGame: async (parent, { gameId, playerId }) => {
      const game = await Game.findById(gameId);
      const user = await User.findById(playerId);
  
      if (!game || !user) {
        throw new Error('Game or user not found');
      }
  
      if (game.players.length >= 2) {
        throw new Error('Game is already full');
      }
  
      game.players.push(playerId);
      await game.save();
  
      user.games.push(gameId);
      await user.save();
  
      return game;
    },
    makeMove: async (parent, { gameId, playerId, row, col }) => {
      const game = await Game.findById(gameId);

      console.log(gameId);
      console.log(playerId);
      console.log(row);
      console.log(col);
  
      if (!game) {
        throw new Error('Game not found');
      }
  
      if (game.isFinished) {
        throw new Error('Game is already finished');
      }
  
      if (!game.players.includes(playerId)) {
        throw new Error('Player not part of this game');
      }
  
      if (game.currentPlayer !== (game.players.indexOf(playerId) === 0 ? 'X' : 'O')) {
        throw new Error('Not the current player\'s turn');
      }
  
      if (game.board[row][col] !== '') {
        throw new Error('Cell is already occupied');
      }

      console.log(game.currentPlayer);
      console.log(game.board[row][col]);
  
      game.board[row][col] = game.currentPlayer;
  
      // Check for a win or draw
      const winner = checkWinner(game.board);
      if (winner) {
        game.winner = winner;
        game.isFinished = true;
      } else if (isBoardFull(game.board)) {
        game.winner = 'DRAW';
        game.isFinished = true;
      }
  
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
  
      await game.save();
  
      // Notify subscribed clients about the game update
      pubsub.publish(`${GAME_UPDATED}_${gameId}`, { gameUpdated: game });
  
      return game;
    },
  },

  Subscription: {
    gameUpdated: {
      subscribe: (parent, { gameId }) => pubsub.asyncIterator([`${GAME_UPDATED}_${gameId}`]),
    },
  },

  Game: {
    players: async (parent) => {
      return await User.find({ _id: { $in: parent.players } });
    },
  },

  User: {
    games: async (parent) => {
      return await Game.find({ _id: { $in: parent.games } });
    },
  },
};

module.exports = resolvers;

