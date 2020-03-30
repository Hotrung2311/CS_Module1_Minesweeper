// Khai báo
let board = document.getElementById("board");
let flag; // dùng để đánh dấu xem ô có mìn
//--------------------------------------------------------------------------------------------------------------
// Chương trình chính
createBoard();
console.log(getRandomIndex(20));
// --------------------------------------------------------------------------------------------------------------
// Function
function createBoard(){
    //board.innerHTML="1";
    for (let i= 0; i<20;i++){
        let row = board.insertRow(i);
        for (let j = 0; j<20; j++){
            let cell = row.insertCell(j);
            cell.width = 40;
            cell.height = 40;
            //cell.innerHTML=j;
            flag = false
        }
    }
}
function getRandomIndex(amount){
    let mines = [];
    mines.length = amount;
    for (let i = 0; i<amount; i++) {
        mines[0][i] = Math.floor(Math.random() * 20);
        mines[1][i] = Math.floor(Math.random() * 20);
    }
    return mines;

}
