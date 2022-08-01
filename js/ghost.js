'use strict'
const GHOST = '&#9781'
var gGhosts = []
var gIntervalGhosts
var gDeleteGhost
var isDeleted = false
var gGhostEaten = 0

function createGhost(board) {
    // DONE
    var ghost = {
        location: {
            i: 2,
            // i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)

    var ghostHTML = getGhostHTML(ghost)

    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost)


}

function createGhosts(board) {
    gGhosts = []
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }




    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}








function moveGhost(ghost) {
    if(!gGame.isOn) return
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log(nextLocation);

    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === GHOST) return

    


    if (nextCell === POWER) return


    // DONE: hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (!gIsPower) {
            gameOver()
            return
        }
        else {

            var idx = gGhosts.findIndex((ghost) => {
                return ghost.location.i + moveDiff.i === gPacman.location.i &&
                    ghost.location.j + moveDiff.j === gPacman.location.j
            })
            gGhostEaten ++
            gDeleteGhost = gGhosts.splice(idx, 1)
            isDeleted = true
            




        }
    }


    // DONE: moving from current position:
    // DONE: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)





    // DONE: Move the ghost to new location
    // DONE: update the model
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // DONE: update the DOM
    if(isDeleted){
        renderCell(gDeleteGhost[0].location,PACMAN)
        isDeleted = false
    }else
    renderCell(ghost.location, getGhostHTML(ghost))


}




function getMoveDiff() {
    // const randNum = getRandomIntInclusive(1, 100)
    // if (randNum <= 25) {
    //     return { i: 0, j: 1 }
    // } else if (randNum <= 50) {
    //     return { i: -1, j: 0 }
    // } else if (randNum <= 75) {
    //     return { i: 0, j: -1 }
    // } else {
    //     return { i: 1, j: 0 }
    // }

    const randNum = getRandomIntInclusive(1, 4)
    if (randNum === 1) {
        return { i: 0, j: 1 }
    } else if (randNum === 2) {
        return { i: -1, j: 0 }
    } else if (randNum === 3) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}
function getPacmanHTML(ghost) {
    return `<span>${PACMAN}</span>`
}

function removeGhosts(){
    for(var k = 0 ; k < gGhosts.length ; k++){
        gBoard[gGhosts[k].location.i][gGhosts[k].location.j] = gGhosts[k].currCellContent
        renderCell(gGhosts[k].location,gGhosts[k].currCellContent)
        
        
        
        
    }
    gGhosts=[]
    createGhosts(gBoard)
}

