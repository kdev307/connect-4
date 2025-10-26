import { PLAYER_COLORS } from "../constants";

export function getShuffledColors(numPlayers: number): string[] {
    const shuffled = [...PLAYER_COLORS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numPlayers);
}
