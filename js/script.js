import { Demineur } from './DemineurTemp.js';

    var url = new URL(window.location.href);

    var rows = url.searchParams.get("rows");
    var columns = url.searchParams.get("columns");
    var bombs = url.searchParams.get("bombs");

    console.log("plop Rows:", typeof rows);
    console.log("plop Columns:", typeof columns);
    console.log("plop Bombs:", typeof bombs);

const demineurInstance = new Demineur(+rows, +columns, +bombs);

console.log(demineurInstance.getBoardAsString());

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
            cellElement.id = demineurInstance.oneFileCoordinate(i, j);

            const cellValue = demineurInstance.coordinate(i, j).number; // je recupere ici les nombres pour mes cellules
            if (cellValue) {
                cellElement.innerText = cellValue;
            }
            
            cellElement.addEventListener('click', () => handleCellClick(i, j));//Added

            console.log(cellValue)
            gridContainer.appendChild(cellElement);
        }
    }

}

//Added
const handleCellClick = (x, y) => {
    demineurInstance.revealCell(x, y);
    generateGrid(demineurInstance);
}

generatGrid(demineurInstance);