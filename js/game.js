'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER = '🎉'
const CHERRY = '🍒'
var elBoard = document.querySelector('.board-container')
var gRestartButton = document.querySelector('.restart')
var gWinTitle = document.querySelector('.winning-title')
var gBoard
var cherryInterval
const gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard()
    cherryInterval = setInterval(addCherry,15000)
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gRestartButton.style.display = 'none'
    gWinTitle.style.display = 'none'
}


function buildBoard() {
    const size = 10
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            else if (i === 1 && j === 1 || i === 1 && j === 8 || i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = POWER
            }
        }
    }
    
    return board
}



function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff

    //DOM
    document.querySelector('h2 span').innerText = gGame.score
    var food = foodAmount(gBoard)
    if(food === 1 ){
        winGame()
        
    }

    // if(gGame.score === 3){
    //     gameOver()
    //     winTitle.style.display = 'block'
    // } 
}

function gameOver() {
    // TODO

    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '⚰')
    gGame.isOn = false
    gRestartButton.style.display = 'block'


}

function winGame() {
    gGame.isOn = false
    gRestartButton.style.display = 'block'
    gWinTitle.style.display = 'block'
    clearInterval(cherryInterval)
    clearInterval(gIntervalGhosts)
}

function addCherry() {
    if(!gGame.isOn) return
    var emptyCells = getEmptyCell(gBoard)
    


    var idx = getRandomInt(0, emptyCells.length)
    if(emptyCells.length<=0) return
    gBoard[emptyCells[idx].i][emptyCells[idx].j] = CHERRY
    renderCell(emptyCells[idx], CHERRY)

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


function getEmptyCell(board) {
    var emptyCells = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyCells.push({ i, j })



            }

        }

    }
    return emptyCells
}
