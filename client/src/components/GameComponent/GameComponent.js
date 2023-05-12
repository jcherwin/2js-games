import React, { useState, useEffect } from 'react';
import { useSubscription, useQuery } from '@apollo/client';
import GameBoard from '../GameBoard/GameBoard';
import { GET_GAME } from '../../utils/queries';
import { GAME_UPDATED_SUBSCRIPTION } from '../../utils/subscriptions';

function GameComponent({ gameId }) {
    // useSubscription is what opens the connection to recieve info on pubsub.publish
    const { data: dataGameSub, error: errorGameSub, loading: loadingGameSub } = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
        variables: { gameId: gameId },
    });

    const { refetch } = useQuery(GET_GAME, {
        variables: { gameId: gameId },
    });

    //console.log("Gameid: ", gameId);
    // if (!loadingGameSub) {
    //     console.log("Subscription: ", dataGameSub);
    // }

    const [game, setGame] = useState(null);

    useEffect(() => {
        if (loadingGameSub) {
            refetch();
        }
        if (dataGameSub) {
            setGame(dataGameSub?.gameUpdated);
        }
    });

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

    return (
        <div>
            <h2>Game ID: {game._id}</h2>
            <GameBoard gameId={gameId} />
            <p>Current Player: {game.currentPlayer}</p>
            <p>Connected Players:</p>
            {game.players.map((player) => (
                <p key={player._id}>{player.username}</p>
            )
            )}
            {game.winner && <p>Winner: {game.winner}</p>}
            {game.isFinished && <p>The game has ended.</p>}
        </div>
    );
}

export default GameComponent;
