export function checkWinner(board) {
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

    // Iterate through the winning combinations and checks if any of them are present on the board
    for (const [a, b, c] of winningCombinations) {
        if (
            board[a] !== null &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a]; // Return the winning player ('X' or 'O')
        }
    }

    return null; // No winner found
}

export function isBoardFull(board) {
    return board.every((cell) => cell !== null);
}

module.exports = { checkWinner, isBoardFull };

