let playerTurn = document.querySelector("#currentPlayerTurn");
const width = 8;
let startingPlayer = "black";
playerTurn.textContent = "black";
//! later add if select you r flock === black startingPlayer black
const startPieces = [
  blackRook,blackKnight,  blackBishop,  blackQueen,  blackKing,  blackBishop,  blackKnight,  blackRook,
   blackPawn,  blackPawn,  blackPawn,  blackPawn,  blackPawn,  blackPawn,  blackPawn,  blackPawn,
   "",  "",  "",  "",  "",  "",  "",  "",
 "",  "",  "",  "",  "",  "",  "",  "",
 "",  "",  "",  "",  "",  "",  "",  "",
 "",  "",  "",  "",  "",  "",  "",  "",
   whitePawn,  whitePawn,  whitePawn,  whitePawn,  whitePawn,  whitePawn,  whitePawn,  whitePawn,
  whiteRook,  whiteKnight,  whiteBishop,  whiteQueen,  whiteKing,  whiteBishop,  whiteKnight,  whiteRook,
];
let config = {
  position: "start",
  showNotation: true,
  draggable: true,
  dropOffBoard: "snapback",
  snapbackSpeed: 200,
  snapSpeed: 50,
};

// draw the board using js
// draw pieces on board

let boardDiv = document.querySelector(".board");
function drawBoard() {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPiece;
    square.firstChild && square.firstChild.setAttribute("draggable", true);
    square.setAttribute("square-id", i);
    // reverses the index so board aligns
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "black" : "white");
    } else {
      square.classList.add(i % 2 === 0 ? "white" : "black");
    }
    boardDiv.appendChild(square);
  });
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
// code for efficiently working drag and drop + remove if 2+ players on 1 square
const allSquares = document.querySelectorAll(".square");
const allPieces = document.querySelectorAll(".piece");
let whiteKillPoints = document.querySelector("#whiteGold");
let blackKillPoints = document.querySelector("#blackKills");

console.log(allSquares);

allPieces.forEach(piece => {
  piece.addEventListener("dragstart", dragStart);
});

document.querySelectorAll(".piece img").forEach(img => {
  img.addEventListener("dragstart", e => e.preventDefault());
});

allSquares.forEach((square) => {
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPosId;
let draggedElement;
function dragStart(e) {
  draggedElement = e.currentTarget;
  startPosId = draggedElement.parentElement.getAttribute("square-id");
}

function dragOver(e) {
  e.preventDefault();
}
// code for piece placement when dropped
function dragDrop(e) {
  e.preventDefault();

  const dropSquare = e.currentTarget;
  if (!dropSquare) return;

  const valid = checkIfValid(dropSquare);

  const pieceColor = draggedElement.dataset.color; // black or white
  const correctGo = pieceColor === startingPlayer;
  if (!correctGo) return;

  const taken = dropSquare.querySelector(".piece");
  const opponentGo = startingPlayer === "white" ? "black" : "white";
  const takenByOpponent = taken && taken.dataset.color === opponentGo;

  // capture move
  
  if (takenByOpponent && valid) {
    taken.remove();
    
    dropSquare.appendChild(draggedElement);
    changePlayer();
    return;
  }

  // cant capture own piece
  if (taken && !takenByOpponent) return;

  // normal valid move
  if (valid) {
    dropSquare.appendChild(draggedElement);
    changePlayer();
    return;
  }
}


function checkIfValid(target) {
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(startPosId);
  const piece = draggedElement.dataset.type;
  console.log("start id is:" + startId);
  console.log("target id is:" + targetId);
  console.log("piece id is:", piece);
  // checks if move is valid
  switch (piece) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      // const starterRowW = [48, 49, 50, 51, 52, 53, 54, 55];
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        (startId + width === targetId) ||
        (startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild) ||
        (startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild) 
      ) {
        console.log("valid");

        return true;
      }
      console.log("invalid");
      
      return false;
  }
  return false;
}
// ! coe above   ^ #############################
function changePlayer() {
  if (startingPlayer === "black") {
    reverseIds();
    startingPlayer = "white";
    playerTurn.textContent = "white";
  } else {
    revertIds();
    startingPlayer = "black";
    playerTurn.textContent = "black";
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => {
    square.setAttribute("square-id", width * width - 1 - i);
  });
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => square.setAttribute("square-id", i));
}
