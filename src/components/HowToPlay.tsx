import { useState } from "react";

function HowToPlay() {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto mt-14 px-6">
            <div className="border-b border-[#560000]">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex justify-between items-center py-4 group cursor-pointer"
                >
                    <h2
                        className={`text-2xl sm:text-3xl font-bold text-[#560000] tracking-tight transition-colors ${
                            open
                                ? "text-[#560000]"
                                : "group-hover:text-[#560000]/80"
                        }`}
                    >
                        How to Play
                    </h2>
                    <svg
                        className={`w-7 h-7 text-[#560000] transform transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    open ? "max-h-2xl mt-6" : "max-h-0 mt-0"
                }`}
            >
                <dl className="space-y-6 text-xl sm:text-2xl text-[#450000] font-medium leading-relaxed">
                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Create or Join a Room:
                        </dt>
                        <dd className="ml-4">
                            Start a new match by creating a room or enter a code
                            to join your friend.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Share the Code:
                        </dt>
                        <dd className="ml-4">
                            After creating a room, send your unique room code to
                            the other player.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Start Playing:
                        </dt>
                        <dd className="ml-4">
                            Players take turns dropping discs into the columns
                            of the board.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold text-[#450000] underline">
                            Connect Four to Win:
                        </dt>
                        <dd className="ml-4">
                            Align four of your discs — vertically, horizontally,
                            or diagonally — to win!
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

export default HowToPlay;
