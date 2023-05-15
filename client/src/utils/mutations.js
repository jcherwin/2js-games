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
            _id
            board
            currentPlayer
            isFinished
            players {
                _id
                username
            }
        }
    }    
`;

export const JOIN_GAME = gql`
    mutation joinGame($gameId: ID!, $playerId: ID!) {
        joinGame(gameId: $gameId, playerId: $playerId) {
            _id
            board
            currentPlayer
            isFinished
            players {
                _id
                username
            }
        }
    }
`;

export const MAKE_MOVE = gql`
    mutation makeMove($gameId: ID!, $playerId: ID!, $row: Int!, $col: Int!) {
        makeMove(gameId: $gameId, playerId: $playerId, row: $row, col: $col) {
            _id
            board
            currentPlayer
            winner
            isFinished
            players {
                _id
                username
            }
        }
    }
`;

export const RESET_GAME = gql`
  mutation ResetGame($gameId: ID!) {
    resetGame(gameId: $gameId) {
      _id
      board
      winner
      isFinished
    }
  }
`;

export const LEAVE_GAME = gql`
  mutation LeaveGame($gameId: ID!, $playerId: ID!) {
    leaveGame(gameId: $gameId, playerId: $playerId) {
      _id
      players {
        _id
        username
      }
    }
  }
`;