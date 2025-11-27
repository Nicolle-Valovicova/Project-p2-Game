const startScreen = document.querySelector("#start-screen");
const menuScreen = document.querySelector("#menu-screen");
const gameIndex = document.querySelector("#game-index");
const winScreen = document.querySelector(".win-screen");
const loseScreen = document.querySelector(".lose-screen");
let menuPlayBtn = document.querySelector("#menuPlayBtn");
let exitBtn = document.querySelector(".exit");
let loadingbar = new ldBar("#bar");
let startBtn = document.querySelector("#startBtn");
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
startBtn.addEventListener("click", () => {
  hidePages();
  menuScreen.classList.remove("notVisible");
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

startBtn.classList.add("notVisible")

window.onload = (event) => {
  let z = 0;
 let interval = setInterval(() => {
    z++
loadingbar.set(z, false)    


if (z > 100){
  clearInterval(interval);
    startBtn.classList.remove("notVisible")

}

}, 40);
};// script for menu page
let attunementMenu = document.querySelector("#options");
let attunement = document.querySelector(".attunement");
let atuItems = document.querySelectorAll(".atuItem");
let settingIndexes = document.querySelectorAll(".attunement-settings");
let creditsMenu = document.querySelector("#credits");
let legacyContain = document.querySelector(".legacy-contain");
let trueSettingOptions = document.querySelectorAll(".settingOpt1");
let falseSettingOptions = document.querySelectorAll(".settingOpt2");
const buttonForward = document.querySelectorAll(".forward");
const buttonBackward = document.querySelectorAll(".back");

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
function setDefaultOptions() {
  falseSettingOptions.forEach((o) => {
    o.classList.add("notVisible");
  });
}
setDefaultOptions();
buttonForward.forEach((button) => {
  button.addEventListener("click", () => {
    trueSettingOptions.forEach((opt) => opt.classList.add("notVisible"));
    falseSettingOptions.forEach((set) => set.classList.remove("notVisible"));
    button.classList.add("notVisible");
    buttonBackward.forEach((o) => {
      o.classList.remove("notVisible");
    });
  });
});
buttonBackward.forEach((button) => {
  button.addEventListener("click", () => {
    trueSettingOptions.forEach((opt) => opt.classList.remove("notVisible"));
    falseSettingOptions.forEach((set) => set.classList.add("notVisible"));
    button.classList.add("notVisible");
    buttonForward.forEach((o) => {
      o.classList.remove("notVisible");
    });
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

// win/lose screen script
let winTitles = [
  "The Murder Claims the Throne",
  "Your Flock Reigns Supreme",
  "The Kingdom Falls Before Your Wings",
  "A Shadow of Feathers Sweeps the Board Victory!",
  "Your Enemies Kneel. The Murder Ascends",
];
let winQuotes = [
  "Wings sharp, mind sharper.",
  "The sky bows to your command.",
  "The battlefield remembers your shadow.",
  "Victory tastes like dusk and thunder.",
  "The board bends to your will.",
];
let loseTitles = [
  "Your Flock Has Fallen",
  "The Murder Scatters Into Shadow",
  "Your King Lies Silent",
  "Feathers Fall Where Strategy Fails",
  "Defeat Echoes Through the Canopy",
];
let loseQuotes = [
  "Even kings must bow to fate.",
  "Silence follows those who miscalculate.",
  "Tonight, the sky belongs to another.",
  "Every fall is the start of a new flight.",
  "Victory escaped your grasp this time.",
];
let winText = document.querySelector(".winText");
let winQuite = document.querySelector(".winQuite");
let loseText = document.querySelector(".loseText");
let loseQuote = document.querySelector(".loseQuote");

let a = 0;
function showPositiveFeedback() {
  winText.textContent = winTitles[i];
  winQuite.textContent = winQuotes[i];
}
function showNegativeFeedback(){
  loseText.textContent = loseTitles[i];
  loseQuote.textContent = loseQuotes[i];
}
showNegativeFeedback();
// * continue to show the positive vs negative feedback trough
// * if opposide tam has won show negative feedbacl else show positive feedback
// setInterval(() => {
//   i = (i + 1) % winTitles.length;
//   winText.textContent = winTitles[i];
// }, 1000);

// redirect to pages on feedbackscreen
const retryBtn = document.querySelectorAll(".retry");
const hubBtn = document.querySelectorAll(".Menu");
const homeBtn = document.querySelectorAll(".Home");

retryBtn.forEach(btn =>{
  btn.addEventListener("click", () =>{
      gameIndex.classList.remove("notVisible");
  })
})
hubBtn.forEach(btn =>{
  btn.addEventListener("click", () =>{
      menuScreen.classList.remove("notVisible");
  })
})
homeBtn.forEach(btn =>{
  btn.addEventListener("click", () =>{
    // ! REDIRECT TO THE CHOOSE MENU FOR THE 4 GAMES
  })
})