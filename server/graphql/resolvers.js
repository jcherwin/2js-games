const { AuthenticationError } = require('apollo-server-express');
const Game = require('../models/Game');
const User = require('../models/User');
const Stats = require('../models/Stats');
const { signToken } = require('../utils/auth');
const { checkWinner, isBoardFull, updateUserStats } = require('../utils/helpers');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const GAME_UPDATED = 'GAME_UPDATED';

const resolvers = {
    Query: {
        getUser: async (parent, { id }) => {
            return await User.findById(id);
        },
        getGame: async (parent, { id }) => {
            const game = await Game.findById(id)
            pubsub.publish(`${GAME_UPDATED}_${game._id}`, { gameUpdated: game });
            return game;
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
        createUser: async (parent, args) => {
            const stats = await Stats.create({ tic_tac_toe: { wins: 0, losses: 0 } });
            const user = await User.create({ ...args, stats: stats._id });
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

            pubsub.publish(`${GAME_UPDATED}_${game._id}`, { gameUpdated: game });

            return game;
        },
        makeMove: async (parent, { gameId, playerId, row, col }) => {
            const game = await Game.findById(gameId);

            // console.log(gameId);
            // console.log(playerId);
            // console.log("Row: ", row);
            // console.log("Col: ", col);
            // console.log(game);

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

            // console.log("Current player: ", game.currentPlayer);
            // console.log("Game board pos: ", game.board[row][col]);
            // console.log("Game board: ", game.board);

            game.board[row][col] = game.currentPlayer;

            // console.log("Updated Game board pos: ", game.board[row][col]);
            // console.log("Updated Game board: ", game.board);

            // Check for a win or draw
            // The game board matrix needs to be flattened to work with the helper functions
            const winnerSymbol = checkWinner(game.board.flat());
            if (winnerSymbol) {
                //console.log("Winner found");
                game.winner = winnerSymbol;
                game.isFinished = true;

                // Update user stats
                const player1 = await User.findById(game.players[0]);
                const player2 = await User.findById(game.players[1]);
                await updateUserStats(winnerSymbol, player1, player2);

            } else if (isBoardFull(game.board.flat())) {
                //console.log("Board full");
                game.winner = 'DRAW';
                game.isFinished = true;
            }



            game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';

            //console.log("Game not saved yet");
            //console.log(game);           

            try {
                // The save method will not work here because of a conflict with updating the arrays
                const result = await game.updateOne(game);
                //console.log(result);
            } catch (error) {
                console.log(error);
            }

            //console.log("Subscription not started");
            //console.log(game);

            // Notify subscribed clients about the game update
            pubsub.publish(`${GAME_UPDATED}_${gameId}`, { gameUpdated: game });

            //console.log("Subscription finished");
            //console.log(game);

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
        stats: async (parent) => {
            return await Stats.find({ _id: { $in: parent.stats } });
        },
    },
};

module.exports = resolvers;

