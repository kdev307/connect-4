import { useEffect, useState } from "react";
import { Board, Player, Winner } from "../types";
import Buttons from "./Buttons";
// import InputModal from "./InputModal";
import PlayerInfo from "./PlayerInfo";
import Result from "./Result";
import { stopEndGameSound } from "../utils/sounds";
import { getAuth } from "firebase/auth";
import ToolTip from "./ToolTip";

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
            const timeoutId = setTimeout(() => {
                setShowResult(true);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [winner]);

    const handleCloseResult = () => {
        setShowResult(false);
        stopEndGameSound();
    };

    if (!board) return <h3>Unable to load the board</h3>;
    const gameHasStarted = board.some((row) =>
        row.some((cell) => cell !== null)
    );
    return (
        <>
            <div className="mx-auto p-4 flex flex-col items-center justify-center gap-10">
                <ToolTip
                    text="Align four of your discs — vertically, horizontally, or diagonally — to win!"
                    direction="top"
                >
                    <Buttons
                        type="submit"
                        text="How to Win"
                        style="text-2xl text-[#5A002E] border-[#5A002E] hover:bg-[#5A002E] w-full"
                    />
                </ToolTip>
                <h2
                    className={`text-4xl text-center font-bold 
		${currentPlayer === 0 ? "text-[#f00]" : "text-[#00f]"} ${
                        winner !== null ||
                        (Object.keys(players).length < 2 && "!text-purple-600")
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
                                ? "text-[#f00]"
                                : "text-[#00f]"
                        }
                        onClose={handleCloseResult}
                    />
                )}
                <PlayerInfo players={players} currentPlayer={currentPlayer} />

                <ToolTip text="Click to restart the game." direction="bottom">
                    <Buttons
                        text="Restart Game"
                        onClick={onReset}
                        disabled={!gameHasStarted}
                        style={`${
                            !gameHasStarted
                                ? "text-gray-600 border-gray-600 cursor-not-allowed hover:bg-gray-600"
                                : "text-[#560000] border-[#560000] hover:bg-[#560000] cursor-pointer"
                        }`}
                    />
                </ToolTip>
                {/* <Buttons text="Customize Game" onClick={onToggleInputModal} style="text-[#010e42] border-[#010e42] hover:bg-[#010e42] "/> */}
            </div>
            {/* {modal && <InputModal onToggleInputModal={onToggleInputModal}/>} */}
        </>
    );
}

export default Info;
