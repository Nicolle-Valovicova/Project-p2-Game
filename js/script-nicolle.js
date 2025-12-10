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
  winScreen.classList.add("notVisible");
  loseScreen.classList.add("notVisible");
}

hidePages();
// TODO first call the hide all pages then display the start page and after the game load bar has loaded (some sort of interval) call the settimeout and hide all pages again and after that show the menu screen
gameIndex.classList.remove("notVisible");

menuPlayBtn.addEventListener("click", () => {
  hidePages();
  gameIndex.classList.remove("notVisible");
  applyFlockSetting();
  showParticles();
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
// change the crowfacts when usere waits too long at startr screen
let i = 0;
crowfactOutput.textContent = crowFacts[i];
setInterval(() => {
  i = (i + 1) % crowFacts.length;
  crowfactOutput.textContent = crowFacts[i];
}, 5000);

startBtn.classList.add("notVisible");
// show the button and load the loading bar
window.onload = (event) => {
  let z = 0;
  let interval = setInterval(() => {
    z++;
    loadingbar.set(z, false);

    if (z > 100) {
      clearInterval(interval);
      startBtn.classList.remove("notVisible");
    }
  }, 40);
}; // script for menu page
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

// toggling betehwwn the legacy/ menu
attunement.classList.add("notVisible");
legacyContain.classList.add("notVisible");
attunementMenu.addEventListener("click", () => {
  attunement.classList.toggle("notVisible");
  legacyContain.classList.add("notVisible");
});

creditsMenu.addEventListener("click", () => {
  attunement.classList.add("notVisible");
  legacyContain.classList.toggle("notVisible");
});
// TODO make the arrow options in css not wlickable in opposide direction
// in the menu container toggling the different settings
atuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    settingIndexes.forEach((i) => i.classList.remove("visible"));
    settingIndexes[index].classList.add("visible");
  });
});
falseSettingOptions.forEach((o) => {
  o.classList.add("notVisible");
});

settingIndexes[0].classList.add("visible");

// show opt 1 or 2 based on arrows
const settingSliders = document.querySelectorAll(".settingSlider");
// settings object
let settings = {
  battle: "playervsplayer",
  flock: "blackmurders",
  music: "on",
  sfx: "on",
  graphics: "on",
  cutscenes: "on",
  legalMoves: "on",
  dangerTiles: "on",
};

settingSliders.forEach((slider) => {
  const opt1 = slider.querySelector(".settingOpt1");
  const opt2 = slider.querySelector(".settingOpt2");
  const back = slider.querySelector(".back");
  const forward = slider.querySelector(".forward");

  const settingName = slider.dataset.setting;

  opt1.classList.remove("notVisible");
  opt2.classList.add("notVisible");

  // Left arrow
  back.addEventListener("click", () => {
    opt1.classList.remove("notVisible");
    opt2.classList.add("notVisible");

    settings[settingName] = opt1.textContent
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "");
    playBgMusic();
    console.log(settingName, settings[settingName]);
  });

  // Right arrow
  forward.addEventListener("click", () => {
    opt1.classList.add("notVisible");
    opt2.classList.remove("notVisible");
    // remove whitespace, and make lowercase
    settings[settingName] = opt2.textContent
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "");
    playBgMusic();
    console.log(settingName, settings[settingName]);
  });
});
// function for choosign flock
function applyFlockSetting() {
  if (settings.flock === "blackmurders") {
    startingPlayer = "black";
    playerTurn.textContent = "black";
  } else {
    startingPlayer = "white";
    playerTurn.textContent = "white";
    reverseIds();
  }
}
// function fo rplaying music
function playBgMusic() {
  const bgAudio = document.querySelector("#bgMusic");
bgAudio.volume = 0.5;
  if (settings.music === "on") {
    bgAudio.muted = false;
    bgAudio.play();
  } else {
    bgAudio.pause();
  }
}
playBgMusic()
function playAgainstComputer() {
  if (settings.battle !== "playervsplayer") {
  }
}
// script for side bar in game
const arrowBack = document.querySelector("#arrowBack");
const arrowForward = document.querySelector("#arrowForward");
const quitbtn = document.querySelector("#quit");
let gameSidebar = document.querySelector(".gameSidebar");
// open the side bar in the game
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
let clickValue = 0;
let clickValueW = 0;
let clickValue3 = 0;
let clickValueW4 = 0;

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

