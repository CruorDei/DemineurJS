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

const demineurInstance = new Demineur(+columns, +rows, +bombs);

function clearTimer() {
    if(timer.intervalRef === null) return;
    
    clearInterval(timer.intervalRef);
    
    timer.intervalRef = null;
}

function startTimer() {
    clearTimer()
    timer.startTime = new Date();
    timer.elapsedTime = 0;

    const updateTimer = () => {
        const currentTime = new Date();
        timer.elapsedTime = Math.floor((currentTime - timer.startTime) / 1000);
        let htmlTimer = document.querySelector('.timer');
        if(htmlTimer) {
            htmlTimer.innerText = timer.elapsedTime;
        }
    };

    updateTimer();
    
    timer.intervalRef = setInterval(updateTimer, 1000);
}

function createPopupLink(text) {
    let popupLink = document.createElement('a');
    popupLink.classList.add('popup')
    popupLink.textContent = text;
    popupLink.style.position = "absolute";
    popupLink.style.width = "100vw";
    popupLink.style.textAlign = "center";
    popupLink.style.top = "20%";
    popupLink.style.left = "50%";
    popupLink.style.transform = "translate(-50%, -50%)";
    popupLink.style.fontSize = "6em";
    popupLink.style.textDecoration = "none";
    popupLink.style.backgroundColor = "#00000010";
    popupLink.href = "index.html";

    // Ajoutez un style différent au survol pour tous les liens
    popupLink.style.transition = "color 0.3s ease-in-out"; // Ajoute une transition pour une animation plus fluide
    popupLink.addEventListener("mouseover", () => {
        popupLink.style.color = `var(--txt)`; // Couleur différente au survol
    });
    popupLink.addEventListener("mouseout", () => {
        // Rétablissez la couleur initiale lorsque la souris quitte l'élément
        if (text.toLowerCase() === "game over") {
            popupLink.style.color = "#ff0000";
        } else {
            popupLink.style.color = ""; // Utilisez la couleur par défaut du texte
        }
    });

    // Appliquez la couleur rouge uniquement si le texte est "Game Over"
    if (text.toLowerCase() === "game over") {
        popupLink.style.color = "#ff0000";
    }

    return popupLink;
}
let gridContainer = document.querySelector("#demineurGrid");


let generateGrid = (demineurInstance) => {

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
                        //clearInterval(timer.intervalRef);
                        clearTimer()
                        demineurInstance.endGame().forEach(b => {
                            document.getElementById(b.id).style.backgroundColor = "var(--loose)";
                            //.style.backgroundColor = `var(--loose)`
                            let container = document.querySelector(".container");
                            let gameOverPopup = createPopupLink("Game Over");
                            container.appendChild(gameOverPopup);
                            
                        })

                    }
                    if (e.revealed){
                        e.number === 9 ? cellSelected.style.backgroundColor = "var(--loose)" : cellSelected.style.backgroundColor = "var(--bg-light-color)";
                        cellSelected.innerText = (e.number && e.number !== 9) ? e.number : "";
                    }

                    //clearInterval(timer.intervalRef); after victory
                    
                    if(demineurInstance.isVictory(e)){
                        //clearInterval(timer.intervalRef);
                        clearTimer()
                        let container = document.querySelector(".container");
                        let victoryPopup = createPopupLink("Victory!");
                        container.appendChild(victoryPopup);
                    }

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

function removePopup() {
    let popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.remove());
}

document.querySelector('button.restart').addEventListener('click', () => {
    bombs = url.searchParams.get("bombs");
    countbombs.innerText = bombs;
    const demineurInstance = new Demineur(+columns, +rows, +bombs)
    gridContainer.innerHTML = "";
    clearInterval(timer.intervalRef);
    removePopup();
    generateGrid(demineurInstance);
    startTimer();
});


window.addEventListener("load", () => {
    generateGrid(demineurInstance);
    startTimer();
});