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
    currentScene: 1,
    gameState: {}
};

//GAME ENGINE 
class GameEngine {
    constructor() {
        this.state = {};
        this.currentSceneId = 1;
        this.textNodes = this.getStory();
    }

    getStory() {
        return [
            {
                id: 1,
                text: 'You slowly open your eyes. The world is blurry, pixelated... familiar. This is Glitchwood Fores! The f irst level of your game. But you\'re not at your computer anymore. You\'re inside it',
                options: [
                    {
                        text: 'Look around carefully',
                        setState: { exploredForest: true },
                        metaGain: 5,
                        nextText: 2
                    },
                    {
                        text: 'Check your developer tools',
                        nextText: 3
                    },
                    {
                        text: 'Try to pinch yourself awake',
                        nextText: 4
                    }
                ]
            },
            {
                id: 2,
                text: 'You see glitches in the trees - pixels flickering, textures repeating. This is definitely your game. But how did you get here?',
                options: [
                    {
                        text: 'Access the debug console',
                        requiredState: (state) => gameState.player.class === 'code-mage',
                        setState: { debugAccess: true },
                        metaGain: 10,
                        nextText: 5
                    },
                    {
                        text: 'Try to stabilize the glitch',
                        requiredState: (state) => gameState.player.class === 'reality-bender',
                        setState: { stabilizedGlitch: true },
                        metaGain: 8,
                        nextText: 6
                    },
                    {
                        text: 'Study the glitch patterns',
                        requiredState: (state) => gameState.player.class === 'lore-master',
                        setState: { studiedGlitch: true },
                        metaGain: 12,
                        nextText: 7
                    },
                    {
                        text: 'Ignore it and move forward',
                        nextText: 8
                    }
                ]
            },
            {
                id: 3,
                text: 'You reach for your pocket and find your developer tablet still there! It shows critical errors in the game matrix. The "Reality Integrity" is at 45%.',
                options: [
                    {
                        text: 'Run diagnostic scan',
                        setState: { ranDiagnostic: true },
                        metaGain: 15,
                        nextText: 9
                    },
                    {
                        text: 'Try to force an exit command',
                        nextText: 10
                    }
                ]
            },
            {
                id: 4,
                text: 'You pinch your arm hard. It hurts, but nothing changes. This feels too real to be a dream. The forest seems to pulse with digital energy.',
                options: [
                    {
                        text: 'Accept this new reality',
                        setState: { acceptedReality: true },
                        metaGain: 5,
                        nextText: 11
                    },
                    {
                        text: 'Try screaming for help',
                        nextText: 12
                    }
                ]
            },
            {
                id: 5,
                text: '> DEBUG CONSOLE ACTIVATED\n> Available commands:\n> - reality_scan\n> - code_inject\n> - exit_sequence\n\nThe console accepts your Code Mage credentials. You have admin access!',
                options: [
                    {
                        text: 'Run reality_scan',
                        setState: { realityScanned: true },
                        metaGain: 20,
                        nextText: 13
                    },
                    {
                        text: 'Try exit_sequence',
                        nextText: 14
                    }
                ]
            },
            {
                id: 6,
                text: 'You focus your Reality Bender powers. The glitch stabilizes into a doorway. Beyond it, you see code flowing like rivers of light.',
                options: [
                    {
                        text: 'Step through the doorway',
                        setState: { enteredCodeRealm: true },
                        metaGain: 25,
                        nextText: 15
                    },
                    {
                        text: 'Examine the code patterns',
                        nextText: 16
                    }
                ]
            },
            {
                id: 7,
                text: 'As a Lore Master, you recognize these glitch patterns. They\'re memory leaks from incomplete game assets. The forest is trying to render content that doesn\'t exist.',
                options: [
                    {
                        text: 'Document your findings',
                        setState: { documentedFindings: true },
                        metaGain: 30,
                        nextText: 17
                    },
                    {
                        text: 'Try to patch the memory leak',
                        nextText: 18
                    }
                ]
            },
            {
                id: 8,
                text: 'You walk deeper into the forest. The trees become more pixelated. You hear digital whispers: "The Creator is here..."',
                options: [
                    {
                        text: 'Follow the whispers',
                        nextText: 19
                    },
                    {
                        text: 'Find higher ground',
                        nextText: 20
                    }
                ]
            },
            {
                id: 9,
                text: '> DIAGNOSTIC RESULTS:\n> - Reality Matrix: CORRUPTED\n> - Player Identity: VERIFIED\n> - Exit Protocols: LOCKED\n> - Anomalies Detected: 127\n\nA red warning flashes: "Core Game Files Missing"',
                options: [
                    {
                        text: 'Check anomaly details',
                        metaGain: 10,
                        nextText: 21
                    },
                    {
                        text: 'Attempt emergency reboot',
                        nextText: 22
                    }
                ]
            },
            {
                id: 10,
                text: 'You type: /exit_game --force\n\nThe console responds: "ERROR: Exit sequence requires Administrator privileges or completion of Primary Questline."',
                options: [
                    {
                        text: 'Search for admin privileges',
                        nextText: 23
                    },
                    {
                        text: 'Look for the Primary Quest',
                        nextText: 24
                    }
                ]
            },
            {
                id: 11,
                text: 'You take a deep breath and accept your new reality. The forest seems less hostile now, as if acknowledging you as its creator.',
                options: [
                    {
                        text: 'Look for any town or village',
                        nextText: 25
                    },
                    {
                        text: 'Sit down and make a plan',
                        nextText: 26
                    }
                ]
            },
            {
                id: 12,
                text: 'You scream at the top of your lungs. The forest echoes back, The pixels vibrate in response, distorting your voice into digital static. "No one answers."',
                options: [
                    {
                        text: 'Follow the digital echoes',
                        setState: { followedEchoes: true },
                        metaGain: 3,
                        nextText: 27
                    },
                    {
                        text: 'Stay put and listen carefully',
                        nextText: 28
                    },
                    {
                        text: 'Try screaming louder',
                        requiredState: (state) => state.player.health > 80,
                        nextText: 29
                    }
                ]

            },
            {
                id: 13,
                text: '> REALITY_SCAN INITIATED\n> Scanning... 45%\n> Anomaly detected: Player entity mismatch\n> Scanning... 87%\n> CRITICAL: Reality anchor unstable\n> Scan complete.\n\nThe scan shows you\'re anchored to the game world by 127 error threads.',
                options: [
                    {
                        text: 'Stabilize Reality',
                        nextText: 27
                    },
                    {
                        text: 'Locate Core Files',
                        nextText: 28
                    },
                    {
                        text: 'Restore Game Integrity',
                        nextText: 29
                    }
                ]
            },
            {
                id: 14,
                text: 'You input: /exit_sequence --admin\n> ERROR: Access denied. Administrator privileges required.\n> Suggestion: Complete core game loop or find debug key.',
                options: [
                    {
                        text: 'Search for debug key',
                        nextText: 30
                    },
                    {
                        text: 'Complete core game loop',
                        nextText: 31
                    },
                    {
                        text: 'Attempt force exit again',
                        nextText: 10
                    }
                ]
            },
            {
                id: 15,
                text: 'You step through the glitch doorway and find yourself in the Code Realm. Lines of code float around you, glowing with raw potential.',
                options: [
                    {
                        text: 'Follow the JavaScript river',
                        setState: { followedJS: true },
                        metaGain: 20,
                        nextText: 34
                    },
                    {
                        text: 'Climb the HTML mountains',
                        nextText: 35
                    },
                    {
                        text: 'Examine your floating comments',
                        nextText: 36
                    }
                ]

            },
            {
                id: 16,
                text: 'The code patterns reveal secrets. You see TODO comments you wrote months ago, now rendered as physical objects. "Fix collision detection" glows with unfinished energy.',
                options: [
                    {
                        text: 'Try to fix a TODO',
                        requiredState: (state) => state.player.class === 'code-mage',
                        setState: { fixedTodo: true },
                        metaGain: 25,
                        nextText: 37
                    },
                    {
                        text: 'Document the patterns',
                        _requiredState: (state) => state.player.class === 'lore-master',
                          get requiredState() {
                            return this._requiredState;
                        },
                        set requiredState(value) {
                            this._requiredState = value;
                        },
                        setState: { documentedPatterns: true },
                        metaGain: 18,
                        nextText: 38
                    },
                    {
                        text: 'Absorb the code energy',
                        _requiredState: (state) => state.player.class === 'reality-bender',
                        get requiredState() {
                            return this._requiredState;
                        },
                        set requiredState(value) {
                            this._requiredState = value;
                        },
                        setState: { absorbedCode: true },
                        nextText: 39
                    }
                ]
            },
            {
                id: 17,
                text: 'You create a log of the memory leaks. Each entry gains you understanding:\n1. NPC dialogue trees incomplete\n2. Texture files corrupted\n3. Physics engine unstable\n4. Save system non-functional',
                options: [
                    {
                        text: 'Attempt to fix texture corruption',
                        metaGain: 10,
                        nextText: 40
                    },
                    {
                        text: 'Study the NPC dialogue',
                        nextText: 41
                    },
                    {
                        text: 'Test the physics engine',
                        requiredState: (state) => state.player.health > 60,
                        nextText: 42
                    }
                ]
            },
            {
                id: 18,
                text: 'You attempt to patch the memory leak. The forest flickers violently. Trees transform into different species, then into abstract polygons, then back again.',
                options: [
                    {
                        text: 'Continue the patch',
                        requiredState: (state) => state.player.metaKnowledge >= 30,
                        setState: { continuedPatch: true },
                        metaGain: 35,
                        nextText: 43
                    },
                    {
                        text: 'Abort - too dangerous',
                        nextText: 44
                    },
                    {
                        text: 'Call for help from console',
                        requiredState: (state) => state.debugAccess === true,
                        nextText: 45
                    }
                ]
            },
            {
                id: 19,
                text: 'The whispers lead you to a clearing where the pixels arrange themselves into a face - your face. It speaks: "Why did you abandon us?"',
                options: [
                    {
                        text: 'Answer: "I didn\'t mean to"',
                        nextText: 46
                    },
                    {
                        text: 'Ask: "Who are you?"',
                        nextText: 47
                    },
                    {
                        text: 'Debug the entity',
                        requiredState: (state) => state.player.class === 'code-mage',
                        nextText: 48
                    }
                ]
            },
            {
                id: 20,
                text: 'You climb a glitched hill. From the top, you see the entire game world. It\'s beautiful but broken. Mountains phase in and out of existence. A river flows backward.',
                options: [
                    {
                        text: 'Map the visible anomalies',
                        setState: { mappedAnomalies: true },
                        metaGain: 15,
                        nextText: 49
                    },
                    {
                        text: 'Look for civilization',
                        nextText: 50
                    },
                    {
                        text: 'Try to contact the skybox',
                        requiredState: (state) => state.player.metaKnowledge >= 40,
                        nextText: 51
                    }
                ]
            },
            {
                id: 21,
                text: 'ANOMALY DETAILS:\n#001: Player inventory corrupted\n#045: Time dilation detected\n#089: Quantum NPC entanglement\n#127: Reality anchor unstable\n\nMost anomalies trace back to your arrival.',
                options: [
                    {
                        text: 'Investigate time dilation',
                        setState: { investigatedTime: true },
                        metaGain: 12,
                        nextText: 52
                    },
                    {
                        text: 'Check quantum entanglement',
                        nextText: 53
                    },
                    {
                        text: 'Repair inventory corruption',
                        requiredState: (state) => state.player.class === 'code-mage',
                        nextText: 54
                    }
                ]
            },
            {
                id: 22,
                text: 'EMERGENCY REBOOT INITIATED\nThe world dissolves into loading screens... then reassembles differently. The trees are now cubes. The sky is checkered. You feel different too.',
                options: [
                    {
                        text: 'Check your new form',
                        nextText: 55
                    },
                    {
                        text: 'Explore the cube forest',
                        nextText: 56
                    },
                    {
                        text: 'Try another reboot',
                        nextText: 57
                    }
                ]
            },
            {
                id: 23,
                text: 'Where would admin privileges be in your own game? You designed the systems. The admin console was in... the Debug Temple? Or was it the Code Vault?',
                options: [
                    {
                        text: 'Head to Debug Temple',
                        setState: { headingToTemple: true },
                        nextText: 58
                    },
                    {
                        text: 'Search for Code Vault',
                        nextText: 59
                    },
                    {
                        text: 'Check your old notes',
                        requiredState: (state) => state.player.class === 'lore-master',
                        nextText: 60
                    }
                ]
            },
            {
                id: 24,
                text: 'Primary Questline: "Restore Reality"\nObjectives:\n1. Find the Core Glitch\n2. Repair Memory Leaks\n3. Stabilize Physics\n4. [REDACTED]\n\nProgress: 0%',
                options: [
                    {
                        text: 'Accept the quest',
                        setState: { acceptedQuest: true },
                        metaGain: 20,
                        nextText: 61
                    },
                    {
                        text: 'Look for the Core Glitch',
                        nextText: 62
                    },
                    {
                        text: 'Question the redacted objective',
                        nextText: 63
                    }
                ]
            },
            {
                id: 25,
                text: 'Through the glitched trees, you spot smoke rising. Civilization! As you approach, the settlement flickers between a medieval village and a cyberpunk city.',
                options: [
                    {
                        text: 'Enter the village/city',
                        nextText: 64
                    },
                    {
                        text: 'Observe from a distance',
                        nextText: 65
                    },
                    {
                        text: 'Call out to the inhabitants',
                        nextText: 66
                    }
                ]
            },
            {
                id: 26,
                text: 'You sit on a log that phases between wood and metal. Plan:\n1. Assess the situation ✓\n2. Find resources\n3. Locate exit\n4. Don\'t panic\n\nResources needed: Food, shelter, information.',
                options: [
                    {
                        text: 'Search for food',
                        nextText: 67
                    },
                    {
                        text: 'Build temporary shelter',
                        requiredState: (state) => state.player.health > 70,
                        nextText: 68
                    },
                    {
                        text: 'Look for information sources',
                        nextText: 69
                    }
                ]
            },
            {
                id: 27,
                text: 'The echoes lead to a cave where your screams are stored as .wav files, floating in crystal formations. Each scream is labeled with a timestamp and error code.',
                options: [
                    {
                        text: 'Play back a scream',
                        nextText: 70
                    },
                    {
                        text: 'Check the error codes',
                        requiredState: (state) => state.player.metaKnowledge >= 15,
                        nextText: 71
                    },
                    {
                        text: 'Collect the audio crystals',
                        setState: { collectedCrystals: true },
                        nextText: 72
                    }
                ]
            },
            {
                id: 28,
                text: 'In the silence, you hear it: a low hum of electricity. The forest isn\'t silent at all - it\'s buzzing with background processes. Like a computer running too many programs.',
                options: [
                    {
                        text: 'Follow the electrical hum',
                        nextText: 73
                    },
                    {
                        text: 'Try to identify the processes',
                        requiredState: (state) => state.player.class === 'code-mage',
                        nextText: 74
                    },
                    {
                        text: 'Meditate to hear better',
                        requiredState: (state) => state.player.class === 'lore-master',
                        nextText: 75
                    }
                ]
            },
            {
                id: 29,
                text: 'Your louder scream causes a feedback loop. The forest glitches violently. Trees invert their colors. The ground becomes translucent, showing code beneath.',
                options: [
                    {
                        text: 'Look at the revealed code',
                        setState: { sawCodeLayer: true },
                        metaGain: 25,
                        nextText: 76
                    },
                    {
                        text: 'Try to stabilize with a softer sound',
                        nextText: 77
                    },
                    {
                        text: 'Scream even louder (risky)',
                        requiredState: (state) => state.player.health > 90,
                        nextText: 78
                    }
                ]
            },
            {
                id: 30,
                text: 'ERROR THREAD DETAILS:\nThread #001: Player.spawn() called from unknown source\nThread #045: GameTime.desync = 47.3 seconds\nThread #089: Memory allocation exceeded\n\nEach thread connects to your physical body.',
                options: [
                    {
                        text: 'Trace Thread #001',
                        setState: { tracedThread1: true },
                        metaGain: 18,
                        nextText: 79
                    },
                    {
                        text: 'Fix time desync',
                        requiredState: (state) => state.player.metaKnowledge >= 35,
                        nextText: 80
                    },
                    {
                        text: 'Allocate more memory',
                        nextText: 81
                    }
                ]
            },
            {
                id: 31,
                text: 'You attempt to sever an error thread. Pain shoots through your body - these threads ARE your connection to reality. Severing them could unmake you.',
                options: [
                    {
                        text: 'Sever anyway (dangerous)',
                        requiredState: (state) => state.player.health > 50,
                        setState: { severedThread: true },
                        nextText: 82
                    },
                    {
                        text: 'Find another way',
                        nextText: 83
                    },
                    {
                        text: 'Reinforce the threads instead',
                        requiredState: (state) => state.player.class === 'reality-bender',
                        nextText: 84
                    }
                ]
            },
            {
                id: 32,
                text: 'Debug keys in your game were hidden in:\n1. The first enemy defeated\n2. The final chest\n3. A secret room behind the waterfall\n4. The developer\'s signature\n\nWhich to search first?',
                options: [
                    {
                        text: 'Find an enemy to defeat',
                        nextText: 85
                    },
                    {
                        text: 'Look for the waterfall',
                        nextText: 86
                    },
                    {
                        text: 'Check for your signature',
                        nextText: 87
                    }
                ]
            },
            {
                id: 33,
                text: '> HINT MODE ACTIVATED\n> Available hints (cost 5 Meta-Knowledge each):\n1. Location of Core Glitch\n2. Admin password fragment\n3. Safe reboot sequence\n\nYou have enough for one hint.',
                options: [
                    {
                        text: 'Get Core Glitch location',
                        requiredState: (state) => state.player.metaKnowledge >= 5,
                        setState: { metaKnowledge: state => state.player.metaKnowledge - 5 },
                        nextText: 88
                    },
                    {
                        text: 'Get password fragment',
                        requiredState: (state) => state.player.metaKnowledge >= 5,
                        setState: { metaKnowledge: state => state.player.metaKnowledge - 5 },
                        nextText: 89
                    },
                    {
                        text: 'Get reboot sequence',
                        requiredState: (state) => state.player.metaKnowledge >= 5,
                        setState: { metaKnowledge: state => state.player.metaKnowledge - 5 },
                        nextText: 90
                    },
                    {
                        text: 'Save Meta-Knowledge',
                        nextText: 14
                    }
                ]
            },
            {
                id: 34,
                text: 'The JavaScript river carries functions and variables like leaves. You see your own code floating by - functions you wrote, then deleted, now given form.',
                options: [
                    {
                        text: 'Catch a familiar function',
                        nextText: 91
                    },
                    {
                        text: 'Follow the river downstream',
                        nextText: 92
                    },
                    {
                        text: 'Try to modify the code flow',
                        requiredState: (state) => state.player.class === 'code-mage',
                        nextText: 93
                    }
                ]
            },
            {
                id: 35,
                text: 'The HTML mountains are structured with <div> peaks and <section> plateaus. CSS waterfalls cascade down, styling everything with glowing properties.',
                options: [
                    {
                        text: 'Climb a <div> mountain',
                        requiredState: (state) => state.player.health > 60,
                        nextText: 94
                    },
                    {
                        text: 'Study the CSS waterfalls',
                        nextText: 95
                    },
                    {
                        text: 'Look for <header> landmarks',
                        nextText: 96
                    }
                ]
            },
            {
                id: 36,
                text: 'Your floating comments reveal your own thoughts during development. Some are humorous, others frustrated. They provide insight into your mindset.',
                options: [
                    {
                        text: 'Read a humorous comment',
                        nextText: 97
                    },
                    {
                        text: 'Read a frustrated comment',
                        nextText: 98
                    }
                ]
            },
            {
                id: 37,
                text: 'You successfully fix a TODO item. The game world stabilizes slightly. A tree that was flickering solidifies. You feel a surge of accomplishment.',
                options: [
                    {
                        text: 'Continue fixing TODOs',
                        nextText: 99
                    },
                    {
                        text: 'Explore the Code Realm more',
                        nextText: 100
                    },
                ]
            },
            {
                id: 38,
                text: 'You document the code patterns thoroughly. Your notes help you understand the underlying structure of the game world. You gain clarity.',
                options: [
                    {
                        text: 'Use notes to navigate',
                        nextText: 101
                    },
                    {
                        text: 'Share notes with NPCs for information',
                        nextText: 102
                    },
                    {
                        text: 'Put the notes aside for later',
                        nextText: 103
                    }
                ]
            },
        


        ];
    }

