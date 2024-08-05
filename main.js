const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let turn = 1; // 1 - X, -1 - O

class Cell {
    constructor(x, y) {
        this.state = 0;
        this.width = 100;
        this.height = 100;
        this.xIndex = x;
        this.yIndex = y;
    }
    draw() {
        if (this.state == 1) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.xIndex * 110, this.yIndex * 110, this.width, this.height);
        } else if (this.state == -1) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.xIndex * 110, this.yIndex * 110, this.width, this.height);
        } else if (this.state == 0) {
            ctx.fillStyle = "white";
            ctx.fillRect(this.xIndex * 110, this.yIndex * 110, this.width, this.height);
        }
    }
}

const board = {
    size: 3,
    width: this.size * 100 + (this.size - 1) * 10,
    height: this.size * 100 + (this.size - 1) * 10,
    map: [],
    draw: function () {
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.width, this.height)
    }
}

const checkValues = (...params) => {
    const first = params[0];
    for (let i = 1; i < params.length; i++) {
        if (first !== params[i]) return null
    }
    return first;
}

const checkRow = () => {
    for (let i = 0; i < board.size; i++) {
        const rowValues = [];
        for (let j = 0; j < board.size; j++) {
            rowValues.push(board.map[i][j].state)
        }
        const checked = checkValues(...rowValues);
        if (checked !== null && checked !== 0) return checked
    }
    return null;
}
const checkCol = () => {
    for (let i = 0; i < board.size; i++) {
        const rowValues = [];
        for (let j = 0; j < board.size; j++) {
            rowValues.push(board.map[j][i].state)
        }
        const checked = checkValues(...rowValues);
        if (checked !== null && checked !== 0) return checked
    }
    return null;
}

const checkDiagonalLeft = () => {
    const rowValues = [];
    for (let i = 0; i < board.size; i++) {
        rowValues.push(board.map[i][i].state)
    }
    const checked = checkValues(...rowValues);
    if (checked !== null && checked !== 0) return checked
    return null;
}

const checkDiagonalRight = () => {
    const rowValues = [];
    for (let i = 0; i < board.size; i++) {
        rowValues.push(board.map[i][board.size - 1 - i].state)
    }
    const checked = checkValues(...rowValues);
    if (checked !== null && checked !== 0) return checked
    return null;
}

const checkIfConnected = () => {
    if(checkRow() !== null){
        switch(checkRow()){
            case 1:
                console.log("X wins")
                break;
            case -1:
                console.log("O wins")
                break;
        }
    }
    if(checkCol() !== null){
        switch(checkCol()){
            case 1:
                console.log("X wins")
                break;
            case -1:
                console.log("O wins")
                break;
        }
    }
    if(checkDiagonalLeft() !== null){
        switch(checkDiagonalLeft()){
            case 1:
                console.log("X wins")
                break;
            case -1:
                console.log("O wins")
                break;
        }
    }
    if(checkDiagonalRight() !== null){
        switch(checkDiagonalRight()){
            case 1:
                console.log("X wins")
                break;
            case -1:
                console.log("O wins")
                break;
        }
    }
}

const init = () => {
    board.width = board.size * 100 + (board.size - 1) * 10
    board.height = board.size * 100 + (board.size - 1) * 10
    canvas.width = board.width;
    canvas.height = board.height;
    board.draw();
    board.map = new Array(board.size);
    for (let i = 0; i < board.size; i++) {
        board.map[i] = new Array(board.size);
        for (let j = 0; j < board.size; j++) {
            board.map[i][j] = new Cell(j, i);
            board.map[i][j].state = 0;
            board.map[i][j].draw();
        }
    }
}

canvas.addEventListener("click", (event) => {
    for (let row = 0; row < board.size; row++) {
        for (let column = 0; column < board.size; column++) {
            if (
                event.offsetX >= column * 110 &&
                event.offsetX <= column * 110 + 100 &&
                event.offsetY >= row * 110 &&
                event.offsetY <= row * 110 + 100 &&
                board.map[row][column].state == 0
            ) {
                board.map[row][column].state = turn;
                turn *= -1;
                board.draw();
                for (let i = 0; i < board.size; i++) {
                    for (let j = 0; j < board.size; j++) {
                        board.map[i][j].draw();
                    }
                }
                checkIfConnected();
            }
        }
    }
})

window.onload = init();