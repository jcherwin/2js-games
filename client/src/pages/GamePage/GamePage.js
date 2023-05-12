import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { ME } from '../../utils/queries';
import { CREATE_GAME } from '../../utils/mutations';

import GameComponent from '../../components/GameComponent/GameComponent';
import './GamePage.css';

function GamePage() {
    const { loading: loadingMe, data: dataMe } = useQuery(ME, {
        fetchPolicy: 'network-only', // Used for first execution
        nextFetchPolicy: 'cache-first', // Used for subsequent executions
    });

    const [createGameMutation] = useMutation(CREATE_GAME);

    const { gameId: gameIdParam } = useParams();
    console.log("Game Id Param: ", gameIdParam);

    // Initialize gameId state with gameIdParam value
    const [gameId, setGameId] = React.useState(gameIdParam);

    const navigate = useNavigate();

    React.useEffect(() => {
        console.log("useEffect trigger");

        if (!loadingMe && !gameId) {
            const handleCreateGame = async () => {
                try {
                    const { data } = await createGameMutation({
                        variables: { playerId: dataMe?.me._id },
                    });
                    console.log("Game data: ", data);
                    setGameId(data.createGame._id);

                    // Use useNavigate to navigate without refreshing
                    navigate(`/game/${data.createGame._id}`);
                } catch (error) {
                    console.error('Error creating game:', error);
                }
            };
            handleCreateGame();
        }

    }, [createGameMutation, dataMe?.me._id, loadingMe, gameId, navigate]);

    console.log("Game Id: ", gameId);

    return (
        <div className="GamePage">
            <h1>Tic-Tac-Toe</h1>
            {!gameId ? (
                <p>Loading...</p>
            ) : (
                <>
                    <GameComponent gameId={gameId} />
                </>
            )}
        </div>
    );
}

export default GamePage;