    showScene(sceneId) {
        const scene = this.textNodes.find(node => node.id === sceneId);
        if (!scene) {
            console.error(`Scene ${sceneId} not found`);
            return null;
        }

        this.currentSceneId = sceneId;
        return {
            text: scene.text,
            options: scene.options.filter(option => this.showOption(option))
        };
    }

    showOption(option) {
        if (!option.requiredState) return true;
        return option.requiredState(this.state);
    }

    selectOption(option) {
        // Update game engine state
        if (option.setState) {
            this.state = { ...this.state, ...option.setState };
        }

        // Update player meta knowledge
        if (option.metaGain) {
            gameState.player.metaKnowledge += option.metaGain;
            if (gameState.player.metaKnowledge > 100) {
                gameState.player.metaKnowledge = 100;
            }
        }

        // Update player health if specified
        if (option.healthChange) {
            gameState.player.health += option.healthChange;
            if (gameState.player.health > gameState.player.maxHealth) {
                gameState.player.health = gameState.player.maxHealth;
            }
            if (gameState.player.health <= 0) {
                return 0; // Game over
            }
        }

        return option.nextText;
    }

    getCurrentScene() {
        return this.showScene(this.currentSceneId);
    }

    save() {
        return {
            engineState: this.state,
            currentSceneId: this.currentSceneId,
            gameState: gameState
        };
    }

