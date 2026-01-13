const board = document.querySelector(".board");
const gameStatus = document.querySelector(".game-status");
const restartButton = document.querySelector(".restart-btn");
const whiteScoreElement = document.querySelector(".scoreW");
const blackScoreElement = document.querySelector(".scoreB");
const eenTerugButton = document.querySelector(".eenTerug");
const redoButton = document.querySelector(".redo-btn");
const rows = 8;
const cols = 8;
let undoStack = [];
let redoStack = [];
let lastGameStatus = null;
let whitescore = 0;
let blackscore = 0;
let selectedPiece = null;
let currentPlayer = 'white';
let whitePieces = 12;
let blackPieces = 12;
restartButton.style.display = 'none';
function createBoard() {
    board.innerHTML = "";
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const square = document.createElement("div");
            square.classList.add('square');
            square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = row;
            square.dataset.col = col;

            if ((row + col) % 2 !== 0 && (row < 3 || row > 4)) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.classList.add(row < 3 ? 'black' : 'white');
                piece.dataset.row = row;
                piece.dataset.col = col;

                square.appendChild(piece);

            }
            square.addEventListener('click', handleSquareClick);
            board.appendChild(square);

        }
    }
}
createBoard();
updateGameStatus();
whiteScoreElement.innerText = `White: ${whitescore}`;
blackScoreElement.innerText = `Black: ${blackscore}`;



function handleSquareClick(e) {
    const square = e.target.classList.contains('square') ? e.target : e.target.parentElement;
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    if (selectedPiece) {
        if (square.firstChild === selectedPiece) {
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
        } else if (!square.firstChild && isValidMove(selectedPiece, row, col)) {
            movePiece(selectedPiece, row, col);
        }
    } else if (square.firstChild && square.firstChild.classList.contains(currentPlayer)) {
        const forced = getAvailableCaptures(currentPlayer);
        const thisPieceCaptures = getAvailableCapturesForPiece(square.firstChild);
        if (forced.length === 0 || thisPieceCaptures.length > 0) {
            selectPiece(square.firstChild);
        }
    }
}

function selectPiece(piece) {
    if (selectedPiece) {
        selectedPiece.classList.remove('selected');
    }
    piece.classList.add('selected');
    selectedPiece = piece;
}
function isValidMove(piece, row, col) {
    const oldRow = parseInt(piece.dataset.row);
    const oldCol = parseInt(piece.dataset.col);
    const moveRow = row - oldRow;
    const moveCol = col - oldCol;

    const captureMoves = getAvailableCaptures(currentPlayer);
    const captures = getAvailableCapturesForPiece(piece);
    const isCapture = captures.some(c => c.row === row && c.col === col);

    if (captureMoves.length > 0 && !isCapture) {
        return false;
    }

    if (!piece.classList.contains('king') && !isCapture) {
        if (
            (currentPlayer === 'white' && moveRow > 0) ||
            (currentPlayer === 'black' && moveRow < 0)
        ) {
            return false;
        }
        return Math.abs(moveRow) === 1 && Math.abs(moveCol) === 1;
    }

    if (piece.classList.contains('king') && !isCapture) {
        return (
            Math.abs(moveRow) === Math.abs(moveCol) &&
            isDiagonalPathClear(oldRow, oldCol, row, col)
        );
    }

    return isCapture;
}
function isDiagonalPathClear(fromRow, fromCol, toRow, toCol) {
    const rowStep = toRow > fromRow ? 1 : -1;
    const colStep = toCol > fromCol ? 1 : -1;

    let r = fromRow + rowStep;
    let c = fromCol + colStep;

    while (r !== toRow && c !== toCol) {
        const square = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
        if (square.firstChild) {
            return false;
        }
        r += rowStep;
        c += colStep;
    }
    return true;
}
function movePiece(piece, row, col) {
    saveGameStatus();
    const targetSquare = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
    const captures = getAvailableCapturesForPiece(piece);
    const chosen = captures.find(c => c.row === row && c.col === col);

    if (chosen) {
        const enemySquare = document.querySelector(`[data-row='${chosen.captureRow}'][data-col='${chosen.captureCol}']`);
        enemySquare.removeChild(enemySquare.firstChild);

        if (currentPlayer === 'white') {
            whitescore++;
            whiteScoreElement.innerText = `White: ${whitescore}`;
            blackPieces--;

        } else {
            blackscore++;
            blackScoreElement.innerText = `Black: ${blackscore}`;
            whitePieces--;
        }
        performMove(piece, targetSquare, row, col);

        const more = getAvailableCapturesForPiece(piece);
        if (more.length > 0) {
            selectPiece(piece);
            return;
        }
    } else {
        performMove(piece, targetSquare, row, col);
    }
    endTurn();
}

function performMove(piece, targetSquare, row, col) {
    targetSquare.appendChild(piece);
    piece.dataset.row = row;
    piece.dataset.col = col;
    piece.classList.remove('selected');
    selectedPiece = null;

    if ((row === 0 && currentPlayer === 'white') || (row === 7 && currentPlayer === 'black')) {
        piece.classList.add('king');
    }

    checkWinCondition();
}

