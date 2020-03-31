// Khai báo
const DEFAULT_COLS = 20;
const DEFAULT_ROWS = 20;
const DEFAULT_CELL_SIZE = 50;
const DEFAULT_CELL_VALUE = 0;

let board1 = document.getElementById("board");
// --------------------------------------------------------------------------------------------------------------
// Khai báo class
let GameBoard = function (rowcount, colcount, mines, board) {
    this.rowcount = rowcount;
    this.colcount = colcount;
    this.mines = mines;

    this.createBoard = function () {
        for (let i = 0; i < this.rowcount; i++){
            let row = board.insertRow(i);
            for (let j = 0; j < this.colcount; j++){
                let cell = row.insertCell(j);
                cell.width = 30;
                cell.height = 30;
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
                let cell = board.rows[indexX[i]].cells[indexY[i]];
                cell.innerHTML="X";
                cell.value="X";
            }
        }
        for (let i = 0; i < this.rowcount; i++){
            for (let j = 0; j < this.colcount; j++){
                let cell = board.rows[i].cells[j];
                if (cell.value !== "X") {
                    cell.value = 0;
                    //cell.innerHTML = cell.value;
                }
            }
        }
    };
    this.checkMines = function () {

        //Check bom ở góc của GameBoard
        //Góc trên bên trái
        if(board.rows[0].cells[0].value === "X") {
            if (board.rows[0].cells[1].value !== "X") {
                board.rows[0].cells[1].value += 1;
                board.rows[0].cells[1].innerHTML = board.rows[0].cells[1].value;
            }
            if (board.rows[1].cells[0].value !== "X") {
                board.rows[1].cells[0].value += 1;
                board.rows[1].cells[0].innerHTML = board.rows[1].cells[0].value;
            }
            if (board.rows[1].cells[1].value !== "X") {
                board.rows[1].cells[1].value += 1;
                board.rows[1].cells[1].innerHTML = board.rows[1].cells[1].value;
            }
        }
        //Góc trên bên phải
        if(board.rows[0].cells[this.colcount-1].value === "X") {

            if (board.rows[0].cells[this.colcount-2].value !== "X") {
                board.rows[0].cells[this.colcount-2].value += 1;
                board.rows[0].cells[this.colcount-2].innerHTML = board.rows[0].cells[this.colcount-2].value;
            }
            if (board.rows[1].cells[this.colcount-2].value !== "X") {
                board.rows[1].cells[this.colcount-2].value += 1;
                board.rows[1].cells[this.colcount-2].innerHTML = board.rows[1].cells[this.colcount-2].value;
            }
            if (board.rows[1].cells[this.colcount-1].value !== "X") {
                board.rows[1].cells[this.colcount-1].value += 1;
                board.rows[1].cells[this.colcount-1].innerHTML = board.rows[1].cells[this.colcount-1].value;
            }
        }
        //Góc dưới bên trái
        if(board.rows[this.rowcount-1].cells[0].value === "X") {
            if (board.rows[this.rowcount-2].cells[0].value !== "X") {
                board.rows[this.rowcount-2].cells[0].value += 1;
                board.rows[this.rowcount-2].cells[0].innerHTML = board.rows[this.rowcount-2].cells[0].value;
            }
            if (board.rows[this.rowcount-2].cells[1].value !== "X") {
                board.rows[this.rowcount-2].cells[1].value += 1;
                board.rows[this.rowcount-2].cells[1].innerHTML = board.rows[this.rowcount-2].cells[1].value;
            }
            if (board.rows[this.rowcount-1].cells[1].value !== "X") {
                board.rows[this.rowcount-1].cells[1].value += 1;
                board.rows[this.rowcount-1].cells[1].innerHTML = board.rows[this.rowcount-1].cells[1].value;
            }
        }
        //Góc dưới bên phải
        if(board.rows[this.rowcount-1].cells[this.rowcount-1].value === "X") {
            if (board.rows[this.rowcount-2].cells[this.rowcount-1].value !== "X") {
                board.rows[this.rowcount-2].cells[this.rowcount-1].value += 1;
                board.rows[this.rowcount-2].cells[this.rowcount-1].innerHTML = board.rows[this.rowcount-2].cells[this.rowcount-1].value;
            }
            if (board.rows[this.rowcount-2].cells[this.rowcount-2].value !== "X") {
                board.rows[this.rowcount-2].cells[this.rowcount-2].value += 1;
                board.rows[this.rowcount-2].cells[this.rowcount-2].innerHTML = board.rows[this.rowcount-2].cells[this.rowcount-2].value;
            }
            if (board.rows[this.rowcount-1].cells[this.rowcount-2].value !== "X") {
                board.rows[this.rowcount-1].cells[this.rowcount-2].value += 1;
                board.rows[this.rowcount-1].cells[this.rowcount-2].innerHTML = board.rows[this.rowcount-1].cells[this.rowcount-2].value;
            }
        }

        // Check bom ở cạn của GameBoard
        // Bên trên
        for (let i = 1; i < this.colcount-1; i++){
            if(board.rows[0].cells[i].value === "X") {
                if (board.rows[0].cells[i-1].value !== "X") {
                    board.rows[0].cells[i-1].value += 1;
                    board.rows[0].cells[i-1].innerHTML = board.rows[0].cells[i-1].value;
                }
                if (board.rows[0].cells[i+1].value !== "X") {
                    board.rows[0].cells[i+1].value += 1;
                    board.rows[0].cells[i+1].innerHTML = board.rows[0].cells[i+1].value;
                }
                if (board.rows[1].cells[i].value !== "X") {
                    board.rows[1].cells[i].value += 1;
                    board.rows[1].cells[i].innerHTML = board.rows[1].cells[i].value;
                }
                if (board.rows[1].cells[i-1].value !== "X") {
                    board.rows[1].cells[i-1].value += 1;
                    board.rows[1].cells[i-1].innerHTML = board.rows[1].cells[i-1].value;
                }
                if (board.rows[1].cells[i+1].value !== "X") {
                    board.rows[1].cells[i+1].value += 1;
                    board.rows[1].cells[i+1].innerHTML = board.rows[1].cells[i+1].value;
                }
            }
        }
        // Bên dưới
        for (let i = 1; i < this.colcount-1; i++){
            if(board.rows[this.rowcount-1].cells[i].value === "X") {
                if (board.rows[this.rowcount-2].cells[i-1].value !== "X") {
                    board.rows[this.rowcount-2].cells[i-1].value += 1;
                    board.rows[this.rowcount-2].cells[i-1].innerHTML = board.rows[this.rowcount-2].cells[i-1].value;
                }
                if (board.rows[this.rowcount-2].cells[i+1].value !== "X") {
                    board.rows[this.rowcount-2].cells[i+1].value += 1;
                    board.rows[this.rowcount-2].cells[i+1].innerHTML = board.rows[this.rowcount-2].cells[i+1].value;
                }
                if (board.rows[this.rowcount-2].cells[i].value !== "X") {
                    board.rows[this.rowcount-2].cells[i].value += 1;
                    board.rows[this.rowcount-2].cells[i].innerHTML = board.rows[this.rowcount-2].cells[i].value;
                }
                if (board.rows[this.rowcount-1].cells[i-1].value !== "X") {
                    board.rows[this.rowcount-1].cells[i-1].value += 1;
                    board.rows[this.rowcount-1].cells[i-1].innerHTML = board.rows[this.rowcount-1].cells[i-1].value;
                }
                if (board.rows[this.rowcount-1].cells[i+1].value !== "X") {
                    board.rows[this.rowcount-1].cells[i+1].value += 1;
                    board.rows[this.rowcount-1].cells[i+1].innerHTML = board.rows[this.rowcount-1].cells[i+1].value;
                }
            }
        }
        // Bên trái
        for (let i = 1; i < this.colcount-1; i++){
            if(board.rows[i].cells[0].value === "X") {
                if (board.rows[i-1].cells[0].value !== "X") {
                    board.rows[i-1].cells[0].value += 1;
                    board.rows[i-1].cells[0].innerHTML = board.rows[i-1].cells[0].value;
                }
                if (board.rows[i+1].cells[0].value !== "X") {
                    board.rows[i+1].cells[0].value += 1;
                    board.rows[i+1].cells[0].innerHTML = board.rows[i+1].cells[0].value;
                }
                if (board.rows[i].cells[1].value !== "X") {
                    board.rows[i].cells[1].value += 1;
                    board.rows[i].cells[1].innerHTML = board.rows[i].cells[1].value;
                }
                if (board.rows[i-1].cells[1].value !== "X") {
                    board.rows[i-1].cells[1].value += 1;
                    board.rows[i-1].cells[1].innerHTML = board.rows[i-1].cells[1].value;
                }
                if (board.rows[i+1].cells[1].value !== "X") {
                    board.rows[i+1].cells[1].value += 1;
                    board.rows[i+1].cells[1].innerHTML = board.rows[i+1].cells[1].value;
                }
            }
        }
        // Bên phải
        for (let i = 1; i < this.colcount-1; i++){
            if(board.rows[i].cells[this.colcount-1].value === "X") {
                if (board.rows[i-1].cells[this.colcount-1].value !== "X") {
                    board.rows[i-1].cells[this.colcount-1].value += 1;
                    board.rows[i-1].cells[this.colcount-1].innerHTML = board.rows[i-1].cells[this.colcount-1].value;
                }
                if (board.rows[i+1].cells[this.colcount-1].value !== "X") {
                    board.rows[i+1].cells[this.colcount-1].value += 1;
                    board.rows[i+1].cells[this.colcount-1].innerHTML = board.rows[i+1].cells[this.colcount-1].value;
                }
                if (board.rows[i].cells[this.colcount-2].value !== "X") {
                    board.rows[i].cells[this.colcount-2].value += 1;
                    board.rows[i].cells[this.colcount-2].innerHTML = board.rows[i].cells[this.colcount-2].value;
                }
                if (board.rows[i-1].cells[this.colcount-2].value !== "X") {
                    board.rows[i-1].cells[this.colcount-2].value += 1;
                    board.rows[i-1].cells[this.colcount-2].innerHTML = board.rows[i-1].cells[this.colcount-2].value;
                }
                if (board.rows[i+1].cells[this.colcount-2].value !== "X") {
                    board.rows[i+1].cells[this.colcount-2].value += 1;
                    board.rows[i+1].cells[this.colcount-2].innerHTML = board.rows[i+1].cells[this.colcount-2].value;
                }
            }
        }

        //Check bom của các ô giữa GameBoard
        for (let i = 1; i < this.rowcount-1; i++){
            for (let j = 1; j < this.colcount-1; j++){
                let cell = board.rows[i].cells[j];
                if (cell.value === "X"){
                    if (board.rows[i-1].cells[j-1].value !== "X") {
                        board.rows[i-1].cells[j-1].value += 1;
                        board.rows[i-1].cells[j-1].innerHTML = board.rows[i-1].cells[j-1].value;
                    }
                    if (board.rows[i - 1].cells[j].value !== "X") {
                        board.rows[i - 1].cells[j].value += 1;
                        board.rows[i - 1].cells[j].innerHTML = board.rows[i - 1].cells[j].value;
                    }
                    if (board.rows[i - 1].cells[j + 1].value !== "X") {
                        board.rows[i - 1].cells[j + 1].value += 1;
                        board.rows[i - 1].cells[j + 1].innerHTML = board.rows[i - 1].cells[j + 1].value;
                    }

                    if (board.rows[i].cells[j - 1].value !== "X") {
                        board.rows[i].cells[j - 1].value += 1;
                        board.rows[i].cells[j - 1].innerHTML = board.rows[i].cells[j - 1].value;
                    }
                    if (board.rows[i].cells[j + 1].value !== "X") {
                        board.rows[i].cells[j + 1].value += 1;
                        board.rows[i].cells[j + 1].innerHTML = board.rows[i].cells[j + 1].value;
                    }

                    if (board.rows[i + 1].cells[j - 1].value !== "X") {
                        board.rows[i + 1].cells[j - 1].value += 1;
                        board.rows[i + 1].cells[j - 1].innerHTML = board.rows[i + 1].cells[j - 1].value;
                    }
                    if (board.rows[i + 1].cells[j].value !== "X") {
                        board.rows[i + 1].cells[j].value += 1;
                        board.rows[i + 1].cells[j].innerHTML = board.rows[i + 1].cells[j].value;
                    }
                    if (board.rows[i + 1].cells[j + 1].value !== "X") {
                        board.rows[i + 1].cells[j + 1].value += 1;
                        board.rows[i + 1].cells[j + 1].innerHTML = board.rows[i + 1].cells[j + 1].value;
                    }

                    }
                }

            }
    };
    this.gameInit = function () {
        this.createBoard();
        this.addMines();
        this.checkMines();
        for (let i = 0; i < this.rowcount; i++){
            for (let j = 0; j < this.colcount; j++){
                board.rows[i].cells[j].innerHTML = "";
            }
        }
    }
};