    load(saveData) {
        this.state = saveData.engineState || {};
        this.currentSceneId = saveData.currentSceneId || 1;
        Object.assign(gameState, saveData.gameState);
    }
}

// DOM ELEMENTS 
const startScreen = document.getElementById('start-screen');
const characterScreen = document.getElementById('character-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name-input');
const startGameBtn = document.getElementById('start-game-btn');
const nameDisplay = document.getElementById('name-display');
const displayPlayerName = document.getElementById('display-player-name');
const displayPlayerClass = document.getElementById('display-player-class');

//  GAME ENGINE INSTANCE 
const gameEngine = new GameEngine();

//  EVENT LISTENERS 
playerNameInput.addEventListener('input', function () {
    const name = this.value.trim();
    startGameBtn.disabled = name.length < 2;
});

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
        document.querySelectorAll('.class-option').forEach(opt => {
            opt.classList.remove('active');
        });
        this.classList.add('active');
        updateClassDescription(this.dataset.class);
    });
});

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
    playerNameInput.focus();
});

// Debug commands
document.querySelectorAll('.debug-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const command = this.dataset.command;
        handleDebugCommand(command);
    });
});

// Enter key for name input
playerNameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !startGameBtn.disabled) {
        startGameBtn.click();
    }
});

//  FUNCTIONS 
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

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName + '-screen').classList.add('active');
    gameState.currentScreen = screenName;
}

