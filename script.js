const Gameboard  = function () {
    const array = [" "," "," "," "," "," "," "," "," "]
    let turn = "x"
    return {array, turn}
}
function Player(name, mark) {
    this.name =name
    this.mark = mark
    this.isWinner = false
}

let board = Gameboard()
let p1 = null;
let p2 = null;
let winner = null;

function showText() {
    let str = ''
        if (board.turn == "x") {
        str = `${p1.name}'s turn, you are: X`
    } else { 
        str = `${p2.name}'s turn, you are: O`
    }
    return str
}

function mark (board, spot,spotElement) {
    board.array[spot] = board.turn
    spotElement.classList.add(board.turn === "x" ? "svgCross" : "svgCircle");
   
    board.turn = board.turn=="x" ? "o" :"x"
    document.querySelector('.textContainer').textContent = showText()
    console.log("marking")
    console.log(checkTable(board))
    
}

function printTable(board) {
    console.log(`${board.array[0]} | ${board.array[1]} | ${board.array[2]} `)
    console.log("---------")
    console.log(`${board.array[3]} | ${board.array[4]} | ${board.array[5]} `)
    console.log("---------")
    console.log(`${board.array[6]} | ${board.array[7]} | ${board.array[8]} `)
}

function checkTable(board) {
    let turn = board.turn=="x" ? "o" : "x"
    console.log("checking")
    let win = false
    if (board.array[0] == board.array[1] && board.array[0] == board.array[2] && board.array[0] == turn) win = true
    else if (board.array[3] == board.array[4] && board.array[3] == board.array[5] && board.array[3] == turn) win = true
    else if (board.array[6] == board.array[7] && board.array[6] == board.array[8] && board.array[6] == turn) win = true

    else if (board.array[0] == board.array[3] && board.array[0] == board.array[6] && board.array[0] == turn) win = true
    else if (board.array[1] == board.array[4] && board.array[1] == board.array[7] && board.array[1] == turn) win = true
    else if (board.array[2] == board.array[5] && board.array[2] == board.array[8] && board.array[2] == turn) win = true

    else if (board.array[0] == board.array[4] && board.array[0] == board.array[8] && board.array[0] == turn) win = true
    else if (board.array[2] == board.array[4] && board.array[2] == board.array[6] && board.array[2] == turn) win = true

    if (win) {
        if (turn == "x") winner = p1
        else winner = p2
        announceWinner()
    }
    
}
function announceWinner() {
    document.querySelector('.textContainer').innerHTML = `Congratulations!<br>${winner.name} won the game!`;
    document.querySelectorAll(".spot").forEach(btn => btn.disabled = true);

    const restart = document.createElement("button") 
    restart.classList.add("restart")
    restart.textContent= "Play again"
    document.querySelector('.textContainer').appendChild(restart)
    restart.addEventListener("click",function() {
        const container = document.querySelector(".container")
        document.querySelector("body").removeChild(container)
        board = Gameboard()
        createBoard()
    })


}



function createBoard() {
    const body = document.querySelector("body")
    const container = document.createElement("div")
    container.classList.add("container")
    body.appendChild(container)

    const textContainer = document.createElement("div")
    textContainer.classList.add("textContainer")
    textContainer.textContent= showText()
    container.appendChild(textContainer)

    const boardContainer = document.createElement("div")
    boardContainer.classList.add("board")
    container.appendChild(boardContainer)

    for (let i=0;i<9;i++) {
        const spot = document.createElement("button")
        spot.classList.add("spot")
        boardContainer.appendChild(spot)
        spot.addEventListener("click", function () {
            if (board.array[i] ==" "){
            mark(board,i,spot)
            
            }
        })
    }


}

 document.getElementById("playerForm").addEventListener("submit", function(event) {
    
    event.preventDefault();

    const player1 = document.getElementById("player1").value
    const player2 = document.getElementById("player2").value
    p1 = new Player(player1,"x")
    p2 = new Player(player2,"o")

    const body = document.querySelector('body')
    const playerInfo = document.querySelector('.playerInfo')
    body.removeChild(playerInfo)
    createBoard()

 })