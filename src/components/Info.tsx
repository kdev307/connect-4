import { useEffect, useState } from "react";
import { Board, Player, Winner } from "../types";
import Buttons from "./Buttons";
// import InputModal from "./InputModal";
import PlayerInfo from "./PlayerInfo";
import Result from "./Result";
import { stopSound } from "../utils/sounds";

interface InfoProps {
	players: { [key: number]: string };
	currentPlayer: Player;
	winner: Winner;
	onReset: () => void;
	modal: boolean;
	onToggleInputModal: () => void;
	board: Board;
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
	const [showResult, setShowResult] = useState(false);

	const gameHasStarted = board.some((row) => row.some((cell) => cell !== null));

	useEffect(() => {
		if (winner !== null) {
			setShowResult(true);
		}
	}, [winner]);

	const handleCloseResult = () => {
		setShowResult(false);
		stopSound();
	};

	return (
		<>
			<div className="mx-auto p-4 flex flex-col items-center justify-center gap-10">
				{/* <h2
					className={`text-4xl text-center font-bold 
                    ${currentPlayer === 0 ? "text-red-700" : "text-blue-700"}`}
				>
					{winner === null && `Player ${currentPlayer + 1}'s turn`}
				</h2> */}

				<h2
					className={`text-4xl text-center font-bold 
		${currentPlayer === 0 ? "text-red-700" : "text-blue-700"}`}
				>
					{winner === null &&
						`${players[currentPlayer] || `Player ${currentPlayer + 1}`}'s turn`}
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
								: `${players[currentPlayer]} wins!`
						}
						messageStyle={
							winner && winner === -1
								? "text-purple-700"
								: winner === 0
								? "text-red-700"
								: "text-blue-700"
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
