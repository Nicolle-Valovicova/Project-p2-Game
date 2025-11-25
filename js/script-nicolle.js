const startScreen = document.querySelector("#start-screen");
const menuScreen = document.querySelector("#menu-screen");
const gameIndex = document.querySelector("#game-index");
let menuPlayBtn = document.querySelector("#menuPlayBtn");
let exitBtn = document.querySelector(".exit");
function hidePages() {
  startScreen.classList.add("notVisible");
  menuScreen.classList.add("notVisible");
  gameIndex.classList.add("notVisible");
}
hidePages();
// first call the hide all pages then display the start page and after the game load bar has loaded (some sort of interval) call the settimeout and hide all pages again and after that show the menu screen
gameIndex.classList.remove("notVisible");
menuPlayBtn.addEventListener("click", () => {
  hidePages();
  gameIndex.classList.remove("notVisible");
});
exitBtn.addEventListener("click", () => {
  hidePages();
  startScreen.classList.remove("notVisible");
});

// script for start page
let crowfactOutput = document.querySelector("#crowfactOutput");
let crowFacts = [
  "A group of crows is called a 'murder'.",
  "Crows can solve multi-step puzzles, making them one of the smartest animals on Earth.",
  "Crows hold funerals: when one crow dies, the whole murder gathers to inspect the body and learn from the danger.",
  "Jackdaws form lifelong partnerships, just like chess pieces protecting each other on the board.",
  "When crows work in pairs, one distracts while the other steals — teamwork that mirrors chess strategy.",
  "Ravens play mind games, like teasing wolves or sliding down snowy roofs for fun—just like psychological warfare on a chessboard.",
  "Crows hold grudges: if one bird wrongs them, they remember it for generations—and the entire murder may retaliate.",
];
let i = 0;
crowfactOutput.textContent = crowFacts[i];
setInterval(() => {
  i = (i + 1) % crowFacts.length;
  crowfactOutput.textContent = crowFacts[i];
}, 5000);

// script for menu page
let attunementMenu = document.querySelector("#options");
let attunement = document.querySelector(".attunement");
let atuItems = document.querySelectorAll(".atuItem");
let settingIndexes = document.querySelectorAll(".attunement-settings");
let creditsMenu = document.querySelector("#credits");
let legacyContain = document.querySelector(".legacy-contain");
let trueSettingOptions = document.querySelectorAll(".settingOpt1");
let falseSettingOptions = document.querySelectorAll(".settingOpt2");

attunement.classList.add("notVisible");
legacyContain.classList.add("notVisible");
attunementMenu.addEventListener("click", () => {
  attunement.classList.toggle("notVisible");
  legacyContain.classList.add("notVisible");
});

atuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    settingIndexes.forEach((i) => i.classList.remove("visible"));
    settingIndexes[index].classList.add("visible");
  });
});
settingIndexes[0].classList.add("visible");

creditsMenu.addEventListener("click", () => {
  attunement.classList.add("notVisible");
  legacyContain.classList.toggle("notVisible");
});

// script for side bar in game
const arrowBack = document.querySelector("#arrowBack");
const arrowForward = document.querySelector("#arrowForward");
const quitbtn = document.querySelector("#quit");
let gameSidebar = document.querySelector(".gameSidebar");

arrowBack.addEventListener("click", closeNav);
arrowForward.addEventListener("click", openNav);
quitbtn.addEventListener("click", () => {
  hidePages();
  menuScreen.classList.remove("notVisible");
});
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
