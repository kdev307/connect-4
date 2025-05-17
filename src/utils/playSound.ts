export const playSound = (soundFile: string) => {
    const audio = new Audio(`/sounds/${soundFile}`);
    audio.play();
};
