class StoryLoader {
    constructor() {
        this.storyData = null;
    }
}
async loadStory(){
    try{
        const response = await fetch('story.json');
        this.storyData = await response.json();
    } catch (error){
        console.error('Failed to load story:'error)
    }
}
    getScene(sceneId) {
        return this.storyData ? this.storyData[sceneId] : null;
    }

    getChoice(sceneId, choiceIndex) {
        const scene = this.getScene(sceneId);
        return scene && scene.choices ? scene.choices[choiceIndex] : null;
    }
}


