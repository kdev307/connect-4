import { useState } from "react";
import { Board, Player, Winner } from "../types";
import Cells from "./Cells";
import { COLUMNS } from "../constants";
import Coin from "./Coin";
import { getAuth } from "firebase/auth";

interface GameBoardProps {
    players: { [key: number]: { name: string; uid: string } };
    board: Board | null;
    onCellClick: (columnIndex: number) => void;
    winner: Winner;
    winningCells: [number, number][];
    currentPlayer: Player;
    lastMove: { row: number; col: number } | null;
}

function GameBoard({
    players,
    board,
    onCellClick,
    winner,
    currentPlayer,
    lastMove,
    winningCells,
}: GameBoardProps) {
    const [hoverColumn, setHoverColumn] = useState<number | null>(null);
    if (!board) return <h3>Unable to load the board</h3>;

    const auth = getAuth();
    const currentUserUid = auth.currentUser?.uid;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-5 mb-4">
                {Array.from({ length: COLUMNS }).map((_, colIndex) => (
                    <div
                        key={colIndex}
                        className="size-36 opacity-75 flex items-center justify-center"
                    >
                        {winner === null &&
                            hoverColumn === colIndex &&
                            players[currentPlayer]?.uid === currentUserUid && (
                                <Coin
                                    coinColour={
                                        currentPlayer === 0 ? "red" : "blue"
                                    }
                                    coinSize="size-32"
                                />
                            )}
                    </div>
                ))}
            </div>

            <div
                className="
					relative
					bg-[#2C2C2C]
					p-6
					shadow-lg
					before:content-['']
					before:absolute
					before:top-[-10px]
					before:left-[5px]
					before:w-full
					before:h-[10px]
					before:bg-[#3a3a3a]
					before:-skew-x-[40deg]
					before:z-[-1]
					after:content-['']
					after:absolute
					after:top-[-5px]
					after:left-full
					after:w-[9px]
					after:h-full
					after:bg-[#1e1e1e]
					after:-skew-y-[50deg]
					after:z-[-1]
					flex
					flex-col
					gap-5
					items-center
					justify-center "
            >
                {board.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="flex items-center justify-center gap-5"
                    >
                        {row.map((cell, columnIndex) => (
                            <Cells
                                key={columnIndex}
                                value={cell}
                                onClick={() => onCellClick(columnIndex)}
                                onMouseEnter={() => setHoverColumn(columnIndex)}
                                onMouseLeave={() => setHoverColumn(null)}
                                onTouchStart={() => setHoverColumn(columnIndex)}
                                onTouchEnd={() => setHoverColumn(null)}
                                disabled={winner !== null}
                                animateDrop={
                                    winner === null &&
                                    lastMove?.row === rowIndex &&
                                    lastMove?.col === columnIndex
                                }
                                isWinningCell={winningCells.some(
                                    ([r, c]) =>
                                        r === rowIndex && c === columnIndex
                                )}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {/* <div className="flex justify-between w-full px-8 mt-4">
				<div className="w-6 h-16 bg-[#1e1e1e] rounded-t-sm shadow-inner shadow-black/40" />
				<div className="w-6 h-16 bg-[#1e1e1e] rounded-t-sm shadow-inner shadow-black/40" />
			</div> */}
        </div>
    );
}

export default GameBoard;
