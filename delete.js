function dragDrop(e) {
  e.preventDefault();
  console.log(e.target);
  const correctGo =
    draggedElement.firstChild.classList.contains(startingPlayer);
    const dropSquare = e.target.closest(".square");
  const taken = dropSquare.querySelector(".piece");
  if (!dropSquare) {
    return;
  }
  const valid = checkIfValid(dropSquare);
  const opponentGo = startingPlayer === "white" ? "black " : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);
if (!correctGo) {
  return;
}   
  if (correctGo) {
    // must check first this move
    if (takenByOpponent && valid) {
      if (!dropSquare) return;
      const existingPiece = dropSquare.querySelector(".piece");
      if (existingPiece) existingPiece.remove();
      changePlayer();
      return;
    }
    // then check this move
    if (taken && !takenByOpponent) {
      return;
    }
    if (valid) {
      // e.target.append(draggedElement);
      changePlayer();
      dropSquare.appendChild(draggedElement);
      return;
    }
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
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        (startId + width === targetId)
      ) {
        console.log("valid");

        return true;
      }
      console.log("invalid");
      
      return false;
  }
  return false;
}