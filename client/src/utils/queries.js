import { gql } from '@apollo/client';

export const ME = gql`
  query me {
    me {
      _id
      username
      games {
        _id
        players {
          _id
          username
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(_id: $userId) {
      _id
      username
      games {
        _id
        players {
          _id
          username
        }
      }
    }
  }
`;

export const GET_GAME = gql`
  query getGame($gameId: ID!) {
    getGame(id: $gameId) {
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

export const GET_ALL_GAMES = gql`
  query getAllGames {
    getAllGames {
      _id
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
