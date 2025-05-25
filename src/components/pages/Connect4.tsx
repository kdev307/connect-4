import { useEffect, useState } from "react";
import GameBoard from "../GameBoard";
import Title from "../Title";
import Info from "../Info";
// import { isWinner } from "../../utils/isWinner";
import { Board, Player, Winner } from "../../types";
import { playSound, stopSound } from "../../utils/sounds";
import { useNavigate, useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { leaveRoom, playMove, resetGame } from "../../firebase/service";
import Buttons from "../Buttons";
import { COLUMNS, ROWS } from "../../constants";
import { getAuth } from "firebase/auth";

function Connect4() {
	const [board, setBoard] = useState<Board | null>(null);

	const [players, setPlayers] = useState<{
		[key: number]: { name: string; uid: string };
	}>({});
	const [currentPlayer, setCurrentPlayer] = useState<Player>(0);
	const [winner, setWinner] = useState<Winner>(null);
	const [modal, setModal] = useState<boolean>(false);

	const { roomCode } = useParams();
	const navigate = useNavigate();

	const handleToggleInputModal = () => {
		setModal((prev) => !prev);
	};

	const handleCellClick = async (column: number) => {
		if (winner) return;
		if (!roomCode) return;
		if (Object.entries(players).length < 2) {
			alert("Waiting for another player to join.");
			return;
		}
		const auth = getAuth();
		const currentUid = auth.currentUser?.uid;
		const currentTurnUid = players[currentPlayer]?.uid;

		if (currentUid !== currentTurnUid) {
			alert("It's not your turn!");
			return;
		}

		try {
			await playMove(roomCode, column, currentPlayer);
			playSound("drop.mp3");
		} catch (error) {
			console.error("Failed to play move:", error);
			alert(error);
		}
	};

	const handleResetGame = async () => {
		if (!roomCode) return;
		try {
			await resetGame(roomCode);
			stopSound();
		} catch (err) {
			console.error("Reset failed:", err);
		}
	};

	const handleLeaveRoom = async () => {
		if (!roomCode) return;
		try {
			stopSound();
			await leaveRoom(roomCode, "YourPlayerName");
			navigate("/");
		} catch (err) {
			alert("Error leaving room: " + err);
		}
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

			let parsedBoard: Board;
			if (Array.isArray(data.board[0])) {
				parsedBoard = data.board;
			} else {
				parsedBoard = Array.from({ length: ROWS }, (_, i) =>
					data.board.slice(i * COLUMNS, i * COLUMNS + COLUMNS)
				);
			}

			setBoard(parsedBoard);
			setCurrentPlayer(data.currentTurn);
			setWinner(data.winner ?? null);

			if (data.players && typeof data.players === "object") {
				const player: { [key: number]: { name: string; uid: string } } = {};
				for (const [key, value] of Object.entries(data.players)) {
					const playerData = value as { name: string; uid: string };
					if (playerData.name && playerData.uid) {
						player[parseInt(key)] = playerData;
					}
				}
				setPlayers(player);
			}
		});

		return () => unsubscribe();
	}, [roomCode]);

	
	useEffect(() => {
		if (winner === null) return;
		if (Object.keys(players).length < 2) return;

		const auth = getAuth();
		const currentUid = auth.currentUser?.uid;

		if (winner === -1) {
			playSound("draw.mp3");
		} else if (players[winner]?.uid === currentUid) {
			playSound("win.mp3");
		} else {
			playSound("lose.mp3");
		}

	}, [winner, players]);

	return (
		<div className="m-auto p-4 flex flex-col items-center justify-center gap-4">
			<Title
				title="Play Connect 4"
				style="text-7xl font-extrabold text-[#014210]"
			/>
			<Title
				title={`Room Code - ${roomCode}`}
				style="text-5xl font-bold text-[#707]"
			/>
			<Buttons
				type="submit"
				text="Leave Room"
				onClick={handleLeaveRoom}
				style="text-2xl text-[#077] border-[#077] hover:bg-[#077] mx-auto"
			/>
			<div className="flex flex-col md:flex-row items-center justify-center gap-20 py-0 px-10">
				<GameBoard
					players={players}
					board={board}
					onCellClick={handleCellClick}
					winner={winner}
					currentPlayer={currentPlayer}
				/>
				<Info
					players={players}
					currentPlayer={currentPlayer}
					winner={winner}
					onReset={handleResetGame}
					modal={modal}
					onToggleInputModal={handleToggleInputModal}
					board={board}
				/>
			</div>
		</div>
	);
}

export default Connect4;
