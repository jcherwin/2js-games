import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
  ) {
    createUser(
      username: $username
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_GAME = gql`
    mutation createGame($playerId: ID!) {
        createGame(playerId: $playerId) {
            id
            board
            currentPlayer
            isFinished
            players {
            id
            username
            }
        }
    }    
`;

export const JOIN_GAME = gql`
    mutation joinGame($gameId: ID!, $playerId: ID!) {
        joinGame(gameId: $game_id, playerId: $playerId) {
            id
            board
            currentPlayer
            isFinished
            players {
            id
            username
            }
        }
    }
`;

export const MAKE_MOVE = gql`
    mutation makeMove($gameId: ID!, $playerId: ID!, $row: Int!, $col: Int!) {
        makeMove(gameId: $game_id, playerId: $playerId, row: $row, col: $col) {
            id
            board
            currentPlayer
            winner
            isFinished
            players {
            id
            username
            }
        }
    }
`;