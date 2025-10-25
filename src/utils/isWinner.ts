import { Board, Player } from "../types";

const ROWS = 6,
    COLUMNS = 7;

const helper = (
    board: Board,
    row: number,
    col: number,
    dx: number,
    dy: number,
    player: Player,
    coord: [number, number][]
): [number, number][] => {
    const r = row + dx,
        c = col + dy;

    if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS || board[r][c] !== player)
        return coord;

    coord.push([r, c]);
    return helper(board, r, c, dx, dy, player, coord);
};

export const isWinner = (
    board: Board,
    row: number,
    col: number,
    player: Player,
    connectCount: number
): [number, number][] | null => {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [-1, 1],
    ];

    for (const [dx, dy] of directions) {
        const forward = helper(board, row, col, dx, dy, player, []);
        const backward = helper(board, row, col, -dx, -dy, player, []);
        const fullLine: [number, number][] = [
            [row, col],
            ...forward,
            ...backward,
        ];

        if (fullLine.length >= connectCount) {
            return fullLine;
        }
    }
    return null;
};
