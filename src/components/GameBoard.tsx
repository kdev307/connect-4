import { useState } from "react";
import { Board, Player, Winner } from "../types";
import Cells from "./atoms/Cells";
import { COLUMNS } from "../constants";
import Coin from "./atoms/Coin";
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
            <div className="flex md:gap-5 mb-4">
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
					md:gap-5
					items-center
					justify-center "
            >
                {board.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="flex items-center justify-center md:gap-5"
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
            {/* <!-- Legs --> */}
            <div className="flex justify-between items-center gap-[45rem] mx-auto px-8 relative z-0">
                {/* <!-- Left Leg --> */}
                <div className="flex flex-col items-center relative -ml-[36rem]">
                    {/* <!-- Front leg --> */}
                    <div
                        className="relative z-10 w-8 h-[4.5rem] bg-[#444] rounded-t-sm shadow-inner 
                  [transform:skewX(-25deg)] origin-bottom-left
                  before:content-[''] before:absolute before:bottom-[-1rem] before:left-0 before:w-full before:h-4 
                  before:bg-[#222] before:shadow-md before:[transform:skewX(30deg)] before:origin-top-left"
                    ></div>

                    {/* <!-- Strap --> */}
                    <div
                        className="absolute top-[4rem] left-8 w-[2.35rem] h-[1.45rem] bg-[#222] z-10 
                  [transform:skewX(-70deg)_rotateY(30deg)]"
                    ></div>

                    {/* <!-- Back leg --> */}
                    <div
                        className="relative mt-[-4.5rem] w-8 h-12 bg-[#222] rounded-t-sm shadow-inner mr-[-8rem] 
                  [transform:skewX(25deg)] origin-bottom-right
                  before:content-[''] before:absolute before:bottom-[-1rem] before:left-0 before:w-full before:h-4 
                  before:bg-[#333] before:shadow-md before:z-10 before:[transform:skewX(-20deg)] before:origin-top-right"
                    ></div>
                </div>

                {/* <!-- Right Leg --> */}
                <div className="flex flex-col items-center relative -mr-[32rem]">
                    {/* <!-- Front leg --> */}
                    <div
                        className="relative z-10 w-8 h-[4.5rem] bg-[#444] rounded-t-sm shadow-inner 
                  [transform:skewX(-25deg)] origin-bottom-left
                  before:content-[''] before:absolute before:bottom-[-1rem] before:left-0 before:w-full before:h-4 
                  before:bg-[#222] before:shadow-md before:[transform:skewX(30deg)] before:origin-top-left"
                    ></div>

                    {/* <!-- Strap --> */}
                    <div
                        className="absolute top-[4rem] left-8 w-[2.35rem] h-[1.45rem] bg-[#222] z-10 
                  [transform:skewX(-70deg)_rotateY(30deg)]"
                    ></div>

                    {/* <!-- Back leg --> */}
                    <div
                        className="relative mt-[-4.5rem] w-8 h-12 bg-[#222] rounded-t-sm shadow-inner mr-[-8rem] 
                  [transform:skewX(25deg)] origin-bottom-right
                  before:content-[''] before:absolute before:bottom-[-1rem] before:left-0 before:w-full before:h-4 
                  before:bg-[#333] before:shadow-md before:z-10 before:[transform:skewX(-20deg)] before:origin-top-right"
                    ></div>
                </div>
            </div>

            {/* <!-- Base --> */}
            <div
                className="w-[90rem] h-80 bg-[#BC8F8F] mt-[-10rem] shadow-[0_8px_12px_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(255,255,255,0.07)] rounded-sm -z-10 
                [transform:skewX(-40deg)]
                before:content-[''] before:absolute before:bottom-[-2.4rem] before:left-[1rem] before:w-full 
                before:h-[2.8rem] before:bg-[#a98181] before:[transform:skewX(40deg)]
                after:content-[''] after:absolute after:top-[1.5rem] after:left-full after:w-[2.4rem] after:h-[98.6%] 
                after:bg-[#846464] after:[transform:skewY(50deg)]"
            ></div>
        </div>
    );
}

export default GameBoard;
