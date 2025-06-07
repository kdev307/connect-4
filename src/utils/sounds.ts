let dropAudio: HTMLAudioElement | null = null;
let endGameAudio: HTMLAudioElement | null = null;

export const playDropSound = () => {
	dropAudio = new Audio("/sounds/drop.mp3");
	dropAudio.play().catch((err) => {
		console.warn("Drop sound error:", err);
	});
};

export const playWinSound = () => {
	endGameAudio?.pause();
	endGameAudio = new Audio("/sounds/win.mp3");
	endGameAudio.play().catch((err) => {
		console.warn("Win sound error:", err);
	});
};

export const playLoseSound = () => {
	endGameAudio?.pause();
	endGameAudio = new Audio("/sounds/lose.mp3");
	endGameAudio.play().catch((err) => {
		console.warn("Lose sound error:", err);
	});
};

export const playDrawSound = () => {
	endGameAudio?.pause();
	endGameAudio = new Audio("/sounds/draw.mp3");
	endGameAudio.play().catch((err) => {
		console.warn("Draw sound error:", err);
	});
};

export const stopEndGameSound = () => {
	if (endGameAudio) {
		endGameAudio.pause();
		endGameAudio.currentTime = 0;
	}
};
