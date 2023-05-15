const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    games: [Game!]
    stats: Stats!
    createdAt: String!
  }

  type Stats {
    _id: ID!
    tic_tac_toe: TicTacToeStats!
  }

  type TicTacToeStats {
    wins: Int
    losses: Int
  }

  type Game {
    _id: ID!
    board: [[String!]!]
    currentPlayer: String!
    winner: String
    isFinished: Boolean!
    players: [User!]
    createdAt: String!
  }

  type Query {
    me: User
    getUser(id: ID!): User
    getGame(id: ID!): Game
    getAllGames: [Game!]
  }

  type Mutation {
    login(username: String, password: String!): Auth
    createUser(username: String!, password: String!): Auth
    createGame(playerId: ID!): Game!
    joinGame(gameId: ID!, playerId: ID!): Game!
    makeMove(gameId: ID!, playerId: ID!, row: Int!, col: Int!): Game!
    resetGame(gameId: ID!): Game
    leaveGame(gameId: ID!, playerId: ID!): Game!
  }

  type Subscription {
    gameUpdated(gameId: ID!): Game!
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
