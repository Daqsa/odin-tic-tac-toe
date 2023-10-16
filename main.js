const gameBoard = (function () {
    /* The inner array is the row of the board
     */
    let round = 0;
    const getRound = () => round;
    const nextRound = function () {
        round++;
    };
    const board = [['', '', ''], ['', '', ''], ['', '', '']];
    const getBoard = () => board;
    const getSquare = function(row, col) {
        return board[row][col];
    };
    const setBoard = function (row, col, symbol) {
        board[row][col] = symbol
    };
    return { getRound, nextRound, getBoard, getSquare, setBoard };
})();

const displayController = (function () {
    const renderBoard = function () {
        for (let row=0; row<3; row++) {
            for (let col=0; col<3; col++) {
                let id = row * 3 + col;
                document.getElementById(`${id}`).innerText = 
                    gameBoard.getSquare(row, col);
            }
        }
    }
    return { renderBoard };
})();

// get all divs and add click functionality
const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
    square.addEventListener("click", (e) => {
        let p = e.target.children[0];
        let id = p.id;
        let row = Math.floor(parseInt(id) / 3);
        let col = parseInt(id) % 3;

        // even turns are X, odd are O
        if (gameBoard.getRound() % 2 == 0) {
            gameBoard.setBoard(row, col, 'X');
            p.innerText = 'X';
        } else {
            gameBoard.setBoard(row, col, 'O');
            p.innerText = 'O';
        }

        gameBoard.nextRound();

    })
})

displayController.renderBoard();