
import { Player } from "../types";
import Coin from "./Coin";

interface PlayerInfoProps {
    players: { [key: number]: {name: string, uid:string} };
    currentPlayer: Player;
}


function PlayerInfo({players, currentPlayer }: PlayerInfoProps) {

    return (
        <div className="p-4">
            <h3 className="text-3xl font-medium mb-4">Number of Players: {Object.keys(players).length}</h3>
            <ul className="overflow-y-auto flex flex-col gap-10 w-full">
                {Object.entries(players).map(([key, player], index) => {
                    const isCurrentPlayer = currentPlayer === index;
                    const playerBackgroundColor = 
                        isCurrentPlayer
                            ? (index === 0 ? "bg-red-200" : "bg-blue-200")
                            : "";

                    return (
                        <li
                            key={key}
                            className={`flex items-center space-x-3 ${playerBackgroundColor} py-2 px-4 rounded-full`}
                        >
                            <Coin coinColour={index === 0 ? "red" : "blue"} coinSize="size-20" />
                            <span className={`text-xl ${isCurrentPlayer ? "font-bold" : ""}`}>
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
