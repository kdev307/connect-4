import { useState } from "react";
import GameBoard from "./GameBoard";
import Title from "./Title";
import Info from "./Info";
import { isWinner } from "../utils/isWinner";
import { Board, Player, Winner } from "../types";

const ROWS = 6,
	COLUMNS = 7;

const createBoard = (): Board => {
	return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
};

function Connect4() {
	const [board, setBoard] = useState<Board>(createBoard());
	const [currentPlayer, setCurrentPlayer] = useState<Player>(0);
	const [winner, setWinner] = useState<Winner>(null);
	const [modal, setModal] = useState<boolean>(false);

	const handleToggleInputModal = () => {
		setModal((prev) => !prev);
	};

	const handleCellClick = (column: number) => {
		if (winner) return;
		for (let row = ROWS - 1; row >= 0; row--) {
			if (board[row][column] === null) {
				board[row][column] = currentPlayer;
				setBoard(board);

				if (isWinner(board, row, column, currentPlayer)) {
					setWinner(currentPlayer);
				} else if (board.every((row) => row.every((cell) => cell !== null))) {
					setWinner(-1);
				} else {
					setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
				}
				break;
			}
		}
	};

	const resetGame = () => {
		setBoard(createBoard());
		setCurrentPlayer(0);
		setWinner(null);
	};

	return (
		<div className="m-auto p-4">
			<Title title="Play Connect 4" />
			<div className="flex items-center justify-center mt-10">
				<GameBoard board={board} onCellClick={handleCellClick} />
				<Info
					currentPlayer={currentPlayer}
					winner={winner}
					onReset={resetGame}
					modal={modal}
					onToggleInputModal={handleToggleInputModal}
				/>
			</div>
		</div>
	);
}

export default Connect4;
