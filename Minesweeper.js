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
        // let cellTopRight = document.getElementById("cell-" + x-1 + "-" + y);
        // let cellTop = document.getElementById("cell-" + x-1 + "-" + y);
        // let cellTopLeft = document.getElementById("cell-" + x-1 + "-" + y);
        if (cellDiv.value !== ""){
            cellDiv.innerHTML = this.value;
            cellDiv.style.backgroundColor = "lightblue";
            // if (cellDiv.value === 0){
            //     cellTopLeft.drawValue();
            //     cellTop.drawValue();
            //     cellTopRight.drawValue();
            //     // this.cells[x][y-1].drawValue();
            //     // this.cells[x][y+1].drawValue();
            //     // this.cells[x+1][y-1].drawValue();
            //     // this.cells[x+1][y].drawValue();
            //     // this.cells[x+1][y+1].drawValue();
            // }
            this.check = true;
        }
    }
};
let boardGame = function (cols,rows,elementId, mines) {
    this.width = cols;
    this.height = rows;
    this.elementId = elementId;
    this.mines = mines;
    this.cells = [];
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
        for (let i = 0; i < this.height; i++){
            for (let j = 0; j < this.width;j++){
                if (this.cells[i][j].check === true && this.cells[i][j].value === 0) {
                    this.cells[i-1][j-1].drawValue();
                    this.cells[i-1][j].drawValue();
                    this.cells[i-1][j+1].drawValue();
                    this.cells[i][j-1].drawValue();
                    this.cells[i][j+1].drawValue();
                    this.cells[i+1][j-1].drawValue();
                    this.cells[i+1][j].drawValue();
                    this.cells[i+1][j+1].drawValue();
                }
            }
        }
        this.openGrid();
        // if (this.cells[x][y].value === 0){
        //     this.cells[x-1][y-1].drawValue();
        //     this.cells[x-1][y].drawValue();
        //     this.cells[x-1][y+1].drawValue();
        //     this.cells[x][y-1].drawValue();
        //     this.cells[x][y+1].drawValue();
        //     this.cells[x+1][y-1].drawValue();
        //     this.cells[x+1][y].drawValue();
        //     this.cells[x+1][y+1].drawValue();
        //
        //     for (let i = 0; i < this.height; i++){
        //         for (let j = 0; j < this.width;j++){
        //             if (this.cells[i][j].check === true && this.cells[i][j].value === 0){
        //                 this.openGrid(i,j);
        //             }else this.cells[i][j].drawValue()
        //         }
        //     }
        //
        // }
    };

    this.play = function (x, y) {
        let cell = this.cells[x][y];
        cell.drawValue();
        if (cell.value === "X"){
            alert("Game Over, dẫm vào mìn rồi !");
            location.reload(true);
        }
        if (cell.value !== "X"){
            if (cell.value === 0) {
                this.openGrid(x, y);
            }
            cell.drawValue();
        }
        // cell.check = true;
        let sum = 0;
        if (sum === this.width*this.height - this.mines-1){
            alert("Thắng rồi nhé, chúc mừng nhé con trai !")
        }
        for (let i = 1; i < this.height-1; i++) {
            for (let j = 1; j < this.width - 1; j++) {
                if (this.cells[i][j].check){
                    sum++;
                }
            }
        }
        document.getElementById("score").innerHTML = "Score: " + sum;
    };
};

gameBoard = new boardGame(BoardGameHeight, BoardGameWidth, "boardgame", 50);
gameBoard.gameInit();

//function openGrid(x,y, cells){
    //let cells=[];
    //let cell = cells[x][y];
    // if (cells[x][y].value === 0){
    //     cells[x-1][y-1].drawValue();
    //     cells[x-1][y].drawValue();
    //     cells[x-1][y+1].drawValue();
    //     cells[x][y-1].drawValue();
    //     cells[x][y+1].drawValue();
    //     cells[x+1][y-1].drawValue();
    //     cells[x+1][y].drawValue();
    //     cells[x+1][y+1].drawValue();
    // }
    // if (cells[x-1][y-1].value === 0){
    //     openGrid(x-1, y-1);
    // }
    // if (cells[x-1][y].value === 0){
    //     openGrid(x-1, y);
    // }
    // if (cells[x-1][y+1].value === 0){
    //     openGrid(x-1, y+1);
    // }
    // if (cells[x][y-1].value === 0){
    //     openGrid(x, y-1);
    // }
    // if (cells[x][y+1].value === 0){
    //     openGrid(x, y+1);
    // }
    // if (cells[x+1][y-1].value === 0){
    //     openGrid(x+1, y-1);
    // }
    // if (cells[x+1][y].value === 0){
    //     openGrid(x+1, y);
    // }
    // if (cells[x+1][y+1].value === 0){
    //     openGrid(x+1, y+1);
    // }

//}
function play(x,y) {
    gameBoard.play(x, y);
}


