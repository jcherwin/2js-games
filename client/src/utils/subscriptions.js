import { gql } from '@apollo/client';

export const GAME_UPDATED_SUBSCRIPTION = gql`
  subscription GameUpdated($gameId: ID!) {
    gameUpdated(gameId: $gameId) {
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
