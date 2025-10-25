import { useEffect, useRef, useState } from "react";
import GameBoard from "../GameBoard";
import Title from "../atoms/Title";
import Info from "../Info";
import { Board, Player, PlayerInfo, Room, Winner } from "../../types";
import {
    playDrawSound,
    playDropSound,
    playLoseSound,
    playWinSound,
    stopEndGameSound,
} from "../../utils/sounds";
import { Link, useNavigate, useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { leaveRoom, playMove, resetGame } from "../../firebase/service";
import Button from "../atoms/Buttons";
import ToolTip from "../atoms/ToolTip";
import { Logout } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import Loader from "../atoms/Loader";

function Connect4() {
    const [loading, setIsLoading] = useState<boolean>(true);
    const [room, setRoom] = useState<Room>({} as Room);
    const [board, setBoard] = useState<Board | null>(null);
    const [players, setPlayers] = useState<{
        [key: number]: PlayerInfo;
    }>({});
    const [currentPlayer, setCurrentPlayer] = useState<Player>(0);
    const [winner, setWinner] = useState<Winner>(null);
    const [winningCells, setWinningCells] = useState<[number, number][]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [lastMove, setLastMove] = useState<{
        row: number;
        col: number;
    } | null>(null);

    const { roomCode } = useParams();
    const navigate = useNavigate();
    const previousPlayersRef = useRef<{
        [key: number]: PlayerInfo;
    }>({});

    const handleToggleInputModal = () => setModal((prev) => !prev);

    const handleCellClick = async (column: number) => {
        if (winner) return;
        if (!roomCode || !board) return;
        if (Object.keys(players).length < 2) {
            alert("Waiting for another player to join.");
            return;
        }

        const auth = getAuth();
        const currentUid = auth.currentUser?.uid;
        const currentTurnUid = players[currentPlayer]?.uid;

        if (currentUid !== currentTurnUid) {
            alert("It's not your turn!");
            return;
        }

        // Find the lowest empty row in the selected column
        let targetRow = -1;
        for (let row = (room?.settings?.rows ?? 6) - 1; row >= 0; row--) {
            if (board[row][column] === null) {
                targetRow = row;
                break;
            }
        }
        if (targetRow === -1) return; // Column full

        try {
            await playMove(roomCode, column, currentPlayer);
            setLastMove({ row: targetRow, col: column });
            playDropSound();
        } catch (error) {
            console.error("Failed to play move:", error);
            alert(error);
        }
    };

    const handleResetGame = async () => {
        if (!roomCode) return;
        try {
            await resetGame(roomCode);
            stopEndGameSound();
        } catch (err) {
            console.error("Reset failed:", err);
        }
        setLastMove(null);
        setWinningCells([]);
    };

    const handleLeaveRoom = async () => {
        const auth = getAuth();
        const currentUid = auth.currentUser?.uid;
        if (!roomCode) return;

        try {
            stopEndGameSound();
            await leaveRoom(roomCode, currentUid);
            handleResetGame();
            navigate("/");
        } catch (err) {
            alert("Error leaving room: " + err);
        }
    };

    // Listen to room updates
    useEffect(() => {
        if (!roomCode) return;

        const roomRef = doc(db, "rooms", roomCode);

        const unsubscribe = onSnapshot(roomRef, (snap) => {
            if (!snap.exists()) {
                alert("Room not found");
                return;
            }

            const data = snap.data() as Room;

            setRoom(data); // store room data
            setIsLoading(false);

            // Parse board
            const rows = data.settings?.rows ?? 6;
            const columns = data.settings?.columns ?? 7;
            const rawBoard = data.board as Winner[] | Winner[][];
            let parsedBoard: Board;

            if (Array.isArray(rawBoard[0])) {
                // Already a 2D board
                parsedBoard = rawBoard as Board;
            } else {
                // Convert flat board (1D) into 2D grid
                parsedBoard = Array.from({ length: rows }, (_, i) =>
                    (rawBoard as Winner[]).slice(
                        i * columns,
                        i * columns + columns
                    )
                );
            }

            setBoard(parsedBoard);
            setCurrentPlayer(data.currentTurn);
            setWinner(data.winner ?? null);

            setWinningCells(
                Array.isArray(data.winningCells)
                    ? data.winningCells.map(
                          ({ row, col }: { row: number; col: number }) =>
                              [row, col] as [number, number]
                      )
                    : []
            );

            // Update players
            const newPlayers: { [key: number]: PlayerInfo } = {};
            for (const [key, value] of Object.entries(data.players || {})) {
                const playerData = value as PlayerInfo;
                if (playerData.name && playerData.uid) {
                    newPlayers[parseInt(key)] = playerData;
                }
            }

            // Notify if someone left
            const prevPlayers = previousPlayersRef.current;
            const currentUids = Object.values(newPlayers).map((p) => p.uid);
            const auth = getAuth();
            const currentUid = auth.currentUser?.uid;
            const leaver = Object.values(prevPlayers).find(
                (p) => !currentUids.includes(p.uid)
            );
            if (leaver && leaver.uid !== currentUid)
                alert(`${leaver.name} has left the room`);

            previousPlayersRef.current = newPlayers;
            setPlayers(newPlayers);
        });

        return () => unsubscribe();
    }, [roomCode]);

    // Play sounds on winner
    useEffect(() => {
        if (winner === null) return;
        if (winner !== null) setLastMove(null);
        if (Object.keys(players).length < 2) return;

        const auth = getAuth();
        const currentUid = auth.currentUser?.uid;

        if (winner === -1) {
            playDrawSound();
        } else if (players[winner]?.uid === currentUid) {
            playWinSound();
        } else {
            playLoseSound();
        }
    }, [winner, players]);

    return (
        <div className="m-auto p-4 flex flex-col items-center justify-center gap-4">
            <Link to="/">
                <Title
                    title="Play Connect 4"
                    style="text-7xl font-extrabold text-[#014210]"
                />
            </Link>

            <div className="flex items-center justify-center gap-20">
                <Title
                    title={`Room Code - ${roomCode}`}
                    style="text-5xl font-bold text-[#707]"
                />
                <ToolTip
                    text="Leave the room and return to the home page."
                    direction="right"
                >
                    <Button
                        type="submit"
                        text="Leave Room"
                        onClick={handleLeaveRoom}
                        style="text-2xl text-[#077] border-[#077] hover:bg-[#077] mx-auto"
                        icon={<Logout fontSize="large" />}
                    />
                </ToolTip>
            </div>
            {loading ? (
                <div className="flex flex-col items-start justify-center pt-80">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4 lg:gap-40 py-0 px-10 w-full">
                    <GameBoard
                        players={players}
                        board={board}
                        onCellClick={handleCellClick}
                        winner={winner}
                        winningCells={winningCells}
                        currentPlayer={currentPlayer}
                        lastMove={lastMove}
                        settings={{
                            rows: room?.settings?.rows ?? 6,
                            columns: room?.settings?.columns ?? 7,
                            connectCount: room?.settings?.connectCount ?? 4,
                        }}
                    />

                    <Info
                        room={room}
                        // players={players}
                        // currentPlayer={currentPlayer}
                        // winner={winner}
                        onReset={handleResetGame}
                        modal={modal}
                        onToggleInputModal={handleToggleInputModal}
                        // board={board}
                    />
                </div>
            )}
        </div>
    );
}

export default Connect4;
