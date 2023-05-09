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

module.exports = { checkWinner, isBoardFull };