function updateNameDisplay() {
    nameDisplay.textContent = `DEVELOPER: ${gameState.player.name}`;
    displayPlayerName.textContent = gameState.player.name;
}

function initializeGame() {
    displayPlayerName.textContent = gameState.player.name;
    displayPlayerClass.textContent = gameState.player.class.replace('-', ' ').toUpperCase();

    // Set class-specific starting stats
    switch (gameState.player.class) {
        case 'code-mage':
            gameState.player.health = 80;
            gameState.player.maxHealth = 80;
            break;
        case 'reality-bender':
            gameState.player.health = 100;
            gameState.player.maxHealth = 100;
            break;
        case 'lore-master':
            gameState.player.health = 120;
            gameState.player.maxHealth = 120;
            break;
    }

    updateUI();
    loadScene(1);
}

function loadScene(sceneId) {
    const scene = gameEngine.showScene(sceneId);
    if (!scene) return;

    gameState.currentScene = sceneId;

    // Update story text
    const storyElement = document.getElementById('story-text');
    storyElement.textContent = scene.text;

    // Update choices
    updateChoices(scene.options);

    // Update UI
    updateUI();

    // Save game state
    saveGame();
}

function updateChoices(options) {
    const choicesContainer = document.getElementById('choices-buttons');
    choicesContainer.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'pixel-btn choice-btn';
        button.textContent = option.text;

        button.addEventListener('click', () => {
            const nextSceneId = gameEngine.selectOption(option);

            if (nextSceneId <= 0) {
                if (nextSceneId === 0) {
                    // Game over
                    gameOver();
                } else if (nextSceneId === -1) {
                    // Restart
                    restartGame();
                }
                return;
            }

            loadScene(nextSceneId);
        });

        choicesContainer.appendChild(button);
    });
}

