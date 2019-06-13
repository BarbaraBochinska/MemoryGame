let colors = ["red", "green", "blue" , "yellow", "orange", "pink", "brown", "black", 
              "white", "purple", "gold", "violet", "navy", "lime", "lightgreen", "magenta", 
              "royalblue", "lightcoral", "cyan"];
let generatedColors = [];
let clickedTiles = [];
let clickable = true;

function generateBoard(rownum, colnum) {
    if (rownum * colnum % 2 != 0) {
        let warning = document.createElement("H2");
        document.getElementById('gameboard').appendChild(warning);
        warning.innerText = "Invalid board"
        return
    }
    let amount = (rownum * colnum)/2;
    generateColors(amount);
    console.log(generatedColors);
    let idcounter = 1;
    for (let i = 0; i < rownum; i++){
        let row = document.createElement("DIV");
        row.className = 'row-container';
        document.getElementById("gameboard").appendChild(row);
        for (let j = 0; j < colnum; j++){
            let tile = generateTile(idcounter);
            row.appendChild(tile);
            idcounter++;
        }
    }
}

function generateTile(idcounter) {
    let tile = document.createElement("DIV");
    let color = generatedColors[Math.floor(Math.random() * generatedColors.length)];
    let colorIndex = generatedColors.indexOf(color);
    generatedColors.splice(colorIndex, 1);
    tile.classList.add('tile', 'back-tile');
    let tileFront = document.createElement("DIV");
    tileFront.classList.add("tile-face", "tile-face-front");
    let tileBack = document.createElement("DIV");
    tileBack.classList.add("tile-face", "tile-face-back");
    tileBack.style.backgroundColor = color;
    tile.id = "tile" + idcounter;
    tile.onclick = () => tileHandler(tile);
    tile.appendChild(tileFront);
    tile.appendChild(tileBack);

    return tile;
} 

function generateColors(amount) {
    for (let c = 0; c < amount ; c++) {
        let color = colors[Math.floor(Math.random() * colors.length)]
        if (!generatedColors.includes(color)){
            generatedColors.push(color);
            generatedColors.push(color);
        } else {
            c--;
        }
    }
}

function tileHandler(tile) {
    if (clickable && !clickedTiles.includes(tile.id)) {
        clickedTiles.push(tile.id);
        tile.classList.add("is-flipped");
        if (clickedTiles.length == 2) {
            clickable = false;
            let tilesColors = [];
            for (let tileId of clickedTiles) {
                tilesColors.push(document.querySelector(`#${tileId} div.tile-face-back`).style.backgroundColor)
            }
            if (tilesColors[0] == tilesColors[1]) {
                clickable = true;
                clickedTiles = [];
            }
            else {
                setTimeout(function() {
                    for (let tileId of clickedTiles) {
                        document.getElementById(tileId).classList.remove("is-flipped");
                    }
                    clickable = true;
                    clickedTiles = [];
            }, 2000);
            }

        }
    }
}



generateBoard(4, 4);
