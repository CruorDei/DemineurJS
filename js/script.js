import { Demineur } from './Demineur.js';
const demineurInstance = new Demineur(rows, columns, bombs);

console.log(`${new Demineur(8, 8, 8).getBoardAsString()}`);

let generatGrid = (demineurInstance) => {
    let gridContainer = document.querySelector("#demineurGrid");

    // gridContainer.innerHTML = "";
    gridContainer.classList.add('grid');
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 30px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 30px)`;

    //creation de ma grille avec des cellules html
    for (let i = 0; i < demineurInstance.length.column; i++) {
        for (let j = 0; j < demineurInstance.length.line; j++) {
            
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            const cellValue = demineurInstance.board[i][j];
            if (cellValue) {
                cellElement.innerText = cellValue;
            }
            console.log(cellValue)
            gridContainer.appendChild(cellElement);
        }
    }

}

generatGrid(demineurInstance);