import { Player, Winner } from '../types';
import InputModal from './InputModal';
import PlayerInfo from './PlayerInfo';

interface InfoProps {
    currentPlayer: Player;
    winner: Winner;
    onReset: () => void;
    modal: boolean;
    onToggleInputModal: () => void;
}

function Info({ currentPlayer, winner, onReset, modal, onToggleInputModal }: InfoProps) {
    return (
        <>
        <div className="mx-auto p-4 flex flex-col items-center justify-center gap-10">

            <h2 className={`text-4xl text-center font-bold 
                    ${currentPlayer === 0 ? "text-red-700" : "text-blue-700"} 
                    ${winner === -1 && "text-purple-700"}`}
                >
                    {
                        winner === -1 
                            ? 'Draw'
                            : winner !== null 
                            ? `Player ${winner + 1} wins!`
                            : `Player ${currentPlayer + 1}'s turn`
                    }
                </h2>

            <PlayerInfo currentPlayer={currentPlayer} />

            <button onClick={onReset} className="text-3xl font-semibold py-4 px-8 rounded-full bg-[#fff] text-[#560000] border-2 border-[#560000] hover:bg-[#560000] hover:text-[#fff]">
                Restart Game
            </button>
            <button onClick={onToggleInputModal}  className="text-3xl font-semibold py-4 px-8 rounded-full bg-[#fff] text-[#010e42] border-2 border-[#010e42] hover:bg-[#010e42] hover:text-[#fff]">
                Customize Game
            </button>
        </div>
        {modal && <InputModal onToggleInputModal={onToggleInputModal}/>}
        </>
    );
}

export default Info;
