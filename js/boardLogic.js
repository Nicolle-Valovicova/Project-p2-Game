let playerTurn = document.querySelector("#currentPlayerTurn")
const width = 8;
let startingPlayer = "black";
playerTurn.textContent = "black"
//! later add if select you r flock === black startingPlayer black
const startPieces = [
   blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop, blackKnight, blackRook,
   blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,blackPawn,
   "","","","","","","","",
   "","","","","","","","",
   "","","","","","","","",
   "","","","","","","","",
   whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,whitePawn,
   whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop, whiteKnight, whiteRook
];
let config = {
  position: 'start',
  showNotation: true,
  draggable: true,
  dropOffBoard: 'snapback',
  snapbackSpeed: 200,
  snapSpeed: 50
}

// draw the board using js
// draw pieces on board

let boardDiv = document.querySelector(".board");
function drawBoard() {
  startPieces.forEach((startPiece, i) =>{
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPiece;
    square.firstChild && square.firstChild.setAttribute("draggable", true);
    square.setAttribute("square-id", i);
    // reverses the index so board aligns
    const row = Math.floor((63 -i) / 8) +1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "black" : "white")
    } else {
            square.classList.add(i % 2 === 0 ? "white" : "black")
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
console.log(allSquares);

allPieces.forEach(piece =>{

  piece.addEventListener("dragstart", dragStart);
})

allSquares.forEach(square =>{
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPosId;
let draggedElement;
function dragStart(e){
  draggedElement = e.currentTarget;
 startPosId = draggedElement.parentElement.getAttribute("square-id");
}

function dragOver(e){
  e.preventDefault();
}

function dragDrop(e){
e.preventDefault();
console.log(e.target);
const correctGo= draggedElement.firstChild.classList.contains(startingPlayer)
const taken = e.target.classList.contains("piece");
const valid = checkIfValid(e.target);
const opponentGo = startingPlayer === "white" ? "black " : "white";
const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)
const dropSquare = e.target.closest(".square");

if(correctGo){
  // must check first this move
  if (takenByOpponent && valid) {
    if(!dropSquare) return;
    const existingPiece = dropSquare.querySelector(".piece");
    if (existingPiece) existingPiece.remove();
    changePlayer();
    return
  }
  // then check this move
  if (taken && !takenByOpponent) {
    return
  }
  if(valid){
    e.target.append(draggedElement)
    changePlayer();
    return
  }
}

dropSquare.appendChild(draggedElement)
}

function checkIfValid(target){
  const targetId = Number(target.getAttribute("square-id")) || Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(startPosId);
  const piece =draggedElement;
  console.log("start id is:" + startId);
  console.log("target id is:" + targetId);
  console.log("piece id is:", piece.id);
  
  switch (piece) {
    case "blackPawn":
      
      break;
  
    default:
      break;
  }
}

function changePlayer(){
  if (startingPlayer === "black"){
    reverseIds();
    startingPlayer = "white"
playerTurn.textContent = "white"  
} else{
  revertIds();
  startingPlayer = "black"
  playerTurn.textContent = "black"  

}
}

function reverseIds(){
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) =>{
    square.setAttribute("square-id", (width * width -1) -i)
  }) 
}

function revertIds(){
    const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) =>square.setAttribute("square-id", i))

}