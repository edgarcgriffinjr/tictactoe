const X_CLASS = 'x'
const CIR_CLASS = 'circle'
const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementByI('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageText = document.querySelector('[data-winning-message-text]')
let cirTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    cirTurn = false
    cellElements.forEach (cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIR_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHover()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = cirTurn ? CIR_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkwin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else { 
        swapTurns()
        setBoardHover() 
    } 
}

function endGame(draw) {
    if(draw) {
        winningMessageText.innerText = 'Draw!'      
    } else {
        winningMessageText.innerText = `${cirTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIR_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentCLass)
}

function swapTurns() {
    cirTurn = !cirTurn
}

function setBoardHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIR_CLASS)
    if (cirTurn) {
        board.classList.add(CIR_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) { 
    return WIN_COMBOS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
