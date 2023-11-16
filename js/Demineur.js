class Demineur {
    BOMB = 9;

    constructor(line, column, numberOfBomb) {
        this.length = {
            line: line,
            column: column
        };
        this.numberOfBomb = numberOfBomb;
        this.board = this.createBoard();
    }

    raiseNumberAroundBomb(board, column, line) {
        for(let i = column - 1; i <= column + 1; i++) {
            for(let j = line - 1; j <= line + 1; j++) {
                if(board[i]?.[j] !== undefined && board[i][j] !== this.BOMB) {
                    board[i][j]++;
                }
            }
        }
        return board;
    }

    dissiminateBomb(board, numberOfBomb) {
        for(let i = 0; i < numberOfBomb; i++) {
            let randomColumn = Math.floor(Math.random() * this.length.column);
            let randomRow = Math.floor(Math.random() * this.length.line);
            
            if(board[randomColumn][randomRow] !== this.BOMB) {
                board[randomColumn][randomRow] = this.BOMB;
                board = this.raiseNumberAroundBomb(board, randomColumn, randomRow);
            } else {
                i--;
            }
        }

        return board;
    }

    createBoard() {
        let board = Array.from({length: this.length.column}, () => Array(this.length.line).fill(0));
        board = this.dissiminateBomb(board, this.numberOfBomb);
        return board;
    }
}

console.log(new Demineur(5, 5, 5));