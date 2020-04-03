const cellSize = 40;
const default_Value = 0;
const BoardGameWidth = 20;
const BoardGameHeight = 20;

let Cell = function (x, y) {
    this.x = x;
    this.y = y;
    this.value = default_Value;
    this.check = false;

    this.setValue = function (value) {
        this.value = value;
        return this.value;
    };
    this.drawCell = function () {
        let left = x * cellSize;
        let top = y * cellSize;
        let cell = '<div id="cell-' + x + '-' + y + '" class="cell" ' +
            'onclick="play('+x+','+y+')" style="position: absolute;width: ' + cellSize + 'px;' +
            'height: ' + cellSize + 'px;' + 'left: ' + left + 'px;top:' + top + 'px;' +
            'line-height: ' + cellSize + 'px">';
        return cell;
    };
    this.drawValue = function () {
        let cellDiv = document.getElementById("cell-" + x + "-" + y);
        // if (this.value === "X"){
        //         //cellDiv.innerHTML = "<img src=\"img/minesweeper-the-westing-game-angry-birds-what-s-up-bar-grill-bomb-png.jpg\" height=\"30\" width=\"35\"/>";
        //         cellDiv.innerHTML = this.value;
        // }
            if (this.value !== 0) {
            cellDiv.innerHTML = this.value;
        }else {
            cellDiv.innerHTML = "";
        }
            cellDiv.style.backgroundColor = "lightblue";
            this.check = true;
        //}
    }
};
let boardGame = function (cols,rows,elementId, mines) {
    this.width = cols;
    this.height = rows;
    this.elementId = elementId;
    this.mines = mines;
    this.cells = [];
    this.flagModeOn = false;
    this.drawBoard = function () {
        let gameBoardDiv = document.getElementById(this.elementId);
        for(let i = 0; i < this.width; i++){
            let row = [];
            this.cells.push(row);
            for(let j = 0; j < this.height; j++){
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.drawCell();
            }
        }
    };

    this.addMines = function () {
        let indexX = [];
        let indexY = [];
        mines.length = this.mines;
        indexX.length = this.mines;
        indexY.length = this.mines;
        for (let i = 0; i < this.mines; i++) {
            indexX[i] = Math.floor(Math.random() * 20);
            indexY[i] = Math.floor(Math.random() * 20);
        }
        for (let i = 0; i < this.mines; i++){
            for (let j = 0; j < 2; j++){
                let cell = this.cells[indexX[i]][indexY[i]];
                cell.setValue("X");
            }
        }
        console.log(this.cells);
    };

    this.checkMines = function (x,y) {
        //Check bom ở góc của GameBoard
        //Góc trên bên trái
        if(this.cells[0][0].value === "X") {
            if (this.cells[0][1].value !== "X") {
                this.cells[0][1].value += 1;

            }
            if (this.cells[1][0].value !== "X") {
                this.cells[1][0].value += 1;
            }
            if (this.cells[1][1].value !== "X") {
                this.cells[1][1].value += 1;

            }
        }
        //Góc trên bên phải
        if(this.cells[0][this.width-1].value === "X") {

            if (this.cells[0][this.width-2].value !== "X") {
                this.cells[0][this.width-2].value += 1;

            }
            if (this.cells[1][this.width-2].value !== "X") {
                this.cells[1][this.width-2].value += 1;
            }
            if (this.cells[1][this.width-1].value !== "X") {
                this.cells[1][this.width-1].value += 1;
            }
        }
        //Góc dưới bên trái
        if(this.cells[this.height-1][0].value === "X") {
            if (this.cells[this.height-2][0].value !== "X") {
                this.cells[this.height-2][0].value += 1;
            }
            if (this.cells[this.height-2][1].value !== "X") {
                this.cells[this.height-2][1].value += 1;
            }
            if (this.cells[this.height-1][1].value !== "X") {
                this.cells[this.height-1][1].value += 1;
            }
        }
        //Góc dưới bên phải
        if(this.cells[this.height-1][this.height-1].value === "X") {
            if (this.cells[this.height-2][this.height-1].value !== "X") {
                this.cells[this.height-2][this.height-1].value += 1;
            }
            if (this.cells[this.height-2][this.height-2].value !== "X") {
                this.cells[this.height-2][this.height-2].value += 1;
            }
            if (this.cells[this.height-1][this.height-2].value !== "X") {
                this.cells[this.height-1][this.height-2].value += 1;
            }
        }

        // Check bom ở cạnh của GameBoard
        // Bên trên
        for (let i = 1; i < this.width-1; i++){
            if(this.cells[0][i].value === "X") {
                if (this.cells[0][i-1].value !== "X") {
                    this.cells[0][i-1].value += 1;
                }
                if (this.cells[0][i+1].value !== "X") {
                    this.cells[0][i+1].value += 1;
                }
                if (this.cells[1][i].value !== "X") {
                    this.cells[1][i].value += 1;
                }
                if (this.cells[1][i-1].value !== "X") {
                    this.cells[1][i-1].value += 1;
                }
                if (this.cells[1][i+1].value !== "X") {
                    this.cells[1][i+1].value += 1;
                }
            }
        }
        // Bên dưới
        for (let i = 1; i < this.width-1; i++){
            if(this.cells[this.height-1][i].value === "X") {
                if (this.cells[this.height-2][i-1].value !== "X") {
                    this.cells[this.height-2][i-1].value += 1;
                }
                if (this.cells[this.height-2][i+1].value !== "X") {
                    this.cells[this.height-2][i+1].value += 1;
                }
                if (this.cells[this.height-2][i].value !== "X") {
                    this.cells[this.height-2][i].value += 1;
                }
                if (this.cells[this.height-1][i-1].value !== "X") {
                    this.cells[this.height-1][i-1].value += 1;
                }
                if (this.cells[this.height-1][i+1].value !== "X") {
                    this.cells[this.height-1][i+1].value += 1;
                }
            }
        }
        // Bên trái
        for (let i = 1; i < this.width-1; i++){
            if(this.cells[i][0].value === "X") {
                if (this.cells[i-1][0].value !== "X") {
                    this.cells[i-1][0].value += 1;
                }
                if (this.cells[i+1][0].value !== "X") {
                    this.cells[i+1][0].value += 1;
                }
                if (this.cells[i][1].value !== "X") {
                    this.cells[i][1].value += 1;
                }
                if (this.cells[i-1][1].value !== "X") {
                    this.cells[i-1][1].value += 1;
                }
                if (this.cells[i+1][1].value !== "X") {
                    this.cells[i+1][1].value += 1;
                }
            }
        }
        // Bên phải
        for (let i = 1; i < this.width-1; i++){
            if(this.cells[i][this.width-1].value === "X") {
                if (this.cells[i-1][this.width-1].value !== "X") {
                    this.cells[i-1][this.width-1].value += 1;
                }
                if (this.cells[i+1][this.width-1].value !== "X") {
                    this.cells[i+1][this.width-1].value += 1;
                }
                if (this.cells[i][this.width-2].value !== "X") {
                    this.cells[i][this.width-2].value += 1;
                }
                if (this.cells[i-1][this.width-2].value !== "X") {
                    this.cells[i-1][this.width-2].value += 1;
                }
                if (this.cells[i+1][this.width-2].value !== "X") {
                    this.cells[i+1][this.width-2].value += 1;
                }
            }
        }

        //Check bom ở giữa gamboard
        for (let i = 1; i < this.height-1; i++){
            for (let j = 1; j < this.width-1; j++){
                let cell = this.cells[i][j];
                if (cell.value === "X"){
                    if (this.cells[i-1][j-1].value !== "X") {
                        this.cells[i-1][j-1].value += 1;
                    }
                    if (this.cells[i - 1][j].value !== "X") {
                        this.cells[i - 1][j].value += 1;
                    }
                    if (this.cells[i - 1][j + 1].value !== "X") {
                        this.cells[i - 1][j + 1].value += 1;
                    }
                    if (this.cells[i][j - 1].value !== "X") {
                        this.cells[i][j - 1].value += 1;
                    }
                    if (this.cells[i][j + 1].value !== "X") {
                        this.cells[i][j + 1].value += 1;
                    }
                    if (this.cells[i + 1][j - 1].value !== "X") {
                        this.cells[i + 1][j - 1].value += 1;
                    }
                    if (this.cells[i + 1][j].value !== "X") {
                        this.cells[i + 1][j].value += 1;
                    }
                    if (this.cells[i + 1][j + 1].value !== "X") {
                        this.cells[i + 1][j + 1].value += 1;
                    }
                }
            }
        }
    };

    this.gameInit = function (x,y) {
        let gameBoardDiv = document.getElementById(this.elementId);
        this.drawBoard();
        this.addMines();
        this.checkMines(x,y);
    };

    this.openGrid = function () {
        // Mở các góc của grid
        // Góc trên trái
        if (this.cells[0][0].check === true && this.cells[0][0].value === 0) {
            if (this.cells[0][1].check === false) {
                this.cells[0][1].drawValue();
            }
            if (this.cells[1][0].check === false) {
                this.cells[1][0].drawValue();
            }
            if (this.cells[1][1].check === false) {
                this.cells[1][1].drawValue();
            }
        }
        // Góc dưới trái
        if (this.cells[0][this.width-1].check === true && this.cells[0][this.width-1].value === 0) {
            if (this.cells[0][this.width-2].check === false) {
                this.cells[0][this.width-2].drawValue();
            }
            if (this.cells[1][this.width-1].check === false) {
                this.cells[1][this.width-1].drawValue();
            }
            if (this.cells[1][this.width-2].check === false) {
                this.cells[1][this.width-2].drawValue();
            }
        }
        // Góc trên phải
        if (this.cells[this.width-1][0].check === true && this.cells[this.width-1][0].value === 0) {
            if (this.cells[this.width-2][0].check === false) {
                this.cells[this.width-2][0].drawValue();
            }
            if (this.cells[this.width-1][1].check === false) {
                this.cells[this.width-1][1].drawValue();
            }
            if (this.cells[this.width-2][1].check === false) {
                this.cells[this.width-2][1].drawValue();
            }
        }
        // Góc dưới phải
        if (this.cells[this.width-1][this.width-1].check === true && this.cells[this.width-1][this.width-1].value === 0) {
            if (this.cells[this.width-1][this.width-2].check === false) {
                this.cells[this.width-1][this.width-2].drawValue();
            }
            if (this.cells[this.width-2][this.width-1].check === false) {
                this.cells[this.width-2][this.width-1].drawValue();
            }
            if (this.cells[this.width-2][this.width-2].check === false) {
                this.cells[this.width-2][this.width-2].drawValue();
            }
        }

        // Mở các cạnh của grid
        // Cạnh phải
        for (let j = 1; j < this.width-1; j++) {
            if (this.cells[0][j].check === true && this.cells[0][j].value === 0) {
                if (this.cells[0][j - 1].check === false) {
                    this.cells[0][j - 1].drawValue();
                }
                if (this.cells[0][j + 1].check === false) {
                    this.cells[0][j + 1].drawValue();
                }
                if (this.cells[1][j - 1].check === false) {
                    this.cells[1][j - 1].drawValue();
                }
                if (this.cells[1][j].check === false) {
                    this.cells[1][j].drawValue();
                }
                if (this.cells[1][j + 1].check === false) {
                    this.cells[1][j + 1].drawValue();
                }
            }
        }
        // Cạnh trái
        for (let j = 1; j < this.width-1; j++) {
                if (this.cells[this.width - 1][j].check === true && this.cells[this.width - 1][j].value === 0) {
                    if (this.cells[this.width - 1][j - 1].check === false) {
                        this.cells[this.width - 1][j - 1].drawValue();
                    }
                    if (this.cells[this.width - 1][j + 1].check === false) {
                        this.cells[this.width - 1][j + 1].drawValue();
                    }
                    if (this.cells[this.width - 2][j - 1].check === false) {
                        this.cells[this.width - 2][j - 1].drawValue();
                    }
                    if (this.cells[this.width - 2][j].check === false) {
                        this.cells[this.width - 2][j].drawValue();
                    }
                    if (this.cells[this.width - 2][j + 1].check === false) {
                        this.cells[this.width - 2][j + 1].drawValue();
                    }
                }
            }
        // Cạnh trên
        for (let i = 1; i < this.height-1; i++) {
            if (this.cells[i][0].check === true && this.cells[i][0].value === 0) {
                if (this.cells[i-1][0].check === false) {
                    this.cells[i-1][0].drawValue();
                }
                if (this.cells[i+1][0].check === false) {
                    this.cells[i+1][0].drawValue();
                }
                if (this.cells[i-1][1].check === false) {
                    this.cells[i-1][1].drawValue();
                }
                if (this.cells[i][1].check === false) {
                    this.cells[i][1].drawValue();
                }
                if (this.cells[i+1][1].check === false) {
                    this.cells[i+1][1].drawValue();
                }
            }
        }
        // Cạnh dưới
        for (let i = 1; i < this.height-1; i++) {
            if (this.cells[i][this.height-1].check === true && this.cells[i][this.height-1].value === 0) {
                if (this.cells[i-1][this.height-1].check === false) {
                    this.cells[i-1][this.height-1].drawValue();
                }
                if (this.cells[i+1][this.height-1].check === false) {
                    this.cells[i+1][this.height-1].drawValue();
                }
                if (this.cells[i-1][this.height-2].check === false) {
                    this.cells[i-1][this.height-2].drawValue();
                }
                if (this.cells[i][this.height-2].check === false) {
                    this.cells[i][this.height-2].drawValue();
                }
                if (this.cells[i+1][this.height-2].check === false) {
                    this.cells[i+1][this.height-2].drawValue();
                }
            }
        }

        // Mở phần giữa của grid
        for (let i = 1; i < this.height-1; i++){
            for (let j = 1; j < this.width-1;j++){
                if (this.cells[i][j].check === true && this.cells[i][j].value === 0) {
                    if (this.cells[i-1][j-1].check === false) {
                        this.cells[i - 1][j - 1].drawValue();
                    }
                    if (this.cells[i-1][j].check === false) {
                        this.cells[i - 1][j].drawValue();
                    }
                    if (this.cells[i-1][j+1].check === false) {
                        this.cells[i - 1][j + 1].drawValue();
                    }
                    if (this.cells[i][j-1].check === false) {
                        this.cells[i][j - 1].drawValue();
                    }
                    if (this.cells[i][j+1].check === false) {
                        this.cells[i][j + 1].drawValue();
                    }
                    if (this.cells[i+1][j-1].check === false) {
                        this.cells[i + 1][j - 1].drawValue();
                    }
                    if (this.cells[i+1][j].check === false) {
                        this.cells[i + 1][j].drawValue();
                    }
                    if (this.cells[i+1][j+1].check === false) {
                        this.cells[i + 1][j + 1].drawValue();
                    }
                }
            }
        }
        this.openGrid();
    };

    this.flagMode = function () {
        if (this.flagModeOn === true) {
            this.flagModeOn = false;
            document.getElementById("flag").style.backgroundColor = "lightgray";
        }else
        //if (this.flagModeOn === false)
        {
            this.flagModeOn = true;
            document.getElementById("flag").style.backgroundColor = "red";
        }
    };

    this.play = function (x, y) {
        let cell = this.cells[x][y];
        if (this.flagModeOn === true){// && cell.check === false){
            if (cell.check === false){
                document.getElementById("cell-" + x + "-" + y).innerHTML = "<img src=\"img/44-448302_flag-icon-red-red-flag-icon-transparent-clipart.png\" height=\"40\" width=\"40\"/>";
            }else{
                // this.cells[x-1][y-1].drawValue();
                // this.cells[x-1][y].drawValue();
                // this.cells[x-1][y+1].drawValue();
                // this.cells[x][y-1].drawValue();
                // this.cells[x][y+1].drawValue();
                // this.cells[x+1][y-1].drawValue();
                // this.cells[x+1][y].drawValue();
                // this.cells[x+1][y+1].drawValue();
            }
        }
        if (this.flagModeOn === false){
            cell.drawValue();
            if (cell.value === "X"){
                alert("Ối dồi ôi mìn, thua rồi !");
                location.reload(true);
            }
            if (cell.value !== "X"){
                if (cell.value === 0) {
                    this.openGrid();
                }
                cell.drawValue();
            }
            let sumPlay = 0;
            let sumMines = 0;

            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (this.cells[i][j].value === "X"){
                        sumMines++;
                    }
                    if (this.cells[i][j].check){
                        sumPlay++;
                    }
                }
            }
            if (sumPlay === this.width*this.height-sumMines){
                alert("Thắng rồi, khá lắm con trai !");
                for (let i = 0; i < this.height; i++) {
                    for (let j = 0; j < this.width; j++) {
                        if (this.cells[i][j].value === "X") {
                            document.getElementById("cell-" + i + "-" + j).innerHTML = "<img src=\"img/minesweeper-the-westing-game-angry-birds-what-s-up-bar-grill-bomb-png.jpg\" height=\"40\" width=\"40\"/>";
                            //this.cells[i][j].innerHTML = "X";
                        }
                    }
                }
            }
            document.getElementById("score").innerHTML = "Score: " + sumPlay + "<button onclick=\"restart()\" style=\"float: right; background-color: lightgray\">Restart</button>\n" +
                "        <button id=\"flag\" onclick=\"flagsMode()\" style=\"float: right; background-color: lightgray\">Flag</button>";
            console.log(sumMines);
        }

    };
};

//----------------------------------------------FUNCTIONS-----------------------------------------------
function play(x,y) {
    gameBoard.play(x, y);
}
function restart() {
    location.reload(true);
}
function flagsMode(){
    gameBoard.flagMode();
}
//------------------------------------------CHƯƠNG TRÌNH CHÍNH------------------------------------------
gameBoard = new boardGame(BoardGameHeight, BoardGameWidth, "boardgame", 60);
gameBoard.gameInit();

