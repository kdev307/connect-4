let currentAudio: HTMLAudioElement | null = null;

export const playSound = (soundFile: string) => {
    currentAudio = new Audio(`/sounds/${soundFile}`);
    currentAudio.play();
    
};

export const stopSound = () => {
    
    if (currentAudio) {
        console.log("stop sound is called: ", currentAudio)
        currentAudio.pause();
    }
};
