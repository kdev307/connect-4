import { useEffect, useState } from "react";
import { Board, Player, Winner } from "../types";
import Buttons from "./Buttons";
// import InputModal from "./InputModal";
import PlayerInfo from "./PlayerInfo";
import Result from "./Result";
import { stopSound } from "../utils/sounds";
import { getAuth } from "firebase/auth";

interface InfoProps {
	players: { [key: number]: { name: string; uid: string } };
	currentPlayer: Player;
	winner: Winner;
	onReset: () => void;
	modal: boolean;
	onToggleInputModal: () => void;
	board: Board | null;
}

function Info({
	players,
	currentPlayer,
	winner,
	onReset,
	// modal,
	// onToggleInputModal,
	board,
}: InfoProps) {
	const auth = getAuth();
	const currentUserUid = auth.currentUser?.uid;

	const [showResult, setShowResult] = useState(false);

	useEffect(() => {
		if (winner !== null) {
			setShowResult(true);
		}
	}, [winner]);

	const handleCloseResult = () => {
		setShowResult(false);
		stopSound();
	};

	if (!board) return <h3>Unable to load the board</h3>;
	const gameHasStarted = board.some((row) => row.some((cell) => cell !== null));
	return (
		<>
			<div className="mx-auto p-4 flex flex-col items-center justify-center gap-10">
				<h2
					className={`text-4xl text-center font-bold 
		${currentPlayer === 0 ? "text-[#ffd700]" : "text-[#c0c0c0]"} ${
						winner !== null || Object.keys(players).length < 2 && "!text-purple-600"
					}`}
				>
					{Object.keys(players).length < 2
						? "Waiting for an opponent. Share the code to invite someone."
						: winner !== null
						? "Game Over!"
						: players[currentPlayer]?.uid === currentUserUid
						? `It's your turn ${players[currentPlayer]?.name}`
						: `Waiting for ${players[currentPlayer]?.name} to move`}
				</h2>

				{showResult && winner !== null && (
					<Result
						onReset={() => {
							onReset();
							handleCloseResult();
						}}
						message={
							winner && winner === -1
								? "It's a Draw"
								: `${players[currentPlayer]?.name}  wins!`
						}
						messageStyle={
							winner && winner === -1
								? "text-purple-600"
								: winner === 0
								? "text-[#ffd700]"
								: "text-[#c0c0c0]"
						}
						onClose={handleCloseResult}
					/>
				)}

				<PlayerInfo players={players} currentPlayer={currentPlayer} />

				<Buttons
					text="Restart Game"
					onClick={onReset}
					disabled={!gameHasStarted}
					style={`${
						!gameHasStarted
							? "text-gray-600 border-gray-600 cursor-not-allowed hover:bg-gray-600"
							: "text-[#560000] border-[#560000] hover:bg-[#560000]"
					}`}
				/>
				{/* <Buttons text="Customize Game" onClick={onToggleInputModal} style="text-[#010e42] border-[#010e42] hover:bg-[#010e42] "/> */}
			</div>
			{/* {modal && <InputModal onToggleInputModal={onToggleInputModal}/>} */}
		</>
	);
}

export default Info;
