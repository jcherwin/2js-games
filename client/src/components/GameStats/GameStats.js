import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';

function GameStats() {
    const { loading, error, data } = useQuery(ME);

    if (loading) {
        return <p>Loading stats...</p>;
    }

    if (error) {
        return <p>Error loading stats: {error.message}</p>;
    }

    if (!data || !data.me || !data.me.stats) {
        return <p>No stats available.</p>;
    }

    return (
        <div>
            <h3>Tic-Tac-Toe</h3>
            <p>Wins: {data.me.stats.tic_tac_toe.wins}</p>
            <p>Losses: {data.me.stats.tic_tac_toe.losses}</p>
        </div>
    );
}

export default GameStats;
