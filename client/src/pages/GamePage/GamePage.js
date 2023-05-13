import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { ME, GET_GAME } from '../../utils/queries';
import { CREATE_GAME, JOIN_GAME } from '../../utils/mutations';

import GameComponent from '../../components/GameComponent/GameComponent';
import {} from'./GamePage.js';

function GamePage() {
    //Query game from gameidparam, check if your player is not in the game, call the join game mutation
    const { gameId: gameIdParam } = useParams();
    const navigate = useNavigate();

    // Initialize gameId state with gameIdParam value
    const [gameId, setGameId] = React.useState(gameIdParam);

    const { loading: loadingMe, data: dataMe, refetch } = useQuery(ME);
    const { loading: loadingGame, data: dataGame } = useQuery(GET_GAME, { variables: { gameId: gameIdParam } });

    const [createGameMutation] = useMutation(CREATE_GAME);
    const [joinGameMutation] = useMutation(JOIN_GAME);

    React.useEffect(() => {
        //console.log("useEffect trigger");
        if (!loadingMe && !loadingGame) {
            const handleJoinGame = async () => {
                try {
                    // console.log("Game Players: ", dataGame?.getGame.players[0]._id);
                    // console.log("Player: ", dataMe?.me._id);
                    if (dataGame?.getGame.players.length === 1) {
                        if (dataGame?.getGame.players[0]._id !== dataMe?.me._id) {
                            console.log("Joining");
                            const { data } = await joinGameMutation({
                                variables: { 
                                    gameId: gameIdParam,
                                    playerId: dataMe?.me._id
                                },
                            });
                            refetch();
                            console.log("Joined Game: ", data);
                        }
                    }
                } catch (error) {
                    console.error('Error joining game:', error);
                }
            }
            handleJoinGame();
        }

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

    }, [loadingMe, loadingGame, dataMe, dataGame]);

    // createGameMutation, dataMe?.me._id, loadingMe, gameId, navigate, loadingGame, dataGame?.getGame.players, joinGameMutation, gameIdParam, refetch

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
