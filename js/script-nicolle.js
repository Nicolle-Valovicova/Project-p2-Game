// script for start page 
let crowfactOutput = document.querySelector("#crowfactOutput");
let crowFacts = [
    "A group of crows is called a 'murder'.",
"Crows can solve multi-step puzzles, making them one of the smartest animals on Earth.",
"Crows hold funerals: when one crow dies, the whole murder gathers to inspect the body and learn from the danger.",
"Jackdaws form lifelong partnerships, just like chess pieces protecting each other on the board.",
"When crows work in pairs, one distracts while the other steals — teamwork that mirrors chess strategy.",
"Ravens play mind games, like teasing wolves or sliding down snowy roofs for fun—just like psychological warfare on a chessboard.",
"Crows hold grudges: if one bird wrongs them, they remember it for generations—and the entire murder may retaliate."
]
let i = 0; 
setInterval(() => { 
  i = (i + 1) % crowFacts.length; 
  crowfactOutput.textContent = crowFacts[i]; 
}, 2000);

// crowfactOutput.textContent = crowFacts;
// script for side bar in game
const arrowBack = document.querySelector("#arrowBack");
const arrowForward = document.querySelector("#arrowForward");
let gameSidebar = document.querySelector(".gameSidebar");

arrowBack.addEventListener("click", closeNav);
arrowForward.addEventListener("click", openNav);
function openNav() {
  gameSidebar.style.width = "300px";
  arrowBack.style.display = "block";
  arrowForward.style.display = "none";
  document.querySelector(".sideInformation").style.display = "block";
}

function closeNav() {
  gameSidebar.style.width = "150px";
  arrowForward.style.display = "block";
  arrowBack.style.display = "none";
  document.querySelector(".sideInformation").style.display = "none";
}
