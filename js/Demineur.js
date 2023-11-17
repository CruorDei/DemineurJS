import { Case } from "./Case.js";

export class Demineur {
    BOMB = 9;

    constructor(line, column, numberOfBomb) {
        this.length = {
            line: line,
            column: column
        };
        this.numberOfBomb = numberOfBomb;
        this.bombFound = 0;
        this.createBoard();
    }

    coordinate(column, line){
        return this.board?.[column]?.[line];
    }

    raiseNumberAroundBomb(column, line) {
        for(let i = column - 1; i <= column + 1; i++) {
            for(let j = line - 1; j <= line + 1; j++) {
                const cell = this.coordinate(i, j);
                if(cell !== undefined && !cell.isBomb) {
                    cell.raiseNumber();
                }
            }
        }
        return this.board;
    }

    dissiminateBomb() {
        for(let i = 0; i < this.numberOfBomb; i++) {
            let randomColumn = Math.floor(Math.random() * this.length.column);
            let randomRow = Math.floor(Math.random() * this.length.line);
            
            if(!this.coordinate(randomColumn, randomRow)?.isBomb) {
                this.board[randomColumn][randomRow] = new Case(this.BOMB);
                this.raiseNumberAroundBomb(randomColumn, randomRow);
            } else {
                i--;
            }
        }
    }

    createBoard() {
        this.board = Array.from({length: this.length.column}, 
            () => Array.from({length: this.length.line}, 
            () => new Case(0)));
        this.dissiminateBomb();
        return this;
    }

    reset() {
        return new Demineur(this.length.line, this.length.column, this.numberOfBomb);
    }

    oneFileCoordinate(column, line){
        return column * this.length.line + line;
    }

    twoFileCoordinate(id){
        return [
            Math.floor(id/this.length.line),
            id % this.length.line
        ]
    }

    endGame(){
        this.board.forEach(column => {
            column.forEach(cell => {
                if(cell.isBomb){
                    cell.reveal();
                }
            })
        })
    }

    isGameOver(column, line){
        const cell = this.coordinate(column, line);
        
        return cell.revealed && cell.isBomb;
    }

    isVictory(){
        return this.bombFound === this.numberOfBomb;
    }

    flagACell(column, line){
        const cell = this.coordinate(column, line);
        const bool = cell.changeFlag();

        (bool && cell.isBomb) ? this.bombFound++ : this.bombFound--;

        return this.isVictory();
    }

    revealCell(x, y, demineur) {
        if (demineur.gameOver || x < 0 || x >= demineur.length.line || y < 0 || y >= demineur.length.column || demineur.coordinate(y, x).isRevealed) {
            return;
        }

        demineur.reveal() //todo

        if(demineur.coordinate(y, x) === demineur.BOMB) {
            demineur.gameOver = true;
            alert('Game Over!');
        } else if(demineur.coordinate(y, x) === 0) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    revealCell(x + dx, y + dy, demineur);
}
}
}
}

    getBoardAsString(){
        console.log(this.board);
        return this.board.reduce((acc, current) => {
            const lineStr = current.reduce((accSecond, curentSecond) => {
                return `${accSecond},${curentSecond}`;
            })
            return `${acc}\n${lineStr}`
        })
    }
}