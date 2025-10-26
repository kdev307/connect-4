import { generateRoomCode } from "../utils/generateRoomCode";
import { db } from "../firebase/firebase";
import { deleteDoc, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { isWinner } from "../utils/isWinner";
import { Board, Cell, Player, Winner } from "../types";
import {
    DEFAULT_COLUMNS,
    DEFAULT_ROWS,
    DEFAULT_PLAYERS,
    DEFAULT_CONNECT_COUNT,
    STATUSES,
} from "../constants";
import { getShuffledColors } from "../utils/getShuffledColors";

// Create Room
export async function createRoom(
    playerName: string,
    settings: {
        rows: number;
        columns: number;
        numPlayers: number;
        connectCount: number;
    }
): Promise<string> {
    try {
        let roomCode = generateRoomCode();
        const shuffledColors = getShuffledColors(settings.numPlayers);
        let exists = true;

        const auth = getAuth();
        if (!auth.currentUser) await signInAnonymously(auth);
        const uid = auth.currentUser?.uid;

        for (let i = 0; i < 5; i++) {
            const roomRef = doc(db, "rooms", roomCode);
            const roomSnap = await getDoc(roomRef);

            if (!roomSnap.exists()) {
                exists = false;

                const board: Board = Array(settings.rows)
                    .fill(null)
                    .map(() => Array(settings.columns).fill(null))
                    .flat();

                await setDoc(roomRef, {
                    board,
                    players: {
                        0: { name: playerName, uid, color: shuffledColors[0] },
                    },
                    currentTurn: 0,
                    winner: null,
                    status: STATUSES.WAITING,
                    createdAt: new Date().toISOString(),
                    settings: {
                        rows: settings.rows,
                        columns: settings.columns,
                        numPlayers: settings.numPlayers,
                        connectCount: settings.connectCount,
                        shuffledColors,
                    },
                });
                break;
            }

            roomCode = generateRoomCode();
        }

        if (exists) throw new Error("Could not generate unique room code");
        return roomCode;
    } catch (err) {
        console.error("Firestore error:", err);
        throw err;
    }
}

// Join Room
export async function joinRoom(roomCode: string, playerName: string): Promise<void> {
    const auth = getAuth();
    if (!auth.currentUser) await signInAnonymously(auth);
    const uid = auth.currentUser?.uid;

    const normalizedCode = roomCode.trim().toUpperCase();
    const roomRef = doc(db, "rooms", normalizedCode);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) throw new Error("Room does not exist.");

    const data = roomSnap.data();
    const players = data.players || {};
    const settings = data.settings || {
        rows: DEFAULT_ROWS,
        columns: DEFAULT_COLUMNS,
        numPlayers: DEFAULT_PLAYERS,
        connectCount: DEFAULT_CONNECT_COUNT,
        shuffledColors: getShuffledColors(DEFAULT_PLAYERS),
    };

    // Check if name is already taken
    for (const key in players) {
        if (players[key].name === playerName) throw new Error("Name already taken.");
    }

    // Check if room is full
    if (Object.keys(players).length >= settings.numPlayers) {
        throw new Error(`Room is full. Max players: ${settings.numPlayers}`);
    }

    // Assign next available player index
    let playerIndex = 0;
    while (players[playerIndex]) playerIndex++;

    // Assign the color from the stored shuffled array
    const playerColor = settings.shuffledColors[playerIndex];

    players[playerIndex] = { name: playerName, uid, color: playerColor };

    await updateDoc(roomRef, {
        players,
        status:
            Object.keys(players).length === settings.numPlayers
                ? STATUSES.PLAYING
                : STATUSES.WAITING,
    });
}

// Leave Room
export async function leaveRoom(roomCode: string, playerID: string | undefined): Promise<void> {
    const normalizedCode = roomCode.trim().toUpperCase();
    const roomRef = doc(db, "rooms", normalizedCode);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) throw new Error("Room not found.");

    const data = roomSnap.data();
    const players = data.players || {};

    for (const key in players) {
        if (players[key].uid === playerID) delete players[key];
    }

    const isEmpty = Object.keys(players).length === 0;

    try {
        if (isEmpty) {
            await deleteDoc(roomRef);
        } else {
            await updateDoc(roomRef, {
                players,
                status: STATUSES.WAITING,
            });
        }
    } catch (err) {
        console.error("Firestore update error:", err);
    }
}

// Play Move
export async function playMove(roomCode: string, column: number, player: Player): Promise<void> {
    const roomRef = doc(db, "rooms", roomCode);
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) throw new Error("Room does not exist");

    const data = roomSnap.data();
    const settings = data.settings || {
        rows: DEFAULT_ROWS,
        columns: DEFAULT_COLUMNS,
        numPlayers: DEFAULT_PLAYERS,
        connectCount: DEFAULT_CONNECT_COUNT,
    };
    const flatBoard: Cell[] = data.board;
    const currentTurn: Player = data.currentTurn;
    const winner: Winner = data.winner;

    // Convert flat board to 2D
    const board: Board = [];
    for (let row = 0; row < settings.rows; row++) {
        board.push(flatBoard.slice(row * settings.columns, (row + 1) * settings.columns));
    }

    if (winner !== null) throw new Error("Game is already finished");
    if (player !== currentTurn) throw new Error("It's not your turn");

    let rowToPlace = -1;
    for (let row = settings.rows - 1; row >= 0; row--) {
        if (board[row][column] === null) {
            rowToPlace = row;
            break;
        }
    }

    if (rowToPlace === -1) throw new Error("Column is full");

    board[rowToPlace][column] = player;

    let newWinner: Winner = null;
    let winningCoords: [number, number][] | null = null;

    winningCoords = isWinner(board, rowToPlace, column, player, settings.connectCount);
    if (winningCoords) {
        newWinner = player;
    } else if (board.every((row) => row.every((cell) => cell !== null))) {
        newWinner = -1;
    }

    const updatedFlatBoard = board.flat();

    await updateDoc(roomRef, {
        board: updatedFlatBoard,
        currentTurn: newWinner === null ? (player + 1) % settings.numPlayers : currentTurn,
        winner: newWinner,
        winningCells: winningCoords?.map(([r, c]) => ({ row: r, col: c })) ?? [],
        updatedAt: Timestamp.now(),
        status: newWinner !== null && newWinner !== -1 ? STATUSES.FINISHED : STATUSES.PLAYING,
    });
}

// Reset Game
export async function resetGame(roomCode: string): Promise<void> {
    const roomRef = doc(db, "rooms", roomCode);
    const roomSnap = await getDoc(roomRef);
    if (!roomSnap.exists()) throw new Error("Room does not exist");

    const data = roomSnap.data();
    const settings = data.settings || {
        rows: DEFAULT_ROWS,
        columns: DEFAULT_COLUMNS,
        numPlayers: DEFAULT_PLAYERS,
        connectCount: DEFAULT_CONNECT_COUNT,
    };

    const emptyBoard: Board = Array(settings.rows)
        .fill(null)
        .map(() => Array(settings.columns).fill(null))
        .flat();

    await updateDoc(roomRef, {
        board: emptyBoard,
        currentTurn: 0,
        winner: null,
        winningCells: [],
        status: STATUSES.PLAYING,
        updatedAt: Timestamp.now(),
    });
}
