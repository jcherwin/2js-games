import { gql } from '@apollo/client';

export const GAME_UPDATED_SUBSCRIPTION = gql`
  subscription GameUpdated($gameId: ID!) {
    gameUpdated(gameId: $gameId) {
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