// function Cell(x, y) {
//     this.x = x;
//     this.y = y;
//     this.value = VALUE_EMPTY;
//     this.getHtml = function(){
//         let top = x * DEFAULT_CELL_SIZE;
//         let left = y * DEFAULT_CELL_SIZE;
//         let cellHtml = '<div id="cell-'+x+'-'+y+'" onclick="play('+x+','+y+')" class="cell" style="position: absolute; width: '+
//             DEFAULT_CELL_SIZE+'px; height:'+
//             DEFAULT_CELL_SIZE+'px; left:'+
//             left+'px; top:'+
//             top+'px; line-height: '+
//             DEFAULT_CELL_SIZE+'px;"></div>';
//         return cellHtml;
//     };
//
//     this.draw = function () {
//         var cellDiv = document.getElementById("cell-"+x+"-"+y);
//         switch (this.value){
//             case VALUE_X:
//                 cellDiv.innerHTML = "X";
//                 break;
//             case VALUE_O:
//                 cellDiv.innerHTML = "O";
//                 break;
//             default:
//                 cellDiv.innerHTML = "";
//                 break;
//         }
//     }
// }

//--------------------------------------------------------------------------------------------------------------
// Sự kiện chuột
function boardClick(){

}

//function

function minesCount(board){
    let sum = 0;
    for (let i = 0; i < board.rowcount; i++) {
        for (let j = 0; j < board.colcount; j++) {
            if (board.rows[i].cells[j].value === "X"){
                sum++;
            }
        }
    }
    return sum;
}

//--------------------------------------------------------------------------------------------------------------
// Chương trình chính

let gameBoard = new GameBoard(20, 20, 50, board1);
gameBoard.gameInit();

// for (let i = 0; i < gameBoard.rowcount; i++) {
//     for (let j = 0; j < gameBoard.colcount; j++) {
//         console.log(board1.rows[i].cells[j].value);
//     }
// }
//console.log(minesCount(board1));
//document.getElementById("minesAmount").innerHTML = "Mines: " + minesCount(gameBoard);
