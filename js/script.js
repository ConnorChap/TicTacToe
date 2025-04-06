import { combosTable } from "./winningCombos.js";

const gameBoardDefault = () => {
    return ['', '', '', 
            '', '', '',
            '', '', ''];
}
    
const TicTacToe = {board: gameBoardDefault(), startGame: false, endGame: false, player: true}

document.getElementById("start").addEventListener("click", startGame);
//document.getElementById("restart").addEventListener("click", restartGame);

function startGame(){
    TicTacToe.board = gameBoardDefault();
    TicTacToe.startGame = true;
    TicTacToe.endGame = false;
    TicTacToe.player = true;

    renderBoard();
}

function renderBoard(){
    let cells = document.getElementsByClassName("cell")
    
    for(let i = 0; i < cells.length; i++){
        cells[i].textContent = TicTacToe.board[i];
        cells[i].addEventListener("click", () => move(i))
    }
}

function move(index){
    if(TicTacToe.endGame || TicTacToe.board[index] !== '') return;

    TicTacToe.board[index] = TicTacToe.player ? 'X': 'O';
    document.getElementById(index).textContent = TicTacToe.board[index]
    TicTacToe.player = !TicTacToe.player;

    let winner = getWinner();

    if(winner !== 'none'){
        TicTacToe.endGame = true;
    }
}

function getWinner(){

    for(let player of ['X', 'O']){
        if(isWinner(player)) return player;
    }
    
    if(TicTacToe.board.every(entry => entry !== '')){
        return 'Cat'
    }

    return 'none'
}

function isWinner(player){
    for(let row of combosTable.rows){
        if(row.every(index => TicTacToe.board[index] === player)) return true;
    }

    for(let col of combosTable.cols){
        if(col.every(index => TicTacToe.board[index] === player)) return true;
    }

    for(let diag of combosTable.diags){
        if(diag.every(index => TicTacToe.board[index] === player)) return true;
    }

    return false;
}

function restartGame(){

}