function updateUI() {
    // Update health bar
    const healthPercent = (gameState.player.health / gameState.player.maxHealth) * 100;
    document.getElementById('health-bar').style.width = healthPercent + '%';
    document.getElementById('health-text').textContent = `${gameState.player.health}/${gameState.player.maxHealth}`;

    // Update meta knowledge bar
    document.getElementById('meta-bar').style.width = gameState.player.metaKnowledge + '%';
    document.getElementById('meta-text').textContent = `${gameState.player.metaKnowledge}/100`;

    // Update level
    document.getElementById('level-text').textContent = gameState.player.level;
}

function handleDebugCommand(command) {
    switch (command) {
        case 'save':
            saveGame();
            showMessage('Game saved successfully!');
            break;
        case 'load':
            loadGame();
            showMessage('Game loaded!');
            break;
        case 'stats':
            showMessage(
                `PLAYER STATS:\n` +
                `Name: ${gameState.player.name}\n` +
                `Class: ${gameState.player.class}/${gameState.player.descriptions}\n` +
                `Health: ${gameState.player.health}/${gameState.player.maxHealth}\n` +
                `Meta: ${gameState.player.metaKnowledge}/100\n` +
                `Level: ${gameState.player.level}\n` +
                `Inventory: ${gameState.player.inventory.length} items`
            );
            break;
    }
}

