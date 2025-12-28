function scanBoard() {
  /*
scan board to get current positions of the pieces
 */
  const boardState = [];
  allSquares.forEach((square) => {
    const piece = square.firstChild;
    if (piece) {
      boardState.push({ square, piece });
    }
  });
  return boardState;
}
function generateMoves() {
  const moves = [];
  const boardState = scanBoard();
  boardState.forEach(({ square, piece }) => {
    if (piece.dataset.color === aiColor) {
      const pieceType = piece.dataset.type;
      const pieceMoves = checkIfValid(
        square,
        pieceType,
        piece.dataset.color
      );
      pieceMoves.forEach((move) => {
        moves.push({ from: square, to: move });
      });
    }
  });
  return moves;
  /*
    choose a random move based on the bigass if statement and choose a position thats avaibable
    */
}
function makeAiMove() {
  const moves = generateMoves();
  if (moves.length === 0) {
    console.log("No valid moves for AI");
    return;
  }
  const randomIndex = Math.floor(Math.random() * moves.length);
  const selectedMove = moves[randomIndex];
  const fromSquare = selectedMove.from;
  const toSquare = selectedMove.to;
  const piece = fromSquare.firstChild;
  toSquare.appendChild(piece);
  changePlayer();
  checkForWin();
  /*
    make the ai move wiith a interval and stuff
    */
}

