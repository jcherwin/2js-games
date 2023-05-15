import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { ME, GET_GAME } from '../../utils/queries';
import { CREATE_GAME, JOIN_GAME, LEAVE_GAME } from '../../utils/mutations';
import HeaderComponent from '../../components/Header/Header';
import GameComponent from '../../components/GameComponent/GameComponent';
import { Div, Main, Div1, H5, Div2, Button, Popup } from './GamePageElements';

function GamePage() {
    //Query game from gameidparam, check if your player is not in the game, call the join game mutation
    const { gameId: gameIdParam } = useParams();
    const navigate = useNavigate();

    // Initialize gameId state with gameIdParam value
    const [gameId, setGameId] = useState(gameIdParam);

    // eslint-disable-next-line no-unused-vars
    const { loading: loadingMe, data: dataMe, refetch } = useQuery(ME);
    // eslint-disable-next-line no-unused-vars
    const { loading: loadingGame, data: dataGame } = useQuery(GET_GAME,
        { variables: { gameId: gameIdParam } }
    );

    const [createGameMutation] = useMutation(CREATE_GAME);
    const [joinGameMutation] = useMutation(JOIN_GAME);
    const [leaveGameMutation] = useMutation(LEAVE_GAME);

    const [hasLeftGame, setHasLeftGame] = useState(false);

    useEffect(() => {
        if (dataMe && dataGame && !hasLeftGame) {
            const handleJoinGame = async () => {
                const isPlayerInGame = dataGame.getGame.players.some(
                    (player) => player._id === dataMe.me._id
                );

                if (
                    !isPlayerInGame &&
                    dataGame.getGame.players.length === 1 &&
                    dataGame.getGame.players[0]._id !== dataMe.me._id
                ) {
                    try {
                        const { data } = await joinGameMutation({
                            variables: {
                                gameId: gameId,
                                playerId: dataMe.me._id,
                            },
                        });
                        refetch();
                    } catch (error) {
                        console.error('Error joining game:', error);
                    }
                }
            };
            handleJoinGame();
        }

        if (dataMe && !dataGame && !gameIdParam) {
            const handleCreateGame = async () => {
                try {
                    console.log("Creating Game");
                    const { data } = await createGameMutation({
                        variables: { playerId: dataMe.me._id },
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
        // If you see an error here, it's intentional
        // Only want useEffect to trigger on the update of these 2 vars
        // to avoid creating more than 1 game, etc
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataMe, dataGame, hasLeftGame]);

    // Effect for leaving the game
    useEffect(() => {
        if (hasLeftGame) {
            const handleLeaveGame = async () => {
                try {
                    await leaveGameMutation({
                        variables: {
                            gameId: gameId,
                            playerId: dataMe.me._id,
                        },
                    });
                    refetch();
                } catch (error) {
                    console.error('Error leaving game:', error);
                }
            };
            handleLeaveGame();
        }
    }, [hasLeftGame, gameId, dataMe, refetch, leaveGameMutation]);

    console.log("Render: ", gameId);

    const gameLink = `https://jjs-games.herokuapp.com/game/${gameId}`

    const [showPopup, setShowPopup] = useState(false);

    function copyLink() {
        navigator.clipboard.writeText(gameLink);
        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
    }


    return (
        <Main className="HomePage">
            <HeaderComponent />
            <H5>Send this link to a friend: &nbsp;
                <Button onClick={() => copyLink()}>
                    Copy Link
                    <Popup show={showPopup}>
                        Copied!
                    </Popup>
                </Button>
            </H5>

            <Div1>
                <Div className="GamePage">
                    <h1>Tic-Tac-Toe</h1>
                    {!gameId ? (
                        <p>Loading page...</p>
                    ) : (
                        <GameComponent gameId={gameId} onLeaveGame={() => setHasLeftGame(true)} />
                    )}
                </Div>
            </Div1>
        </Main>
    );
}

export default GamePage;
