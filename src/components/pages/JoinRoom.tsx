import { useState } from "react";
import Title from "../Title";
import Buttons from "../Buttons";
import { Link, useNavigate } from "react-router";
import { joinRoom } from "../../firebase/service";
import ToolTip from "../ToolTip";

function JoinRoom() {
    const [name, setName] = useState<string>("");
    const [roomCode, setRoomCode] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await joinRoom(roomCode, name.trim());
            navigate(`/room/${roomCode.trim().toUpperCase()}`);
        } catch (error) {
            console.error(error);
            alert("Error joining room.");
        }
    };
    return (
        <div className="mx-auto p-6 max-w-md shadow-xl mt-40 rounded-2xl">
            <Title
                title="Join Room"
                style="text-4xl font-bold text-[#560000] mb-10"
            />
            <form
                className="mx-auto flex flex-col gap-10"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-5">
                    <label
                        htmlFor="name"
                        className="text-[1.8rem] font-semibold text-[#333] text-left"
                    >
                        Your Name:
                    </label>
                    <input
                        type="text"
                        className="w-full p-4 text-xl box-border border rounded-full border-[#222] text-[#000] placeholder:text-[#666] placeholder:text-xl placeholder-opacity-50 bg-[#fff]"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        htmlFor="roomCode"
                        className="text-[1.8rem] font-semibold text-[#333] text-left"
                    >
                        Room Code:
                    </label>
                    <input
                        type="text"
                        className="w-full p-4 text-xl box-border border rounded-full border-[#222] text-[#000] placeholder:text-[#666] placeholder:text-xl placeholder-opacity-50 bg-[#fff]"
                        name="roomCode"
                        id="roomCode"
                        placeholder="Enter Room Code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                </div>
                <ToolTip
                    text="Enter a room code and join your friend's game."
                    direction="right"
                >
                    <Buttons
                        type="submit"
                        text="Join Room"
                        style="text-2xl text-[#010e42] border-[#010e42] hover:bg-[#010e42] w-full"
                    />
                </ToolTip>
            </form>
            <Link to="/">
                <Buttons
                    type="button"
                    text="Go Back"
                    // onClick={handleSubmit}
                    style="mt-4 text-2xl text-[#62422e] border-[#62422e] hover:bg-[#62422e] w-full"
                />
            </Link>
        </div>
    );
}

export default JoinRoom;
