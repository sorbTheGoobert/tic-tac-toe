const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let turn = 1; // 1 - X, -1 - O
let gameEnded = false;
let x_score = 0;
let o_score = 0;
const x_score_display = document.getElementById("score1");
const o_score_display = document.getElementById("score2");

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
            // ctx.fillStyle = "red";
            // ctx.fillRect(this.xIndex * 110, this.yIndex * 110, this.width, this.height);
            ctx.fillStyle = "white";
            ctx.fillRect(this.xIndex * 110, this.yIndex * 110, this.width, this.height);
            ctx.fillStyle = "red";
            ctx.font = "100px Arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText("X", this.xIndex * 110 + 50, this.yIndex * 110 + 58)
        } else if (this.state == -1) {
            // ctx.fillStyle = "blue";
            // ctx.fillRect(this.xIndex * 110, this.yIndex * 110, this.width, this.height);
            ctx.fillStyle = "white";
            ctx.fillRect(this.xIndex * 110, this.yIndex * 110, this.width, this.height);
            ctx.fillStyle = "blue";
            ctx.font = "100px Arial";
            ctx.textBaseline = "middle"
            ctx.textAlign = "center";
            ctx.fillText("O", this.xIndex * 110 + 50, this.yIndex * 110 + 58)
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
        if (checked !== null && checked !== 0) {
            ctx.beginPath();
            ctx.moveTo(50, i * 110 + 48);
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            if (checked == 1) {
                ctx.strokeStyle = "red";
            } else {
                ctx.strokeStyle = "blue";
            }
            ctx.lineTo((board.size - 1) * 110 + 50, i * 110 + 48);
            ctx.stroke();
            return checked
        }
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
        if (checked !== null && checked !== 0) {
            ctx.beginPath();
            ctx.moveTo(i * 110 + 50, 48);
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            if (checked == 1) {
                ctx.strokeStyle = "red";
            } else {
                ctx.strokeStyle = "blue";
            }
            ctx.lineTo(i * 110 + 50, (board.size - 1) * 110 + 48);
            ctx.stroke();
            return checked
        }
    }
    return null;
}

const checkDiagonalLeft = () => {
    const rowValues = [];
    for (let i = 0; i < board.size; i++) {
        rowValues.push(board.map[i][i].state)
    }
    const checked = checkValues(...rowValues);
    if (checked !== null && checked !== 0) {
        ctx.beginPath();
        ctx.moveTo(50, 48);
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        if (checked == 1) {
            ctx.strokeStyle = "red";
        } else {
            ctx.strokeStyle = "blue";
        }
        ctx.lineTo((board.size - 1) * 110 + 50, (board.size - 1) * 110 + 48);
        ctx.stroke();
        return checked
    }
    return null;
}

const checkDiagonalRight = () => {
    const rowValues = [];
    for (let i = 0; i < board.size; i++) {
        rowValues.push(board.map[i][board.size - 1 - i].state)
    }
    const checked = checkValues(...rowValues);
    if (checked !== null && checked !== 0) {
        ctx.beginPath();
        ctx.moveTo((board.size - 1) * 110 + 50, 48);
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        if (checked == 1) {
            ctx.strokeStyle = "red";
        } else {
            ctx.strokeStyle = "blue";
        }
        ctx.lineTo(50, (board.size - 1) * 110 + 48);
        ctx.stroke();
        return checked
    }
    return null;
}

const checkAll = () => {
    const rowValues = [];
    for (let i = 0; i < board.size; i++) {
        for (let j = 0; j < board.size; j++) {
            rowValues.push(board.map[i][j].state)
        }
    }
    if (rowValues.filter(function (element) { return element == 0 }).length == 0) {
        return true
    }
    return null;
}

const checkIfConnected = () => {
    if (checkRow() !== null) {
        switch (checkRow()) {
            case 1:
                x_score++;
                x_score_display.innerHTML = x_score;
                break;
            case -1:
                o_score++;
                o_score_display.innerHTML = o_score;
                break;
        }
        gameEnded = true;
    }
    if (checkCol() !== null) {
        switch (checkCol()) {
            case 1:
                x_score++;
                x_score_display.innerHTML = x_score;
                break;
            case -1:
                o_score++;
                o_score_display.innerHTML = o_score;
                break;
        }
        gameEnded = true;
    }
    if (checkDiagonalLeft() !== null) {
        switch (checkDiagonalLeft()) {
            case 1:
                x_score++;
                x_score_display.innerHTML = x_score;
                break;
            case -1:
                o_score++;
                o_score_display.innerHTML = o_score;
                break;
        }
        gameEnded = true;
    }
    if (checkDiagonalRight() !== null) {
        switch (checkDiagonalRight()) {
            case 1:
                x_score++;
                x_score_display.innerHTML = x_score;
                break;
            case -1:
                o_score++;
                o_score_display.innerHTML = o_score;
                break;
        }
        gameEnded = true;
    }
    if (checkAll()) {
        init();
    }
}

const init = () => {
    gameEnded = false;
    let randomeizer;
    if (Math.floor(Math.random() * 2)) {
        randomeizer = -1
    } else {
        randomeizer = 1;
    }
    turn = 1 * randomeizer;
    board.size = document.getElementById("selection").value;
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

canvas.addEventListener("mousedown", (event) => {
    if (!gameEnded) {
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
                    break;
                }
            }
        }
    } else {
        init();
    }
})

window.onload = init();