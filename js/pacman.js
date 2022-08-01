'use strict'
const PACMAN = '😷'
var gIsPower = false


var gPacman
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        }
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (gIsPower) {
            // var idx = gGhosts.findIndex((ghost) => {
            //     return ghost.location.i  === gPacman.location.i &&
            //         ghost.location.j  === gPacman.location.j})
            // console.log(idx);
            var ghostDel
            for (var k = 0; k < gGhosts.length; k++) {
                if (gGhosts[k].location.i === nextLocation.i &&
                    gGhosts[k].location.j === nextLocation.j)
                    ghostDel = gGhosts[k]
                gGhosts.splice(k, 1)

            }

            console.log(ghostDel);


            // renderCell(ghostDel.location,PACMAN)



        } else {
            gameOver()
            return
        }
    }




    if (nextCell === FOOD) {
        updateScore(1)


    }
    if (nextCell === CHERRY) {
        updateScore(10)


    }

    if (nextCell === POWER) {


        gIsPower = true
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = 'blue'

        }
        setTimeout(() => {
            clearInterval(gIntervalGhosts)
            removeGhosts()
            gIsPower = false
        }, 5000);
    }


    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation // {i:2 ,j:3}
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)



}





function getNextLocation(eventKeyboard) {
    // TODO: figure out nextLocation

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default:
            break;
    }
    return nextLocation
}


function foodAmount(board) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) {
                count++

            }

        }

    }
    return count
}