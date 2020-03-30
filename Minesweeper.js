// Khai báo
let board1 = document.getElementById("board");
let flag = []; // dùng để đánh dấu xem ô có mìn
flag.length = 20;
// --------------------------------------------------------------------------------------------------------------
// Khai báo class
let Board = function (rowcount, colcount, mines, board) {
    this.rowcount = rowcount;
    this.colcount = colcount;
    this.mines = mines;
    this.flag = [];
    this.flag.length = this.rowcount;

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
        for (let i = 1; i < this.rowcount-1; i++){
            for (let j = 1; j < this.colcount-1; j++){
                let cell = board.rows[i].cells[j];

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
                            board.rows[0].cells[this.colcount-2].innerHTML = board.rows[board.colcount-2].cells[0].value;
                        }
                        if (board.rows[this.colcount-2].cells[1].value !== "X") {
                            board.rows[this.colcount-2].cells[1].value += 1;
                            board.rows[this.colcount-2].cells[1].innerHTML = board.rows[board.colcount-2].cells[1].value;
                        }
                        if (board.rows[this.colcount-1].cells[1].value !== "X") {
                            board.rows[this.colcount-1].cells[1].value += 1;
                            board.rows[this.colcount-1].cells[1].innerHTML = board.rows[board.colcount-1].cells[1].value;
                        }
                }
                //Góc dưới bên trái
                if(board.rows[0].cells[this.rowcount-1].value === "X") {
                    if (board.rows[this.rowcount-2].cells[0].value !== "X") {
                        board.rows[this.rowcount-2].cells[0].value += 1;
                        board.rows[this.rowcount-2].cells[0].innerHTML = board.rows[this.rowcount-2].cells[0].value;
                    }
                    if (board.rows[this.rowcount-2].cells[1].value !== "X") {
                        board.rows[this.rowcount-2].cells[1].value += 1;
                        board.rows[this.rowcount-2].cells[1].innerHTML = board.rows[1].cells[0].value;
                    }
                    if (board.rows[this.rowcount-1].cells[1].value !== "X") {
                        board.rows[this.rowcount-1].cells[1].value += 1;
                        board.rows[this.rowcount-1].cells[1].innerHTML = board.rows[1].cells[1].value;
                    }
                }
                //Góc dưới bên phải

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
        }
    };

// --------------------------------------------------------------------------------------------------------------
// function checkMine(matrix) {
//     let sum;
//     for (let i = 0; i < 3; i++){
//         for (let j = 0; j < 3; j++){
//             //a[i][j]
//         }
//     }
// }

//--------------------------------------------------------------------------------------------------------------
// Chương trình chính

let GameBoard = new Board(20, 20, 20, board1);
GameBoard.createBoard();
GameBoard.addMines();
GameBoard.checkMines();
