import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Button from "./atoms/Buttons";
import InputModal from "./InputModal";
import PlayerInfo from "./PlayerInfo";
import Result from "./Result";
import ToolTip from "./atoms/ToolTip";
import { stopEndGameSound } from "../utils/sounds";
import { RoomPreferences, RestartAlt, Info as InfoIcon } from "@mui/icons-material";
import { Room } from "../types";
import { STATUSES } from "../constants";
import { updateRoomSettings } from "../firebase/service";

interface InfoProps {
    room: Room;
    roomCode: string | undefined;
    onReset: () => void;
    modal: boolean;
    onToggleInputModal: () => void;
}

function Info({ room, roomCode, onReset, modal, onToggleInputModal }: InfoProps) {
    const { board, players, winner, currentTurn, settings } = room;
    const { connectCount = 4, numPlayers = 2 } = settings ?? {};
    const auth = getAuth();
    const currentUserUid = auth.currentUser?.uid;

    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (winner !== null) {
            const timeoutId = setTimeout(() => setShowResult(true), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [winner]);

    const handleCloseResult = () => {
        setShowResult(false);
        stopEndGameSound();
    };

    if (!board || !settings) return <h3>Unable to load the board</h3>;

    const gameHasStarted = board
        .filter(Boolean)
        .some((row) => Array.isArray(row) && row.some((cell) => cell !== null));

    const handleSubmitSettings = async (newSettings: typeof settings) => {
        if (!roomCode) {
            console.error("Room not found!");
            return;
        }
        try {
            await updateRoomSettings(roomCode, newSettings);
        } catch (err) {
            console.error("Failed to update room settings:", err);
        }
    };

    return (
        <>
            <div className="mx-auto p-4 flex flex-col items-center justify-center gap-10">
                <ToolTip
                    text={`Align ${connectCount} of your discs — vertically, horizontally, or diagonally — to win!`}
                    direction="top"
                >
                    <Button
                        type="submit"
                        text="How to Win"
                        style="text-2xl text-[#5A002E] border-[#5A002E] hover:bg-[#5A002E] w-full"
                        icon={<InfoIcon fontSize="large" />}
                    />
                </ToolTip>

                <h2
                    className={`text-4xl text-center font-bold ${
                        winner !== null ||
                        (Object.keys(players).length < numPlayers && "!text-gray-700")
                    }`}
                    style={{ color: players[currentTurn]?.color }}
                >
                    {Object.keys(players).length < numPlayers
                        ? "Waiting for opponent(s). Share the code to invite."
                        : winner !== null
                        ? "Game Over!"
                        : players[currentTurn]?.uid === currentUserUid
                        ? `It's your turn ${players[currentTurn]?.name}`
                        : `Waiting for ${players[currentTurn]?.name} to move`}
                </h2>

                {showResult && winner !== null && (
                    <Result
                        onReset={() => {
                            onReset();
                            handleCloseResult();
                        }}
                        message={winner === -1 ? "It's a Draw" : `${players[winner]?.name} wins!`}
                        messageStyle={
                            winner === -1 ? "text-gray-700" : `color: ${players[winner]?.color}`
                        }
                        onClose={handleCloseResult}
                    />
                )}

                <PlayerInfo players={players} currentPlayer={currentTurn} />

                {!gameHasStarted && room.status !== STATUSES.READY && (
                    <ToolTip text="Click to restart the game." direction="top">
                        <Button
                            text="Restart Game"
                            onClick={onReset}
                            style="mt-4 text-[#560000] border-[#560000] hover:bg-[#560000] cursor-pointer"
                            icon={<RestartAlt fontSize="large" />}
                        />
                    </ToolTip>
                )}

                <ToolTip text="Customize the game according to you." direction="bottom">
                    <Button
                        text="Customize Game"
                        onClick={onToggleInputModal}
                        style="text-[#010e42] border-[#010e42] hover:bg-[#010e42]"
                        icon={<RoomPreferences fontSize="large" />}
                    />
                </ToolTip>
            </div>

            {modal && (
                <InputModal
                    onToggleInputModal={onToggleInputModal}
                    settings={settings}
                    onSubmit={handleSubmitSettings}
                />
            )}
        </>
    );
}

export default Info;
