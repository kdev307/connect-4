import { useEffect, useState } from "react";
import GameBoard from "../GameBoard";
import Title from "../Title";
import Info from "../Info";
import { isWinner } from "../../utils/isWinner";
import { Board, Player, Winner } from "../../types";
import { playSound, stopSound } from "../../utils/sounds";
import { useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
// import Buttons from "../Buttons";

const ROWS = 6,
	COLUMNS = 7;

const createBoard = (): Board => {
	return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
};

function Connect4() {
	const [board, setBoard] = useState<Board>(createBoard());
	const [players, setPlayers] = useState<{ [key: number]: string }>({});
	const [currentPlayer, setCurrentPlayer] = useState<Player>(0);
	const [winner, setWinner] = useState<Winner>(null);
	const [modal, setModal] = useState<boolean>(false);

	const { roomCode } = useParams();
	// const [roomLoaded, setRoomLoaded] = useState(false);


	const handleToggleInputModal = () => {
		setModal((prev) => !prev);
	};

	const handleCellClick = (column: number) => {
		if (winner) return;
		for (let row = ROWS - 1; row >= 0; row--) {
			if (board[row][column] === null) {
				const newBoard = board.map(row=>[...row]);
                newBoard[row][column] = currentPlayer;
                setBoard(newBoard)
                playSound('drop.mp3')
				if (isWinner(newBoard, row, column, currentPlayer)) {
					setWinner(currentPlayer);
                    playSound('win.mp3')
				} 
                else if (board.every((row) => row.every((cell) => cell !== null))) {
					setWinner(-1);
                    playSound('draw.mp3')
				} 
                else {
					setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
				}
				break;
			}
		}
	};

	const resetGame = () => {
		stopSound()
		setBoard(createBoard());
		setCurrentPlayer(0);
		setWinner(null);
	};


	useEffect(() => {
		if (!roomCode) return;

		const roomRef = doc(db, "rooms", roomCode);

		const unsubscribe = onSnapshot(roomRef, (snap) => {
			if (!snap.exists()) {
				alert("Room not found");
				return;
			}

			const data = snap.data();

			// Handle 1D or 2D board from Firestore
			let parsedBoard: Board;
			if (Array.isArray(data.board[0])) {
				parsedBoard = data.board;
			} else {
				parsedBoard = Array.from({ length: ROWS }, (_, i) =>
					data.board.slice(i * COLUMNS, i * COLUMNS + COLUMNS)
				);
			}

			setBoard(parsedBoard);
			setCurrentPlayer(currentPlayer);
			setWinner(data.winner ?? null);

			
			if (data.players && typeof data.players === "object") {
				const names: { [key: number]: string } = {};
				for (const [key, value] of Object.entries(data.players)) {
					if (typeof value === "string") {
						names[parseInt(key)] = value;
					}
				}
				setPlayers(names);
			}
			
		});

		return () => unsubscribe();
	}, [roomCode]);

	return (
		<div className="m-auto p-4 flex flex-col items-center justify-center gap-4">
			<Title title="Play Connect 4" style="text-7xl font-extrabold text-[#014210]"/>
			<Title title={`Room Code - ${roomCode}`} style="text-5xl font-bold text-[#707]"/>
				{/* <Buttons
						type="submit"
						text="Leave Room"
						onClick={handleLeaveRoom}
						style="text-2xl text-[#077] border-[#077] hover:bg-[#077] mx-auto"
					/> */}
			<div className="flex items-center justify-center mt-10 gap-60">
				<GameBoard board={board} onCellClick={handleCellClick} winner={winner}/>
				<Info
					players={players}
					currentPlayer={currentPlayer}
					winner={winner}
					onReset={resetGame}
					modal={modal}
					onToggleInputModal={handleToggleInputModal}
					board={board}
				/>
			</div>
		</div>
	);
}

export default Connect4;
