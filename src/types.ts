import { STATUSES } from "./constants";

export type Player = number;
export type Winner = Player | null;
export type Cell = Winner;
export type Board = Cell[][];

export type PlayerInfo = {
    uid: string;
    name: string;
    color: string;
};

export type WinningCell = {
    row: number;
    col: number;
};

export type Room = {
    id?: string;
    board: Board;
    currentTurn: Player;
    winner: Winner;
    status: keyof typeof STATUSES;
    createdAt: string;
    winningCells?: WinningCell[];

    settings: {
        rows: number;
        columns: number;
        numPlayers: number;
        connectCount: number;
    };
    players: Record<number, PlayerInfo>;
};
