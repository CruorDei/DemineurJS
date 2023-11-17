import { Demineur } from './Demineur.js';

const timer = {
    startTime: new Date(),
    intervalRef: null,
    elapsedTime: 0,
}


let url = new URL(window.location.href);

let rows = url.searchParams.get("rows");
let columns = url.searchParams.get("columns");
let bombs = url.searchParams.get("bombs");

let countbombs = document.querySelector(".bombs");
console.log(countbombs)
if (countbombs){
    countbombs.innerText = bombs
}

// console.log("plop Rows:", rows);
// console.log("plop Columns:", columns);
// console.log("plop Bombs:", bombs);

const demineurInstance = new Demineur(+rows, +columns, +bombs);

function startTimer() {
    const updateTimer = () => {
        const currentTime = new Date();
        timer.elapsedTime = Math.floor((currentTime - timer.startTime) / 1000); // calculate elapsed time in seconds
        let htmlTimer = document.querySelector('.timer');
        if(htmlTimer) {
            htmlTimer.innerText = 999 - timer.elapsedTime;
        }
    };
    
    timer.intervalRef = setInterval(updateTimer, 1000); // update timer every second
}

// console.log(demineurInstance.getBoardAsString());

let generateGrid = (demineurInstance) => {
    let gridContainer = document.querySelector("#demineurGrid");

    // gridContainer.innerHTML = "";
    gridContainer.classList.add('grid');
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 30px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 30px)`;

    // console.log(demineurInstance.length);

    //creation de ma grille avec des cellules html
    for (let i = 0; i < demineurInstance.length.column; i++) {
        for (let j = 0; j < demineurInstance.length.line; j++) {
            
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.id = demineurInstance.oneFileCoordinate(i, j);

            const cellValue = demineurInstance.coordinate(i, j).number;
            // je recupere ici les nombres pour mes cellules
            // if (cellValue) {
            //     cellElement.innerText = cellValue;
            // }
            cellElement.addEventListener("click", () => {
                if(demineurInstance.coordinate(i, j).revealed) return;
                
                const cellArray = demineurInstance.startRevealCell(i, j);
                let cellSelected;
                console.log(cellArray);
                
                cellArray.forEach(e => {
                    cellSelected = document.getElementById(e.id);
                    if(e.number === 9){
                        demineurInstance.isGameOver(e)
                        demineurInstance.endGame().forEach(b => {
                            document.getElementById(b.id).style.backgroundColor = "var(--loose)";
                            //.style.backgroundColor = `var(--loose)`
                        })

                    }
                    if (e.revealed){
                        e.number === 9 ? cellSelected.style.backgroundColor = "var(--loose)" : cellSelected.style.backgroundColor = "var(--bg-light-color)";
                        cellSelected.innerText = (e.number && e.number !== 9) ? e.number : "";
                    }

                    //clearInterval(timer.intervalRef); after victory
                    
                    console.log(demineurInstance.isVictory())
                });

            });

            cellElement.addEventListener("contextmenu", (event) => {
                event.preventDefault();

                const cellFlag = demineurInstance.flagACell(i, j);
                
                if(cellFlag === undefined) return;

                let cellFlaged = document.getElementById(cellFlag.id);
                
                if(cellFlag.flag) {
                    bombs--
                    cellFlaged.classList.add("flag")
                } else if (!cellFlag.flag) {
                    bombs++
                    cellFlaged.classList.remove("flag")
                }
                countbombs.innerText = bombs;
                cellFlag

            });
            
            //cellElement.addEventListener('click', () => handleCellClick(i, j));//Added

            // console.log(cellValue)
            gridContainer.appendChild(cellElement);
        }
    }

}

//Added
// const handleCellClick = (x, y) => {
//     demineurInstance.revealCell(x, y);
//     generateGrid(demineurInstance);
// }


window.addEventListener("load", () => {
    generateGrid(demineurInstance);
    startTimer();
});