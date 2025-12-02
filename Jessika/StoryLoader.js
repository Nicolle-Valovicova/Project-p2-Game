
const storyData = {
    "scenes": {
        "wake_up": {
            "id": "wake_up",
            "text": "You slowly open your eyes. The world is blurry, pixelated... familiar. This is Glitchwood Forest - the first level of your game. But you're not at your computer anymore. You're inside it.",
            "choices": [
                {
                    "text": "Pinch yourself",
                    "nextScene": "pinch",
                    "condition": null,
                    "effect": null
                },
                {
                    "text": "Try to stand up",
                    "nextScene": "stand_up",
                    "condition": null,
                    "effect": null
                },
                {
                    "text": "Access debug console",
                    "nextScene": "debug_console",
                    "condition": "class=='code-mage'",
                    "effect": "metaKnowledge+=5"
                }
            ],
            "onEnter": "playSound('ambient_forest')",
            "onExit": null
        },
        
        "pinch": {
            "id": "pinch",
            "text": "You pinch your arm. It hurts. This isn't a dream. The pain feels too real, too detailed. As your vision clears, you notice something strange - a small UI element in the corner of your vision. It says: 'Reality Stability: 98%'",
            "choices": [
                {
                    "text": "Examine the UI",
                    "nextScene": "examine_ui",
                    "effect": "discovery+=1"
                },
                {
                    "text": "Look around",
                    "nextScene": "look_around"
                }
            ]
        },
        
        "stand_up": {
            "id": "stand_up",
            "text": "Your body feels heavy, like the gravity is slightly off. You manage to stand, but the ground glitches beneath your feet. A tree flickers between oak and birch. Your code wasn't this buggy when you left it.",
            "choices": [
                {
                    "text": "Touch the glitching tree",
                    "nextScene": "touch_tree",
                    "effect": "metaKnowledge+=2"
                },
                {
                    "text": "Check your pockets",
                    "nextScene": "check_pockets"
                }
            ]
        }
    },
    
    "items": {
        "pocket_lint": {
            "name": "Pocket Lint",
            "description": "Even in a digital world, some things remain constant.",
            "type": "junk"
        },
        "glitch_crystal": {
            "name": "Glitch Crystal",
            "description": "A fragment of corrupted reality. It hums with unstable energy.",
            "type": "material",
            "value": 50
        }
    }
};

class StoryLoader {
      constructor() {
        this.scenes = {};
        this.items = {};
    }
    
    async loadStory() {
        try {
            // In development: use local JSON
            // In production: fetch from server
            const response = await fetch('story.json');
            const data = await response.json();
            
            this.scenes = data.scenes;
            this.items = data.items;
            
            console.log(`Loaded ${Object.keys(this.scenes).length} scenes`);
            console.log(`Loaded ${Object.keys(this.items).length} items`);
            
            return true;
        } catch (error) {
            console.error('Failed to load story:', error);
            this.scenes = storyData.scenes;
            this.items = storyData.items;
            return false;
        }
    }
    
    getScene(sceneId) {
        return this.scenes[sceneId];
    }
    
    getItem(itemId) {
        return this.items[itemId];
    }
    
    checkCondition(condition, player) {
        if (!condition) return true;
        
        if (condition.includes('==')) {
            const [key, value] = condition.split('==').map(s => s.trim());
            return player[key] == value;
        }
        
        return true;
    }
    
    applyEffect(effect, player) {
        if (!effect) return;
        
        if (effect.includes('+=')) {
            const [stat, amount] = effect.split('+=').map(s => s.trim());
            const numAmount = parseInt(amount);
            
            if (stat in player) {
                player[stat] += numAmount;
            } else if (stat in player.stats) {
                player.stats[stat] += numAmount;
            }
        }
    }
}

export default StoryLoader;