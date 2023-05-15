import React, { useState, useEffect } from 'react';
import { useSubscription, useQuery, useMutation } from '@apollo/client';
import GameBoard from '../GameBoard/GameBoard';
import { GET_GAME, ME } from '../../utils/queries';
import { GAME_UPDATED_SUBSCRIPTION } from '../../utils/subscriptions';
import { RESET_GAME } from '../../utils/mutations';
import {Div, ConnectedPlayersBox, CurrentPlayerBox} from '../GameComponent/GameComponentElements'

function GameComponent({ gameId, onLeaveGame }) {
    // useSubscription is what opens the connection to receive info on pubsub.publish
    const { data: dataGameSub, error: errorGameSub, loading: loadingGameSub } = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
        variables: { gameId: gameId },
    });

    const { refetch } = useQuery(GET_GAME, {
        variables: { gameId: gameId },
    });

    const { data: meData } = useQuery(ME);

    const [resetGameMutation] = useMutation(RESET_GAME);

    const [game, setGame] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchGame = async () => {
            await refetch();
        };

        fetchGame();
        if (dataGameSub) {
            setGame(dataGameSub?.gameUpdated);
        }
    }, [dataGameSub, gameId, refetch]);

    if (loadingGameSub) {
        return (
            <>
                <p>Loading game component...</p>
                {/* <button onClick={() => refetch()}>Start</button> */}
            </>
        );
    }

    if (errorGameSub) {
        return <p>Error: {errorGameSub.message}</p>;
    }

    if (!game) {
        return <p>No game data available.</p>;
    }

    const handleResetGame = async () => {
        try {
            await resetGameMutation({ variables: { gameId } });
        } catch (error) {
            console.error('Error resetting game:', error);
        }
    };

    const handleGoHome = async () => {
        try {
            onLeaveGame();
            window.location.assign('/home');
        } catch (error) {
            console.error('Error leaving game:', error);
        }
    };

    return (
        <Div>
            {/* <h5>Game ID: {game._id}</h5> */}
            <CurrentPlayerBox>
                {/* trying something */}
                
                <p>Player's Turn: {game.currentPlayer}</p> 
            </CurrentPlayerBox>

            <GameBoard gameId={gameId} />
            <ConnectedPlayersBox>
            <p>Connected Players:</p>
            {game.players.map((player) => (
                <ul>
                    <li key={player._id}>
                        {player.username} - {game.players[0]._id === player._id ? "X" : "O" }
                    </li>
                </ul>
                // <p key={player._id}>{player.username}</p>
            ))}
            </ConnectedPlayersBox>
            {game.winner && <p>Winner: {game.winner}</p>}
            {game.isFinished && (
                <div>
                    <button onClick={handleResetGame}>Play Again</button>
                    <button onClick={handleGoHome}>Home</button>
                </div>
            )}
        </Div>
    );
}

export default GameComponent;
