const BOMB = 9;

function raiseNumberAroundBomb(board, column, line) {
    for(let i = column - 1; i <= column + 1; i++) {
        for(let j = line - 1; j <= line + 1; j++) {
            if(board[i]?.[j] !== undefined && board[i][j] !== BOMB) {
                board[i][j]++;
            }
        }
    }
    return board;
}

function dissiminateBomb(board, numberOfBomb) {
    const lineLength = board[0].length;
    const columnLength = board.length;

    for(let i = 0; i < numberOfBomb; i++) {
        let randomColumn = Math.floor(Math.random() * columnLength);
        let randomRow = Math.floor(Math.random() * lineLength);
        
        if(board[randomColumn][randomRow] !== BOMB) {
            board[randomColumn][randomRow] = BOMB;
            board = raiseNumberAroundBomb(board, randomColumn, randomRow);
        } else {
            i--;
        }
    }

    return board;
}

function createArrayBomb(lineLength, columnLength, numberOfBomb) {
    let board = Array.from({length: columnLength}, () => Array(lineLength).fill(0));
    console.log(board);
    console.log(dissiminateBomb(board, numberOfBomb));
}

createArrayBomb(5, 5, 5);