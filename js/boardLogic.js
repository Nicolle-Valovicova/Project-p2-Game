const game = new Chess();
let board = game.board();
console.log(board);

// draw the board using js
let boardDiv = document.querySelector(".board");
function drawBoard() {
  boardDiv.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let square = document.createElement("div");
      square.classList.add("square");

      if ((row + col) % 2 === 0) {
        square.classList.add("black");
      } else {
        square.classList.add("white");
      }
      square.id = `${row}${col}`;
      // *  gives each square a unique id based on position
      boardDiv.appendChild(square);
      square.addEventListener("click", () => {});
    }
  }
}
drawBoard();
// load the numbers and letters at the boards sides
let lettersDiv = document.querySelector(".lowerLetters");
lettersDiv.classList.add("letterStyling");
let boardNumbers = document.querySelector(".boardNumbers");
boardNumbers.classList.add("bNumberStyling");
let arrayOfLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
function drawLetters() {
  lettersDiv.innerHTML = "";
  boardNumbers.innerHTML = "";
  for (let i = 0; i < arrayOfLetters.length; i++) {
    let contain = document.createElement("p");
    const letter = arrayOfLetters[i];
    contain.innerHTML = letter;
    lettersDiv.appendChild(contain);
  }

  for (let y = 8; y > 0; y--) {
    let containZ = document.createElement("p");
    const number = y;
    containZ.innerHTML = number;
    boardNumbers.appendChild(containZ);
  }
}
drawLetters();
// code for rendering pieces
function drawPieces() {
  let boardArr = game.board();
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let squaredDiv = document.getElementById(`${row}${col}`);
      squaredDiv.innerHTML = "";

      const piece = boardArr[row][col];
      if (piece) {
        squaredDiv.textContent = piece.type + piece.color;
      }
    }
  }
}
drawPieces();
// code for move on click for chess working
let selected = null;

boardDiv.addEventListener("click", (e) => {
  const id = e.target.id;
  if (id.length !== 2) return;

  const row = parseInt(id[0]);
  const col = parseInt(id[1]);

  const square = "abcdefgh"[col] + (8 - row);
  console.log(square);

  if (!selected) {
    selected = square;
    return;
  }

  const move = game.move({ from: selected, to: square });
  console.log(move);

  if (move) {
    drawPieces();
  }

  selected = null;
});
