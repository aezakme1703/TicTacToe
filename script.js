
function Cell() {
    let value = ''
    const getValue = () => {return value}
    const setValue = (mark) => {
        value = mark
    }
    // Статическая переменная - индекс ячейки
    if (!Cell.counter) {
        Cell.counter = 0
    }
    Cell.counter++
    const cellNumber = Cell.counter
    const getNumber = () => cellNumber

    return {getValue, setValue, getNumber}
}

function GameBoard() {
    // Создание поля
    const board = []
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) { 
            board[i].push(Cell())
        }
    }

    function getBoard() {
        return board
    }

    // Размещение метки
    function placeValue(row, col, value) {
        const chosenCell = board[row][col].getValue()

        if (chosenCell === '') {
            board[row][col].setValue(value)
        }
        else {
            return 0
        }
    }

    // Очистка поля
    function clearBoard(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) { 
                board[i][j] = ''
            }
        }
    }

    return {getBoard, placeValue, clearBoard}
}

function GameController() {
    const game = GameBoard()
    const board = game.getBoard()
    let gameOver = false
    const getGameOver = () => gameOver
    const blockOfCells = []
    const players = 
    [
        {name: 'Лис', mark: '<img class="mark" src="images/fox.png" alt="">'},
        {name: 'Мопс', mark: `<img class="mark" src="images/mops.png" alt="">`}
    ]
    
    let currentPlayer = players[0]
    let gameMessage

    function playRound(row, col) {
        if (gameOver) {
            return 0
        }
        //Проверка на занятость ячейки
        const placeResult = game.placeValue(row, col, currentPlayer.mark)
        if (placeResult === 0) {
            return 0
        }
        
        // Статус игры
        let gameStatus = checkBoard(board, players)

        if (gameStatus === 0) {
            if (currentPlayer === players[0]) {
                currentPlayer = players[1]
            }
            else {
                currentPlayer = players[0]
            }
            gameMessage = `${currentPlayer.name} ходит`

            // changePlayer(currentPlayer)
        }
        else if (gameStatus === 1) {
            gameOver = true
            gameMessage = `${currentPlayer.name} выиграл!!!`
        }
        else if (gameStatus === 2) {
            gameOver = true
            gameMessage = `${currentPlayer.name} выиграл!!!`

        }
        else if (gameStatus === 3) {
            gameOver = true
            gameMessage = ` Ничья🤝`

        }
        return gameMessage
    }

    function checkBoard(board, players) {
        const player1 = players[0].mark
        const player2 = players[1].mark

        if (isWinner(player1, board)) {
            return 1
        }
        else if (isWinner(player2, board)) {
            return 2
        }
        else if (boardIsFull(board)) {
            return 3
        }
        else {
            return 0
        }

    }
    // Проверка на заполненность поля
    function boardIsFull(board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].getValue() === '') {
                    return false
                }
            }
        }
        return true
    }
    // Проверка на победу
    function isWinner(mark, board) {
        if (checkRow(mark, board) || checkColumn(mark, board) || checkMainDiag(mark, board) || checkNotMainDiag(mark, board)) { 
            return true
        }
        return false
    }
    // Проверка всех возможных случаев побед
    function checkRow(mark, board) {
        for (let i = 0; i < 3; i++) {
            let counterOfMarks = 0;
            for (let j = 0; j < 3; j++) {
                if (mark === board[i][j].getValue()) {
                    counterOfMarks++;
                    blockOfCells.push(board[i][j])
                }
                else {
                    blockOfCells.length = 0
                    break;
                }
            }
            if (counterOfMarks === 3) {

                return true;
            }
        }

        return false;
    }
    function checkColumn(mark, board) {
        for (let i = 0; i < 3; i++) {
            let counterOfMarks = 0;
            for (let j = 0; j < 3; j++) {
                if (mark === board[j][i].getValue()) {
                    counterOfMarks++;
                    blockOfCells.push(board[j][i])
                }
                else {
                    blockOfCells.length = 0
                    break;
                }
            }
            if (counterOfMarks === 3) {
                return true;
            }
        }

        return false;
    }
    function checkMainDiag(mark, board) {
        if (mark === board[0][0].getValue() && mark === board[1][1].getValue() && mark === board[2][2].getValue()) {
            blockOfCells.push(board[0][0], board[1][1], board[2][2])
            return true
        }
        blockOfCells.length = 0
        return false
    }
    function checkNotMainDiag(mark, board) {
        if (mark === board[0][2].getValue() && mark === board[1][1].getValue() && mark === board[2][0].getValue()) {
            blockOfCells.push(board[0][2], board[1][1], board[2][0])
            return true
        }
        blockOfCells.length = 0
        return false
    }

    return {board, playRound, blockOfCells, getGameOver};
}


const field = document.querySelector('.field')
const fieldCell = field.querySelectorAll('.field__row-cell')
const gameMessage = document.querySelector('.game-message')
const newGameButton = document.querySelector('.new-game')
const startGameButton = document.querySelector('.start-game')
startGameButton.addEventListener('click', () => {
    fieldCell.forEach(elem => {
        elem.classList.remove('blured')
    })
    // fieldCell.style.filter = 'none'
    field.style.pointerEvents = 'auto'
    startGameButton.classList.add('hide')
    newGameButton.classList.remove('hide')
    gameMessage.classList.remove('hide')
    ShowTheGame()
})
newGameButton.addEventListener('click', () => {
    gameMessage.style.color = '#ffed86'
    field.innerHTML = ''
    field.innerHTML = 
    `
            <div class="field__row">
                <div class="field__row-cell"></div>
                <div class="field__row-cell"></div>
                <div class="field__row-cell"></div>
            </div>
            <div class="field__row">
                <div class="field__row-cell"></div>
                <div class="field__row-cell"></div>
                <div class="field__row-cell"></div>
            </div>
            <div class="field__row">
                <div class="field__row-cell"></div>
                <div class="field__row-cell"></div>
                <div class="field__row-cell"></div>
            </div>
    `
    ShowTheGame()
    
})

function ShowTheGame() {
    const game = GameController()
    const board = game.board
    const boardDom = []
    gameMessage.innerHTML = 'Лис ходит'
    document.querySelectorAll('.field__row').forEach(elem => boardDom.push(elem))
    const cells = boardDom.map(elem => elem.querySelectorAll('.field__row-cell'))
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cells[i][j].addEventListener('click', (event) => {
                const gameMessageCheck = game.playRound(i,j)
                if (gameMessageCheck !== 0) {
                    gameMessage.innerHTML = gameMessageCheck
                }
                
                event.target.innerHTML = board[i][j].getValue()

                if (game.getGameOver()) {
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            if (game.blockOfCells.map(cell => cell.getNumber()).includes(board[i][j].getNumber())) {
                                cells[i][j].classList.add('active')
                            }
                        }
                    }
                }
            })
        }
    }
    
}
