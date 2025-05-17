import { Player } from "../types/Player";

const ROWS = 6, COLUMNS = 7;

const counter = (board: Player[][], row:number, col:number, dx:number, dy:number, player:Player): number =>{
    let count = 0;
    let r = row + dx, c = col + dy;

    while(r >= 0 && r < ROWS && c>=0 && c <COLUMNS && board[r][c] === player){
        count++;
        r += dx;
        c += dy;
    }
    return count;
}

export const isWinner = (
    board: Player[][],
    row: number,
    col: number,
    player: Player
) : boolean =>{
    const directions = [[0,1], [1,0],[1,1], [-1,1]]

    for(const [dx, dy] of directions){
        const count = 1 + counter(board, row, col, dx, dy, player) + counter(board, row, col, -dx, -dy, player) 
        if(count >= 4)
            return true;
    }
    return false
}

