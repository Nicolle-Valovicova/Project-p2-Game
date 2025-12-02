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

        // ========== GAME ENGINE ==========
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
                    }
                    // More scenes to be added here
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

        // ========== DOM ELEMENTS ==========
        const startScreen = document.getElementById('start-screen');
        const characterScreen = document.getElementById('character-screen');
        const gameScreen = document.getElementById('game-screen');
        const playerNameInput = document.getElementById('player-name-input');
        const startGameBtn = document.getElementById('start-game-btn');
        const nameDisplay = document.getElementById('name-display');
        const displayPlayerName = document.getElementById('display-player-name');
        const displayPlayerClass = document.getElementById('display-player-class');

        // ========== GAME ENGINE INSTANCE ==========
        const gameEngine = new GameEngine();

        // ========== EVENT LISTENERS ==========
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
            btn.addEventListener('click', function() {
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

        // ========== FUNCTIONS ==========
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
            switch(gameState.player.class) {
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
            switch(command) {
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
                        `Class: ${gameState.player.class}\n` +
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

        // ========== INITIALIZATION ==========
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