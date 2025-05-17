import { useState } from "react";
import Board from "./Board";
import Title from "./Title";
import { Player } from "../types/Player";
import Message from "./Message";
import { isWinner } from "../utils/isWinner";

const ROWS = 6, COLUMNS = 7;

const createBoard = (): Player[][] => {
    return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
}

function Connect4() {
    const [board, setBoard] = useState<Player[][]>(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState<Player>('Red');
    const [winner, setWinner] = useState<Player>(null);

    const handleCellClick = (column: number) => {
        if (winner) return;
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!board[row][column]) {
                const newBoard = board.map(row => [...row]);
                newBoard[row][column] = currentPlayer;
                setBoard(newBoard);

                if (isWinner(newBoard, row, column, currentPlayer)) {
                    setWinner(currentPlayer);
                } else {
                    setCurrentPlayer(currentPlayer === 'Red' ? 'Blue' : 'Red');
                }
                break;
            }
        }
    };

    const resetGame = () => {
        setBoard(createBoard());
        setCurrentPlayer('Red');
        setWinner(null);
    };

    return (
        <div className="m-auto p-4">
            <Title title="Play Connect 4" />
            <div className="flex items-center justify-center mt-10">
                <Board board={board} onCellClick={handleCellClick} />
                <Message currentPlayer={currentPlayer} winner={winner} onReset={resetGame} />
            </div>
        </div>
    );
}

export default Connect4;