function getAvailableCaptures(player) {
    let captures = [];
    const pieces = document.querySelectorAll(`.piece.${player}`);
    pieces.forEach(piece => {
        captures = captures.concat(getAvailableCapturesForPiece(piece));
    });
    return captures;
}
function getAvailableCapturesForPiece(piece) {
    const row = parseInt(piece.dataset.row);
    const col = parseInt(piece.dataset.col);
    const player = piece.classList.contains('white') ? 'white' : 'black';
    const isKing = piece.classList.contains('king');

    const directions = [
        { r: 1, c: 1 },
        { r: 1, c: -1 },
        { r: -1, c: 1 },
        { r: -1, c: -1 }
    ];
    let captures = [];
    if (!isKing) {
        const validDirs = player === 'white'
            ? [{ r: -1, c: 1 }, { r: -1, c: -1 }]
            : [{ r: 1, c: 1 }, { r: 1, c: -1 }];
        validDirs.forEach(dir => {
            const enemyRow = row + dir.r;
            const enemyCol = col + dir.c;
            const landRow = row + dir.r * 2;
            const landCol = col + dir.c * 2;
            if (landRow >= 0 && landRow < 8 && landCol >= 0 && landCol < 8) {
                const enemySquare = document.querySelector(`[data-row='${enemyRow}'][data-col='${enemyCol}']`);
                const landSquare = document.querySelector(`[data-row='${landRow}'][data-col='${landCol}']`);

                if (enemySquare.firstChild && !enemySquare.firstChild.classList.contains(player) && !landSquare.firstChild) {
                    captures.push({
                        piece,
                        captureRow: enemyRow,
                        captureCol: enemyCol,
                        row: landRow,
                        col: landCol
                    });
                }
            }
        });
        return captures;
    }

    directions.forEach(dir => {
        let r = row + dir.r;
        let c = col + dir.c;
        let enemy = null;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const square = document.querySelector(`[data-row='${r}'][data-col='${c}']`);

            if (!square.firstChild && !enemy) {
                r += dir.r;
                c += dir.c;
                continue;
            }
            if (square.firstChild?.classList.contains(player)) break;

            if (square.firstChild && !square.firstChild.classList.contains(player)) {
                if (enemy) break;
                enemy = { row: r, col: c };
                r += dir.r;
                c += dir.c;
                continue;
            }

            if (!square.firstChild && enemy) {
                captures.push({
                    piece,
                    captureRow: enemy.row,
                    captureCol: enemy.col,
                    row: r,
                    col: c
                });
                r += dir.r;
                c += dir.c;
            }
        }
    });
    return captures;
}

function saveGameStatus() {
    undoStack.push({
        boardHTML: board.innerHTML,
        currentPlayer,
        whitePieces,
        blackPieces,
        whitescore,
        blackscore
    });
    redoStack = [];
    updateUndoRedoButtons();
}

function restoreGameStatus(state) {
    if (!state) return;

    board.innerHTML = state.boardHTML;
    currentPlayer = state.currentPlayer;
    whitePieces = state.whitePieces;
    blackPieces = state.blackPieces;
    whitescore = state.whitescore;
    blackscore = state.blackscore;

    whiteScoreElement.innerText = `White: ${whitescore}`;
    blackScoreElement.innerText = `Black: ${blackscore}`;
    selectedPiece = null;
    updateGameStatus();

    document.querySelectorAll('.square').forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
    updateUndoRedoButtons();
}

function undoMove(){
    if(undoStack.length === 0) return;

    const lastState = undoStack.pop();
    redoStack.push({
        boardHTML: board.innerHTML,
        currentPlayer,
        whitePieces,
        blackPieces,
        whitescore,
        blackscore
    });
    restoreGameStatus(lastState);
}

function redoMove(){
    if( redoStack.length === 0) return;

    const nextState = redoStack.pop();
    undoStack.push({
        boardHTML:board.innerHTML,
        currentPlayer,
        whitePieces,
        blackPieces,
        whitescore,
        blackscore
    });
    restoreGameStatus(nextState);
}

function updateUndoRedoButtons() {
    eenTerugButton.disabled = undoStack.length === 0;
    redoButton.disabled = redoStack.length === 0;
}
eenTerugButton.addEventListener('click', undoMove);
redoButton.addEventListener('click', redoMove);
function checkWinCondition() {
    if (whitePieces === 0) {
        gameStatus.innerText = "Black wins!";
        endGame()
        return true;
    }
    if (blackPieces === 0) {
        gameStatus.innerText = "White wins!";
        endGame();
        return true;
    }
    return false;
}

function endTurn() {
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    updateGameStatus();
}

function updateGameStatus() {
    gameStatus.innerText = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn`;
    if (currentPlayer === 'white') {
        gameStatus.style.color = 'white';
    } else {
        gameStatus.style.color = 'black';
    }
}

function endGame() {
    restartButton.style.display = 'block';
    board.style.pointerEvents = 'none';
}

function restartGame() {
    updateUndoRedoButtons();
    undoStack = [];
    redoStack = [];
    whitePieces = 12;
    blackPieces = 12;
    selectedPiece = null;
    currentPlayer = 'white';
    gameStatus.innerText = '';
    restartButton.style.display = 'none';
    board.style.pointerEvents = 'auto';
    whitescore = 0;
    blackscore = 0;
    whiteScoreElement.innerText = `White: ${whitescore}`;
    blackScoreElement.innerText = `Black: ${blackscore}`;
    createBoard();
    updateGameStatus();
}

restartButton.addEventListener('click', restartGame);

// createBoard();
// updateGameStatus();