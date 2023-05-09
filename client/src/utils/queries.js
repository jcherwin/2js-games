import { gql } from '@apollo/client';

export const ME = gql`
  query me {
    me {
      id
      username
      games {
        id
        players {
          id
          username
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    user(id: $userId) {
      id
      username
      games {
        id
        players {
          id
          username
        }
      }
    }
  }
`;

export const GET_GAME = gql`
  query getGame($gameId: ID!) {
    game(id: $gameId) {
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

export const GET_ALL_GAMES = gql`
  query getAllGames {
    games {
      id
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