let feedbackIndex = 0;
// * replaced with let a = 0;
// function for showing win screen
function showWinScreen() {
  winScreen.classList.remove("notVisible");
  winText.textContent = winTitles[feedbackIndex];
  winQuite.textContent = winQuotes[feedbackIndex];

  feedbackIndex = (feedbackIndex + 1) % winTitles.length;
}
// function for showing lose screen
function showLoseScreen() {
  loseScreen.classList.remove("notVisible");

  loseText.textContent = loseTitles[feedbackIndex];
  loseQuote.textContent = loseQuotes[feedbackIndex];

  feedbackIndex = (feedbackIndex + 1) % loseTitles.length;
}

// TODO continue to show the positive vs negative feedback trough
// TODO if opposide tam has won show negative feedbacl else show positive feedback

// redirect to pages on feedbackscreen
const retryBtn = document.querySelectorAll(".retry");
const hubBtn = document.querySelectorAll(".Menu");
const homeBtn = document.querySelectorAll(".Home");

retryBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    gameIndex.classList.remove("notVisible");
    clickValue = 0;
    clickValueW = 0;
    clickValue3 = 0;
    clickValueW4 = 0;
  });
});
hubBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuScreen.classList.remove("notVisible");
  });
});
homeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // ! REDIRECT TO THE CHOOSE MENU FOR THE 4 GAMES
  });
});
// add glass effect to items
startBtn.classList.add("glass");
attunement.classList.add("glass");
legacyContain.classList.add("glass");
gameSidebar.classList.add("glass");
quitbtn.classList.add("glass");
document.querySelectorAll(".escButtons button").forEach((btn) => {
  btn.classList.add("glass");
});
// function for background particles
document.addEventListener("DOMContentLoaded", showParticles);
function showParticles() {
  particlesJS.load("particles-js", "js/particlesjs-config.json", () => {
    console.log("particles.js loaded!");
  });
}
// function for hover ui items and a sfx plays
// ui buttons
let uiBtns = document.querySelectorAll('[data-btn-sound="uiBtn"]');
function playHoverSfx() {
  const hoverSfx = document.querySelector("#hover-ui-btn");
    hoverSfx.currentTime = 0; 
  hoverSfx.play();
}
function playClickSfx() {
  const clickSfx = document.querySelector("#click-ui-btn");
    clickSfx.currentTime = 0; 
  clickSfx.play();
}
uiBtns.forEach((btn) => {
  btn.addEventListener("mouseover",playHoverSfx);
  });
uiBtns.forEach((btn) => {
  btn.addEventListener("click",playClickSfx);
  });
  // ui menu 
  
//  code for the easter eggs
// 1. The Legacy Crow
let hendrikContainer = document.querySelector("#hendrik");
let hendrik = document.createElement("img");
hendrik.src = "imgs/gameItems/hendrik1.PNG";

function playCaw() {
  const jackdawSFX = document.querySelector("#click-jackdaw");
  jackdawSFX.play();
}
hendrikContainer.addEventListener("click", () => {
  hendrik.src = "imgs/gameItems/hendrik2.PNG";
  playCaw();
  setTimeout(() => {
    hendrik.src = "imgs/gameItems/hendrik1.PNG";
  }, 500);
});

hendrikContainer.appendChild(hendrik);

// 2. pieces eventlisteners for developers

// show black win-screen
document.querySelector("#blackking").addEventListener("click", () => {
  clickValue++;
  if (clickValue == 7) {
    hidePages();
    showWinScreen();
  }
  console.log(clickValue);
});
// show white win-screen
document.querySelector("#whiteKing").addEventListener("click", () => {
  clickValueW++;
  if (clickValueW == 7) {
    hidePages();
    showWinScreen();
  }
  console.log(clickValueW);
});
// show white lose-screen
document.querySelector("#whiteQueen").addEventListener("click", () => {
  clickValue3++;
  if (clickValue3 == 4) {
    hidePages();
    showLoseScreen();
  }
  console.log(clickValue3);
});
// show black lose-screen
document.querySelector("#blackQueen").addEventListener("click", () => {
  clickValueW4++;
  if (clickValueW4 == 4) {
    hidePages();
    showLoseScreen();
  }
  console.log(clickValueW4);
});
// TODO Code for cool transition for betwheen pages zoom in fade cool stuff
// TODO the ui buttons have click sfx on hover and on click
// ! menu screen click on button for my game playmusic
