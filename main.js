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

    let gameEnded = false;
    const getGameEnded = () => gameEnded;

    const checkEndCondition = function () {
        if (board[0][0] == 'X' && board[0][1] == 'X' && board[0][2] == 'X' || 
            board[1][0] == 'X' && board[1][1] == 'X' && board[1][2] == 'X' || 
            board[2][0] == 'X' && board[2][1] == 'X' && board[2][2] == 'X' || 
            board[0][0] == 'X' && board[1][0] == 'X' && board[2][0] == 'X' || 
            board[0][1] == 'X' && board[1][1] == 'X' && board[2][1] == 'X' || 
            board[0][2] == 'X' && board[1][2] == 'X' && board[2][2] == 'X' || 
            board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X' || 
            board[0][2] == 'X' && board[1][1] == 'X' && board[2][0] == 'X') {
                gameEnded = true;
                return 'X';
        } else if (board[0][0] == 'O' && board[0][1] == 'O' && board[0][2] == 'O' || 
                   board[1][0] == 'O' && board[1][1] == 'O' && board[1][2] == 'O' || 
                   board[2][0] == 'O' && board[2][1] == 'O' && board[2][2] == 'O' || 
                   board[0][0] == 'O' && board[1][0] == 'O' && board[2][0] == 'O' || 
                   board[0][1] == 'O' && board[1][1] == 'O' && board[2][1] == 'O' || 
                   board[0][2] == 'O' && board[1][2] == 'O' && board[2][2] == 'O' || 
                   board[0][0] == 'O' && board[1][1] == 'O' && board[2][2] == 'O' || 
                   board[0][2] == 'O' && board[1][1] == 'O' && board[2][0] == 'O') {
            gameEnded = true;
            return 'O';
        } else if (board[0][0] != '' && board[0][1] != '' && board[0][2] != '' && 
                   board[1][0] != '' && board[1][1] != '' && board[1][2] != '' && 
                   board[2][0] != '' && board[2][1] != '' && board[2][2] != '') {
            gameEnded = true;
            return 'tie'
        } else {
            return 'continue'
        }
    }
    return { getRound, nextRound, getBoard, getSquare, setBoard, getGameEnded, checkEndCondition };
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

        if (gameBoard.getGameEnded()) {
            alert('The game ended. Please start a new game by refreshing the page.');
            return;
        }

        let p = e.target.children[0];
        let id = p.id;
        let row = Math.floor(parseInt(id) / 3);
        let col = parseInt(id) % 3;

        if (p.innerText != '') {
            alert('This square is already set! Please select another square.');
            return;
        } 
        // even turns are X, odd are O
        if (gameBoard.getRound() % 2 == 0) {
            gameBoard.setBoard(row, col, 'X');
            p.innerText = 'X';
        } else {
            gameBoard.setBoard(row, col, 'O');
            p.innerText = 'O';
        }

        switch(gameBoard.checkEndCondition()) {
            case 'X':
                alert('Player X won!');
                break;
            case 'O':
                alert('Player O won!');
                break;
            case 'tie':
                alert('The players tied.');
                break;
            default:
                break;
        }

        gameBoard.nextRound();

    })
})

displayController.renderBoard();