
import { Player } from "../types";
import Coin from "./Coin";

interface PlayerInfoProps {
    players: { [key: number]: {name: string, uid:string} };
    currentPlayer: Player;
}

const playerColors = ['Red', 'Blue', 'Yellow', 'Green'];

function PlayerInfo({players, currentPlayer }: PlayerInfoProps) {

    const getHighlightColor = (index: number) => {
        const colorMap: Record<string, string> = {
            red: "bg-red-100",
            blue: "bg-blue-100", 
            yellow: "bg-yellow-100", 
            green: "bg-green-100", 
        };
        return colorMap[playerColors[index].toLowerCase()] || "bg-gray-100";
    };

    return (
        <div className="p-4">
            <h3 className="text-3xl font-medium mb-4">Number of Players: {Object.keys(players).length}</h3>
            <ul className="overflow-y-auto flex flex-col gap-10 w-full">
            {Object.entries(players).map(([key, player], index) => {
                    const isCurrentPlayer = currentPlayer === index;
                    const playerClass = isCurrentPlayer ? getHighlightColor(index) : "";

                    return (
                        <li key={key} className={`flex items-center space-x-3 ${playerClass} py-2 px-4 rounded-full`}>
                            <Coin coinColour={playerColors[index]} coinSize="size-20" />
                            <span className={`text-xl ${isCurrentPlayer ? "font-bold" : ""}`}>{player.name}</span>

                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PlayerInfo;