function saveGame() {
    try {
        const saveData = {
            player: gameState.player,
            currentScene: gameState.currentScene,
            engineState: gameEngine.state,
            engineScene: gameEngine.currentSceneId
        };
        localStorage.setItem('gameMakerRealmSave', JSON.stringify(saveData));
        console.log('Game saved');
    } catch (e) {
        console.error('Failed to save game:', e);
    }
}

function loadGame() {
    try {
        const saveData = localStorage.getItem('gameMakerRealmSave');
        if (saveData) {
            const data = JSON.parse(saveData);

            // Load game state
            gameState.player = data.player;
            gameState.currentScene = data.currentScene;
            gameEngine.state = data.engineState || {};
            gameEngine.currentSceneId = data.engineScene || 1;

            // Update UI
            displayPlayerName.textContent = gameState.player.name;
            displayPlayerClass.textContent = gameState.player.class.replace('-', ' ').toUpperCase();
            updateUI();

            // Load scene
            loadScene(gameEngine.currentSceneId);
        }
    } catch (e) {
        console.error('Failed to load game:', e);
    }
}

function showMessage(message) {
    const storyElement = document.getElementById('story-text');
    const originalText = storyElement.textContent;
    storyElement.textContent = message;
    setTimeout(() => {
        storyElement.textContent = originalText;
    }, 2000);
}

function gameOver() {
    const storyElement = document.getElementById('story-text');
    storyElement.textContent = 'GAME OVER\n\nYour journey ends here. The game world continues without its creator...';
    document.getElementById('choices-buttons').innerHTML = '';

    const restartBtn = document.createElement('button');
    restartBtn.className = 'pixel-btn';
    restartBtn.textContent = 'TRY AGAIN';
    restartBtn.addEventListener('click', restartGame);
    document.getElementById('choices-buttons').appendChild(restartBtn);
}

function restartGame() {
    // Reset game state
    gameState.player.health = gameState.player.maxHealth;
    gameState.player.metaKnowledge = 0;
    gameState.player.level = 1;
    gameState.player.inventory = [];
    gameEngine.state = {};

    // Start from beginning
    loadScene(1);
    updateUI();
}

//  INITIALIZATION 
document.addEventListener('DOMContentLoaded', function () {
    showScreen('start');
    playerNameInput.focus();

    // Try to load saved game
    setTimeout(() => {
        const saveData = localStorage.getItem('gameMakerRealmSave');
        if (saveData) {
            console.log('Save file detected');
        }
    }, 1000);
});