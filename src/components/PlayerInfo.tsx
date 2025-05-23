
import { Player } from "../types";
import Coin from "./Coin";

interface PlayerInfoProps {
    numPlayer?: number;
    currentPlayer: Player;
}

const playerColors = ['Red', 'Blue', 'Yellow', 'Green'];

function PlayerInfo({ numPlayer = 2, currentPlayer }: PlayerInfoProps) {

    const selectedColors = playerColors.slice(0, numPlayer);
    const getHighlightColor = (color: string) => {
        const colorMap: Record<string, string> = {
            red: "bg-red-100",
            blue: "bg-blue-100", 
            yellow: "bg-yellow-100", 
            green: "bg-green-100", 
        };
        return colorMap[color.toLowerCase()] || "bg-gray-100";
    };

    return (
        <div className="p-4">
            <h3 className="text-3xl font-medium mb-4">Number of Players: {numPlayer}</h3>
            <ul className="overflow-y-auto flex flex-col gap-10 w-full">
                {selectedColors.map((color, index) => {
                    const isCurrentPlayer = currentPlayer === index;
                    const playerClass = isCurrentPlayer ? getHighlightColor(color) : "";
                    return (
                        <li key={index} className={`flex items-center space-x-3 ${playerClass} py-2 px-4 rounded-full`}>
                            <Coin coinColour={color} coinSize="size-20" />
                            <span className="text-xl">{`Player ${index + 1}`}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PlayerInfo;
