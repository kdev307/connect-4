import { Player } from '../types/Player';
import PlayerInfo from './PlayerInfo';

interface MessageProps {
    currentPlayer: Player;
    winner: Player;
    onReset: () => void;
}

function Message({ currentPlayer, winner, onReset }: MessageProps) {
    return (
        <div className="mx-auto p-4 flex flex-col items-center justify-center gap-10">
            <h2 className={`text-4xl text-center font-bold ${currentPlayer === "Red" ? "text-red-700" : "text-blue-700"}`}>
                {winner ? `${winner} wins!` : `${currentPlayer}'s turn`}
            </h2>

            {/* Display PlayerInfo to show the current player */}
            <PlayerInfo currentPlayer={currentPlayer} />

            <button onClick={onReset} className="text-3xl font-semibold py-4 px-8 rounded-full bg-[#fff] text-[#560000] border-2 border-[#560000] hover:bg-[#560000] hover:text-[#fff]">
                Restart Game
            </button>
        </div>
    );
}

export default Message;
