import { generateRoomCode } from "../utils/generateRoomCode";
import { db } from "../firebase/firebase";
import {
	deleteDoc,
	doc,
	getDoc,
	setDoc,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { isWinner } from "../utils/isWinner";
import { Board, Cell, Player, Winner } from "../types";
import { COLUMNS, ROWS } from "../constants";

export async function createRoom(playerName: string): Promise<string> {
	try {
		let roomCode = generateRoomCode();
		let exists = true;

		const auth = getAuth();
		if (!auth.currentUser) {
			await signInAnonymously(auth);
		}
		const uid = auth.currentUser?.uid;

		for (let i = 0; i < 5; i++) {
			const roomRef = doc(db, "rooms", roomCode);
			const roomSnap = await getDoc(roomRef);

			if (!roomSnap.exists()) {
				exists = false;
				await setDoc(roomRef, {
					board: Array(ROWS)
						.fill(null)
						.map(() => Array(COLUMNS).fill(null))
						.flat(),
					players: { 0: { name: playerName, uid } },
					currentTurn: 0,
					winner: null,
					status: "waiting",
					createdAt: new Date().toISOString(),
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

export async function joinRoom(
	roomCode: string,
	playerName: string
): Promise<void> {
	const auth = getAuth();
	if (!auth.currentUser) {
		await signInAnonymously(auth);
	}
	const uid = auth.currentUser?.uid;

	const normalizedCode = roomCode.trim().toUpperCase();
	const roomRef = doc(db, "rooms", normalizedCode);
	const roomSnap = await getDoc(roomRef);

	if (!roomSnap.exists()) {
		throw new Error("Room does not exist.");
	}

	const data = roomSnap.data();
	const players = data.players || {};

	for (const key in players) {
		if (players[key] === playerName) {
			throw new Error("This name is already taken in the room.");
		}
	}

	if (players["0"] && players["1"]) {
		throw new Error("Room is full.");
	}

	const playerIndex = players["0"] ? 1 : 0;
	players[playerIndex] = { name: playerName, uid };

	await updateDoc(roomRef, {
		players,
		status: "playing",
	});
}
	export async function leaveRoom(roomCode: string, playerID: string | undefined): Promise<void> {
	const normalizedCode = roomCode.trim().toUpperCase();
	console.log("Leaving room:", normalizedCode, "Player:", playerID);
	
	const roomRef = doc(db, "rooms", normalizedCode);
	const roomSnap = await getDoc(roomRef);

	if (!roomSnap.exists()) {
		console.error("Room not found.");
		throw new Error("Room not found.");
	}

	const data = roomSnap.data();
	const players = data.players || {};

	for (const key in players) {
		if (players[key].uid === playerID) {
			delete players[key];
		}
	}

	const isEmpty = Object.keys(players).length === 0;

	try {
		if (isEmpty) {
			await deleteDoc(roomRef);
		} else {
			await updateDoc(roomRef, {
				players,
				status: "waiting",
			});
		}
	} catch (err) {
		console.error("Firestore update error:", err);
	}
}


export async function playMove(
	roomCode: string,
	column: number,
	player: Player
): Promise<void> {
	const roomRef = doc(db, "rooms", roomCode);
	const roomSnap = await getDoc(roomRef);

	if (!roomSnap.exists()) throw new Error("Room does not exist");

	const data = roomSnap.data();
	const flatBoard: Cell[] = data.board;
	const currentTurn: Player = data.currentTurn;
	const winner: Winner = data.winner;

	const board: Board = [];
	for (let row = 0; row < ROWS; row++) {
		board.push(flatBoard.slice(row * COLUMNS, (row + 1) * COLUMNS));
	}

	if (winner !== null) throw new Error("Game is already finished");
	if (player !== currentTurn) throw new Error("It's not your turn");

	let rowToPlace = -1;
	for (let row = ROWS - 1; row >= 0; row--) {
		if (board[row][column] === null) {
			rowToPlace = row;
			break;
		}
	}

	if (rowToPlace === -1) throw new Error("Column is full");

	board[rowToPlace][column] = player;

	let newWinner: Winner = null;
	let winningCoords: [number, number][] | null = null;

	winningCoords = isWinner(board, rowToPlace, column, player);
	if (winningCoords) {
		newWinner = player;
	} else if (board.every((row) => row.every((cell) => cell !== null))) {
		newWinner = -1;
	}

	const updatedFlatBoard = board.flat();

	const updateData = {
		board: updatedFlatBoard,
		currentTurn: newWinner === null ? (player === 0 ? 1 : 0) : currentTurn,
		winner: newWinner,
		winningCells: winningCoords?.map(([r, c]) => ({ row: r, col: c })) ?? [],
		updatedAt: Timestamp.now(),
		status: newWinner !== null && newWinner !== -1 ? "finished" : "playing",
	};

	await updateDoc(roomRef, updateData);
}

export async function resetGame(roomCode: string): Promise<void> {
	const roomRef = doc(db, "rooms", roomCode);
	const emptyBoard: Board = Array(ROWS)
		.fill(null)
		.map(() => Array(COLUMNS).fill(null))
		.flat();

	await updateDoc(roomRef, {
		board: emptyBoard,
		currentTurn: 0,
		winner: null,
		winningCells:[],
		status: "playing",
		updatedAt: Timestamp.now(),
	});
}
