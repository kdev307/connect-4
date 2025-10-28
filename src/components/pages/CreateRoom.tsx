import { useState } from "react";
import Title from "../atoms/Title";
import Button from "../atoms/Buttons";
import { Link, useNavigate } from "react-router";
import { createRoom } from "../../firebase/service";
import ToolTip from "../atoms/ToolTip";
import { DashboardCustomize, ArrowBack } from "@mui/icons-material";
import Label from "../atoms/Labels";
import Input from "../atoms/Inputs";
import {
    DEFAULT_COLUMNS,
    DEFAULT_CONNECT_COUNT,
    DEFAULT_PLAYERS,
    DEFAULT_ROWS,
} from "../../constants";

function CreateRoom() {
    const [formData, setFormData] = useState({
        name: "",
        rows: DEFAULT_ROWS,
        columns: DEFAULT_COLUMNS,
        numPlayers: DEFAULT_PLAYERS,
        connectCount: DEFAULT_CONNECT_COUNT,
    });
    const [custom, setCustom] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "name") {
            setFormData((prev) => ({ ...prev, name: value }));
            return;
        }

        let numValue = Number(value);

        // enforce limits manually
        if (name === "numPlayers") numValue = Math.min(Math.max(numValue, 2), 8);
        if (name === "rows") numValue = Math.min(Math.max(numValue, 6), 10);
        if (name === "columns") numValue = Math.min(Math.max(numValue, 7), 10);
        if (name === "connectCount")
            numValue = Math.min(Math.max(numValue, 4), Math.min(formData.rows, formData.columns));

        setFormData((prev) => ({ ...prev, [name]: numValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert("Please enter a name.");
            return;
        }

        try {
            const roomOptions = {
                rows: formData.rows || DEFAULT_ROWS,
                columns: formData.columns || DEFAULT_COLUMNS,
                numPlayers: formData.numPlayers || DEFAULT_PLAYERS,
                connectCount: formData.connectCount || DEFAULT_CONNECT_COUNT,
            };

            const roomCode = await createRoom(formData.name.trim(), roomOptions);
            navigate(`/room/${roomCode}`);
        } catch (error) {
            console.error(error);
            alert("Error creating room.");
        }
    };

    const inputClass =
        "w-full p-4 text-xl box-border border !rounded-full border-[#222] text-[#000] placeholder:text-[#666] placeholder:text-xl placeholder-opacity-50 bg-[#fff]";

    return (
        <div className="mx-auto p-6 max-w-2xl mt-40 shadow-xl rounded-2xl">
            <Title
                title="Create Room"
                style="text-4xl font-bold text-[#560000] mb-10 text-center"
            />

            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                {/* Player Name */}
                <div className="flex flex-col gap-3">
                    <Label htmlFor="name" text="Your Name:" />
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className={inputClass}
                    />
                </div>

                {/* Room Type Toggle */}
                <div className="flex gap-4 justify-center">
                    <div className="w-full">
                        <ToolTip text="Play with the standard 2-player grid." direction="left">
                            <Button
                                type="button"
                                text="Default"
                                onClick={() => setCustom(false)}
                                style={`px-6 py-2 rounded-full font-semibold border-[#995400] transition-all shadow-md ${
                                    !custom
                                        ? "!bg-[#995400] text-white hover:bg-[#744000]"
                                        : "bg-[#e5e5e5] text-[#995400] hover:bg-[#744000]"
                                }`}
                            />{" "}
                        </ToolTip>
                    </div>
                    <div className="w-full">
                        <ToolTip
                            text="Customize board size, players & connection rules."
                            direction="right"
                        >
                            <Button
                                type="button"
                                text="Custom"
                                onClick={() => setCustom(true)}
                                style={`px-6 py-2 rounded-full font-semibold border-[#995400] transition-all shadow-md ${
                                    custom
                                        ? "!bg-[#995400] text-white hover:bg-[#995400]"
                                        : "bg-[#e5e5e5] text-[#995400] hover:bg-[#744000]"
                                }`}
                            />
                        </ToolTip>
                    </div>
                </div>

                {/* Custom Room Form */}
                {custom && (
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <ToolTip text="Set the number of players (3-8)." direction="left">
                                <div className="flex flex-col gap-2 p-4 rounded-2xl">
                                    <Label htmlFor="numPlayers" text="Number of Players" />
                                    <Input
                                        id="numPlayers"
                                        name="numPlayers"
                                        type="number"
                                        value={formData.numPlayers}
                                        onChange={handleChange}
                                        required
                                        min={2}
                                        max={8}
                                        className={inputClass}
                                    />
                                </div>
                            </ToolTip>

                            <ToolTip
                                text="Set the minimum number of connections to win (4 to min(rows, cols))."
                                direction="right"
                            >
                                <div className="flex flex-col gap-2 p-4 rounded-2xl">
                                    <Label htmlFor="connectCount" text="Minimum Connections" />
                                    <Input
                                        id="connectCount"
                                        name="connectCount"
                                        type="number"
                                        value={formData.connectCount}
                                        onChange={handleChange}
                                        required
                                        min={4}
                                        max={Math.min(formData.rows, formData.columns)}
                                        className={inputClass}
                                    />
                                </div>
                            </ToolTip>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <ToolTip
                                text="Set the number of rows in the grid (6-10)."
                                direction="left"
                            >
                                <div className="flex flex-col gap-2 p-4 rounded-2xl">
                                    <Label htmlFor="rows" text="Grid Rows" />
                                    <Input
                                        id="rows"
                                        name="rows"
                                        type="number"
                                        value={formData.rows}
                                        onChange={handleChange}
                                        required
                                        min={6}
                                        max={10}
                                        className={inputClass}
                                    />
                                </div>
                            </ToolTip>

                            <ToolTip
                                text="Set the number of columns in the grid (7-10)."
                                direction="right"
                            >
                                <div className="flex flex-col gap-2 p-4 rounded-2xl">
                                    <Label htmlFor="columns" text="Grid Columns" />
                                    <Input
                                        id="columns"
                                        name="columns"
                                        type="number"
                                        value={formData.columns}
                                        onChange={handleChange}
                                        required
                                        min={7}
                                        max={10}
                                        className={inputClass}
                                    />
                                </div>
                            </ToolTip>
                        </div>
                    </div>
                )}

                <ToolTip text="Click to create a new game room." direction="right">
                    <Button
                        type="submit"
                        text="Create Room"
                        style="text-2xl text-[#010e42] border-[#010e42] hover:bg-[#010e42]"
                        icon={<DashboardCustomize fontSize="large" />}
                    />
                </ToolTip>
            </form>

            <Link to="/">
                <Button
                    type="button"
                    text="Go Back"
                    style="mt-4 text-2xl text-[#62422e] border-[#62422e] hover:bg-[#62422e]"
                    icon={<ArrowBack fontSize="large" />}
                />
            </Link>
        </div>
    );
}

export default CreateRoom;
