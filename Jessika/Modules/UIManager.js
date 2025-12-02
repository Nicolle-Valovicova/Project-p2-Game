class UIManager {
    constructor(gameWorld) {
        this.gameWorld = gameWorld;
    }

updateStoryText(text) {
        const storyElement = document.getElementById('story-text');
        storyElement.innerHTML = text;
    }
    updateChoices(choices) {
        const choicesDiv = document.getElementById('choices-buttons');
        choicesDiv.innerHTML = '';
        
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'pixel-btn choice-btn';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                // Laad volgende scene via hoofdcontroller
                window.gameController.handleChoice(index);
            });
            choicesDiv.appendChild(button);
        });
    }

updateStats() {
        // Update health bar
        const healthPercent = (this.gameWorld.player.health / this.gameWorld.player.maxHealth) * 100;
        document.getElementById('health-bar').style.width = healthPercent + '%';
        document.getElementById('health-text').textContent = 
            `${this.gameWorld.player.health}/${this.gameWorld.player.maxHealth}`;
        
        // Update meta bar
        const metaPercent = this.gameWorld.player.metaKnowledge;
        document.getElementById('meta-bar').style.width = metaPercent + '%';
        document.getElementById('meta-text').textContent = 
            `${this.gameWorld.player.metaKnowledge}/100`;
    }
}
