import { Board, Player } from "../types";

const helper = (
    board: Board,
    row: number,
    col: number,
    dx: number,
    dy: number,
    player: Player,
    coord: [number, number][],
    rows: number,
    columns: number
): [number, number][] => {
    const r = row + dx,
        c = col + dy;

    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c] !== player) return coord;

    coord.push([r, c]);
    return helper(board, r, c, dx, dy, player, coord, rows, columns);
};

export const isWinner = (
    board: Board,
    row: number,
    col: number,
    player: Player,
    connectCount: number,
    rows: number,
    columns: number
): [number, number][] | null => {
    const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal \
        [-1, 1], // diagonal /
    ];

    for (const [dx, dy] of directions) {
        const forward = helper(board, row, col, dx, dy, player, [], rows, columns);
        const backward = helper(board, row, col, -dx, -dy, player, [], rows, columns);

        const fullLine: [number, number][] = [[row, col], ...forward, ...backward];

        if (fullLine.length >= connectCount) {
            return fullLine;
        }
    }

    return null;
};
