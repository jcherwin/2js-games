const Stats = require('../models/Stats');

function checkWinner(board) {
    // Define the winning combinations
    const winningCombinations = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6],
    ];

    //console.log(board);

    // Iterate through the winning combinations and checks if any of them are present on the board
    for (const [a, b, c] of winningCombinations) {
        // console.log("A: ", a);
        // console.log("B: ", b);
        // console.log("C: ", c);
        // console.log("Board A: ", board[a]);
        // console.log("Board B: ", board[b]);
        // console.log("Board C: ", board[c]);
        if (
            board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            //console.log("Found winner");
            //console.log(board[a]);
            return board[a]; // Return the winning player ('X' or 'O')
        }
    }
    //console.log("No winner");
    return null; // No winner found
}

function isBoardFull(board) {
    return board.every((cell) => cell !== '');
}

async function updateUserStats(winningSymbol, player1, player2) {

    const winner = winningSymbol === 'X' ? player1 : player2;
    const loser = winningSymbol === 'X' ? player2 : player1;

    const winnerStats = await Stats.findById(winner.stats);
    const loserStats = await Stats.findById(loser.stats);

    if (winnerStats && winnerStats.tic_tac_toe && loserStats && loserStats.tic_tac_toe) {
        winnerStats.tic_tac_toe.wins += 1;
        loserStats.tic_tac_toe.losses += 1;

        await winnerStats.save();
        await loserStats.save();
    } else {
        console.error("Error: Stats objects or tic_tac_toe properties not found.");
    }
}



module.exports = { checkWinner, isBoardFull, updateUserStats };

