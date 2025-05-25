let currentAudio: HTMLAudioElement | null = null;

export const playSound = (soundFile: string) => {
    if (currentAudio) {
        currentAudio.pause();
    }
    currentAudio = new Audio(`/sounds/${soundFile}`);
    currentAudio.play();
};

export const stopSound = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
};
