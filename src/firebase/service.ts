import { generateRoomCode } from "../utils/generateRoomCode";
import { db } from "../firebase/firebase";
import {  doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


export async function createRoom(playerName: string): Promise<string> {
	try {
		let roomCode = generateRoomCode();
		let exists = true;

		for (let i = 0; i < 5; i++) {
			const roomRef = doc(db, "rooms", roomCode);
			const roomSnap = await getDoc(roomRef);

			if (!roomSnap.exists()) {
				exists = false;
				await setDoc(roomRef, {
					board: Array(6).fill(null).map(() => Array(7).fill(null)).flat(),
					players: { 0: playerName },
					currentTurn: 0,
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

export async function joinRoom(roomCode: string, playerName: string): Promise<void> {
	const normalizedCode = roomCode.trim().toUpperCase();
	const roomRef = doc(db, "rooms", normalizedCode);
	const roomSnap = await getDoc(roomRef);

	if (!roomSnap.exists()) {
		throw new Error("Room does not exist.");
	}

	const data = roomSnap.data();
	const players = data.players || {};

	if (players["0"] && players["1"]) {
		throw new Error("Room is full.");
	}

	const playerIndex = players["0"] ? 1 : 0;
	players[playerIndex] = playerName;

	await updateDoc(roomRef, {
		players,
		status: "playing",
	});
}

