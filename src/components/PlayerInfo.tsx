import { Player } from "../types";
import Coin from "./atoms/Coin";

interface PlayerInfoProps {
    players: { [key: number]: { name: string; uid: string; color: string } };
    currentPlayer: Player;
}

function PlayerInfo({ players, currentPlayer }: PlayerInfoProps) {
    return (
        <div className="p-4">
            <h3 className="text-3xl font-medium mb-4">
                Number of Players: {Object.keys(players).length}
            </h3>
            <ul className="overflow-y-auto flex flex-col gap-10 w-full">
                {Object.entries(players).map(([key, player]) => {
                    const playerIndex = parseInt(key);
                    const isCurrentPlayer = currentPlayer === playerIndex;
                    const playerColor = player.color;
                    return (
                        <li
                            key={key}
                            className={`flex items-center space-x-3 py-2 px-4 rounded-full`}
                            style={{
                                backgroundColor: isCurrentPlayer
                                    ? playerColor + "33"
                                    : undefined,
                            }} // light background
                        >
                            <Coin coinColour={playerColor} coinSize="size-20" />
                            <span
                                className={`text-xl ${
                                    isCurrentPlayer ? "font-bold" : ""
                                }`}
                            >
                                {player.name}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PlayerInfo;
