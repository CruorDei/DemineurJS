import { Case } from "./Case.js";

export class Demineur {
    BOMB = 9;

    constructor(line, column, numberOfBomb) {
        this.length = {
            line: (line < 80 ? line : 80),
            column: (column < 80 ? column : 80)
        };
        this.numberOfBomb = (numberOfBomb < (line * column) ? numberOfBomb : line * column);
        this.caseRevealed = 0;
        this.gameFinished = false;
        this.createBoard();
        console.log(this.getBoardAsString())
    }

    coordinate(column, line){
        return this.board?.[column]?.[line];
    }

    oneFileCoordinate(column, line){
        return column * this.length.line + line;
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
                this.board[randomColumn][randomRow] = new Case(this.BOMB, this.oneFileCoordinate(randomColumn, randomRow));
                this.raiseNumberAroundBomb(randomColumn, randomRow);
            } else {
                i--;
            }
        }
    }

    createBoard() {
        this.board = Array.from({length: this.length.column}, 
            (x, indexColumn) => Array.from({length: this.length.line}, 
            (y, indexLine) => new Case(0, this.oneFileCoordinate(indexColumn, indexLine))));
        this.dissiminateBomb();
        return this;
    }

    twoFileCoordinate(id){
        return [
            Math.floor(id/this.length.line),
            id % this.length.line
        ]
    }

    endGame(){
        const cellArray = [];
        this.board.forEach(column => {
            column.forEach(cell => {
                if(cell.isBomb){
                    cell.reveal();
                    cellArray.push(cell);
                }
            })
        })
        return cellArray;
    }

    isGameOver(cell){
        if(cell === undefined) return false;

        const bool = cell.revealed && cell.isBomb;
        if(bool === true) this.gameFinished = true;

        return bool;
    }

    isVictory(cell){
        const bool = this.caseRevealed === (this.length.column * this.length.line - this.numberOfBomb);
        if(bool === true) this.gameFinished = true;

        return bool && !cell.isBomb ;
    }

    flagACell(column, line){
        if(this.gameFinished === true) return;
        const cell = this.coordinate(column, line);
        cell.changeFlag();

        return cell;
    }

    revealCellRecursion(column, line, cellMap){
        const cell = this.coordinate(column, line);

        if(cell === undefined || cell.revealed === true) return cellMap;
        
        cellMap.set(cell.id, cell);

        cell.reveal();
        this.caseRevealed++;

        if(cell.number === 0){
        for(let i = column - 1; i <= column + 1; i++){
                for(let j = line - 1; j <= line + 1; j++){
                    const newCell = this.coordinate(i, j);
                    if(newCell === undefined || newCell.id === cell.id || cellMap.has(newCell.id)) continue;
                    cellMap = this.revealCellRecursion(i, j, cellMap)
                }
            }
        }

        return cellMap;
    }

    startRevealCell(column, line){
        if(this.gameFinished === true) return [];
        const cellMap = this.revealCellRecursion(column, line, new Map())
        const cellArray = [...cellMap.values()]
        return cellArray;
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