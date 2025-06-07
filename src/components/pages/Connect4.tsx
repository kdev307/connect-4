import { useEffect, useRef, useState } from "react";
import GameBoard from "../GameBoard";
import Title from "../Title";
import Info from "../Info";
import { Board, Player, Winner } from "../../types";
import {
    playDrawSound,
    playDropSound,
    playLoseSound,
    playWinSound,
    stopEndGameSound,
} from "../../utils/sounds";
import { useNavigate, useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { leaveRoom, playMove, resetGame } from "../../firebase/service";
import Buttons from "../Buttons";
import { COLUMNS, ROWS } from "../../constants";
import { getAuth } from "firebase/auth";

function Connect4() {
    const [board, setBoard] = useState<Board | null>(null);

    const [players, setPlayers] = useState<{
        [key: number]: { name: string; uid: string };
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

    const handleToggleInputModal = () => {
        setModal((prev) => !prev);
    };

    const handleCellClick = async (column: number) => {
        if (winner) return;
        if (!roomCode) return;
        if (Object.entries(players).length < 2) {
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

        try {
            if (!board) return;
            let targetRow: number = -1;

            for (let row = ROWS - 1; row >= 0; row--) {
                if (board[row][column] === null) {
                    targetRow = row;
                    break;
                }
            }
            await playMove(roomCode, column, currentPlayer);
            setLastMove({ row: targetRow, col: column });
            // playSound("drop.mp3");
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
            // stopSound();
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
            // stopSound();
            stopEndGameSound();
            await leaveRoom(roomCode, currentUid);
            handleResetGame();
            navigate("/");
        } catch (err) {
            alert("Error leaving room: " + err);
        }
    };

    const previousPlayersRef = useRef<{
        [key: number]: { name: string; uid: string };
    }>({});

    useEffect(() => {
        if (!roomCode) return;

        const roomRef = doc(db, "rooms", roomCode);

        const unsubscribe = onSnapshot(roomRef, (snap) => {
            if (!snap.exists()) {
                alert("Room not found");
                return;
            }

            const data = snap.data();

            let parsedBoard: Board;
            if (Array.isArray(data.board[0])) {
                parsedBoard = data.board;
            } else {
                parsedBoard = Array.from({ length: ROWS }, (_, i) =>
                    data.board.slice(i * COLUMNS, i * COLUMNS + COLUMNS)
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

            const newPlayers: { [key: number]: { name: string; uid: string } } =
                {};
            for (const [key, value] of Object.entries(data.players || {})) {
                const playerData = value as { name: string; uid: string };
                if (playerData.name && playerData.uid) {
                    newPlayers[parseInt(key)] = playerData;
                }
            }

            const prevPlayers = previousPlayersRef.current;
            const currentUids = Object.values(newPlayers).map((p) => p.uid);

            const auth = getAuth();
            const currentUid = auth.currentUser?.uid;

            const leaver = Object.values(prevPlayers).find(
                (p) => !currentUids.includes(p.uid)
            );

            if (leaver && leaver.uid !== currentUid) {
                alert(`${leaver.name} has left the room`);
            }

            // Update
            previousPlayersRef.current = newPlayers;
            setPlayers(newPlayers);
        });

        return () => unsubscribe();
    }, [roomCode]);

    useEffect(() => {
        if (winner === null) return;
        if (winner !== null) setLastMove(null);
        if (Object.keys(players).length < 2) return;

        const auth = getAuth();
        const currentUid = auth.currentUser?.uid;

        if (winner === -1) {
            // playSound("draw.mp3");
            playDrawSound();
        } else if (players[winner]?.uid === currentUid) {
            // playSound("win.mp3");
            playWinSound();
        } else {
            // playSound("lose.mp3");
            playLoseSound();
        }
    }, [winner, players]);

    return (
        <div className="m-auto p-4 flex flex-col items-center justify-center gap-4">
            <Title
                title="Play Connect 4"
                style="text-7xl font-extrabold text-[#014210]"
            />
            <div className="flex items-center justify-center gap-20">
                <Title
                    title={`Room Code - ${roomCode}`}
                    style="text-5xl font-bold text-[#707]"
                />
                <Buttons
                    type="submit"
                    text="Leave Room"
                    onClick={handleLeaveRoom}
                    style="text-2xl text-[#077] border-[#077] hover:bg-[#077] mx-auto"
                />
            </div>
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4 lg:gap-40 py-0 px-10 w-full">
                <GameBoard
                    players={players}
                    board={board}
                    onCellClick={handleCellClick}
                    winner={winner}
                    winningCells={winningCells}
                    currentPlayer={currentPlayer}
                    lastMove={lastMove}
                />
                <Info
                    players={players}
                    currentPlayer={currentPlayer}
                    winner={winner}
                    onReset={handleResetGame}
                    modal={modal}
                    onToggleInputModal={handleToggleInputModal}
                    board={board}
                />
            </div>
        </div>
    );
}

export default Connect4;
