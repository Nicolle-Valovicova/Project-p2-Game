class GameWorld {
    constructor() {
        this.player = {
            name: "",
            classType: "",
            health: 100,
            maxHealth: 100,
            metaKnowledge: 0,
            level: 1,
            inventory: []
        };
        this.currentScene = "start";
        this.visitedScenes = new Set();
    }

    updateStats(choice) {
        if (choice.healthChange) {
            this.player.health += choice.healthChange;
        }
        if (choice.metaGain) {
            this.player.metaKnowledge += choice.metaGain;
        }
        if (choice.item) {
            this.player.inventory.push(choice.item);
        }
    }

    save() {
        return {
            player: this.player,
            currentScene: this.currentScene,
            visitedScenes: [...this.visitedScenes]
        };
    }

    load(saveData) {
        this.player = saveData.player;
        this.currentScene = saveData.currentScene;
        this.visitedScenes = new Set(saveData.visitedScenes);
    }
}
