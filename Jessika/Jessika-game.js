let storyLoader;
let gameWorld;
let inventorySystem;
let uiManager;

function initializeGame() {
    displayPlayerName.textContent = gameState.player.name;
    displayPlayerClass.textContent = gameState.player.class.replace('-', ' ').toUpperCase();
    
    storyLoader = new StoryLoader();
    gameWorld = new GameWorld();
    inventorySystem = new InventorySystem();
    uiManager = new UIManager();
    
    storyLoader.loadStory().then(() => {
        loadScene('wake_up');
    });
}

function loadScene(sceneId) {
    const scene = storyLoader.getScene(sceneId);
    if (!scene) return;
    
    let storyText = scene.text.replace(/{{playerName}}/g, gameState.player.name);
    
    document.getElementById('story-text').innerHTML = storyText;
    
    updateChoices(scene.choices);
}

function updateChoices(choices) {
    const choicesContainer = document.getElementById('choices-buttons');
    choicesContainer.innerHTML = '';
    
    choices.forEach((choice, index) => {
        if (choice.condition && !checkCondition(choice.condition)) {
            return; 
        }
        
        const button = document.createElement('button');
        button.textContent = `${index + 1}. ${choice.text}`;
        button.className = 'choice-btn pixel-btn';
        button.style.margin = '5px';
        
        button.addEventListener('click', () => {
            // Pas effecten toe
            if (choice.effect) {
                applyEffect(choice.effect);
            }
            loadScene(choice.nextScene);
        });
        
        choicesContainer.appendChild(button);
    });
}
const gameState = {
    currentScreen: "start",
    player: {
        name: "",
        class: "",
        health: 100,
        maxHealth: 100,
        metaKnowledge: 0,
        level: 1,
        inventory: []
    },
    currentScene: "start"
};

const startScreen = document.getElementById('start-screen');
const characterScreen = document.getElementById('character-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name-input');
const startGameBtn = document.getElementById('start-game-btn');
const nameDisplay = document.getElementById('name-display');
const displayPlayerName = document.getElementById('display-player-name');
const displayPlayerClass = document.getElementById('display-player-class');

// Name Input Validation
playerNameInput.addEventListener('input', function () {
    const name = this.value.trim();
    startGameBtn.disabled = name.length < 2;
}

);

// Start Game with Name
startGameBtn.addEventListener('click', function () {
    if (playerNameInput.value.trim().length >= 2) {
        gameState.player.name = playerNameInput.value.trim().toUpperCase();
        showScreen('character');
        updateNameDisplay();
    }
});

// Character Class Selection
document.querySelectorAll('.class-option').forEach(option => {
    option.addEventListener('click', function () {
        // Remove active class from all options
        document.querySelectorAll('.class-option').forEach(opt => {
            opt.classList.remove('active');
        });

        // Add active class to clicked option
        this.classList.add('active');

        // Update class description
        updateClassDescription(this.dataset.class);
    });
});

// Update Class Description
function updateClassDescription(className) {
    const descriptions = {
        'code-mage': {
            title: 'CODE MAGE',
            details: [
                '> Can manipulate game code directly',
                '> Access to debug commands',
                '> Weak in physical combat',
                '> High Meta-Knowledge growth'
            ]
        },
        'reality-bender': {
            title: 'REALITY BENDER',
            details: [
                '> Expert in glitch exploitation',
                '> Can bend game physics',
                '> Balanced stats',
                '> Medium Meta-Knowledge growth'
            ]
        },
        'lore-master': {
            title: 'LORE MASTER',
            details: [
                '> Deep game world knowledge',
                '> Better NPC interactions',
                '> Strong in dialogue options',
                '> Low Meta-Knowledge growth'
            ]
        }
    };

    const desc = descriptions[className];
    const descriptionElement = document.getElementById('class-description');

    descriptionElement.innerHTML = `
        <h3>${desc.title}</h3>
        ${desc.details.map(detail => `<p>${detail}</p>`).join('')}
    `;
}

// Confirm Character
document.getElementById('confirm-character').addEventListener('click', function () {
    const selectedClass = document.querySelector('.class-option.active');
    if (selectedClass) {
        gameState.player.class = selectedClass.dataset.class;
        showScreen('game');
        initializeGame();
    }
});

// Back to Name
document.getElementById('back-to-name').addEventListener('click', function () {
    showScreen('start');
});

// Screen Management
function showScreen(screenName) {

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });


    document.getElementById(screenName + '-screen').classList.add('active');
    gameState.currentScreen = screenName;
}

// Update Name Display
function updateNameDisplay() {
    nameDisplay.textContent = `DEVELOPER: ${gameState.player.name}`;
    displayPlayerName.textContent = gameState.player.name;
}


function initializeGame() {
    displayPlayerName.textContent = gameState.player.name;
    displayPlayerClass.textContent = gameState.player.class.replace('-', ' ').toUpperCase();


    loadScene('start');
}


playerNameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !startGameBtn.disabled) {
        startGameBtn.click();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    showScreen('start');
    playerNameInput.focus();
});
