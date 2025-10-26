import { useState } from "react";
import Button from "./atoms/Buttons";
import Close from "@mui/icons-material/Close";
import Input from "./atoms/Inputs";
import Label from "./atoms/Labels";
import ToolTip from "./atoms/ToolTip";
import { RocketLaunch } from "@mui/icons-material";
import { GameSettings } from "../types";

interface InputModalProps {
    onToggleInputModal: () => void;
    settings: GameSettings;
    onSubmit: (newSettings: GameSettings) => void;
}

function InputModal({ onToggleInputModal, settings, onSubmit }: InputModalProps) {
    const [formData, setFormData] = useState({
        numPlayers: settings.numPlayers,
        rows: settings.rows,
        columns: settings.columns,
        connectCount: settings.connectCount,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let numValue = Number(value);

        // enforce limits manually
        if (name === "numPlayers") numValue = Math.min(Math.max(numValue, 2), 8);
        if (name === "rows") numValue = Math.min(Math.max(numValue, 6), 10);
        if (name === "columns") numValue = Math.min(Math.max(numValue, 7), 10);
        if (name === "connectCount")
            numValue = Math.min(Math.max(numValue, 4), Math.min(formData.rows, formData.columns));

        setFormData((prev) => ({ ...prev, [name]: numValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onToggleInputModal();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
            onClick={onToggleInputModal}
        >
            <div
                className="relative w-fit flex flex-col bg-white rounded-xl p-10 border-2 border-[#422801]"
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    icon={<Close fontSize="large" />}
                    onClick={onToggleInputModal}
                    style="self-end py-4 text-[#422801] border-none hover:bg-[#422801] !w-fit"
                />
                <h2 className="text-5xl text-[#01423a] font-semibold p-2 my-4 text-center">
                    Customize the Game
                </h2>

                <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit}>
                    <div className="flex gap-x-6 my-6">
                        <ToolTip text="Set the number of players (minimum 2)." direction="bottom">
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="numPlayers" text="Number of Players" />
                                <Input
                                    id="numPlayers"
                                    name="numPlayers"
                                    value={formData.numPlayers}
                                    onChange={handleChange}
                                    min={formData.numPlayers}
                                    max={8}
                                    required
                                />
                            </div>
                        </ToolTip>

                        <ToolTip
                            text="Set the minimum number of connections to win."
                            direction="bottom"
                        >
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="connectCount" text="Minimum Connections" />
                                <Input
                                    id="connectCount"
                                    name="connectCount"
                                    value={formData.connectCount}
                                    onChange={handleChange}
                                    min={4}
                                    max={Math.min(formData.rows, formData.columns)}
                                    required
                                />
                            </div>
                        </ToolTip>
                    </div>

                    <div className="flex gap-x-6 my-6">
                        <ToolTip text="Set the number of rows in the grid." direction="top">
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="rows" text="Grid Rows" />
                                <Input
                                    id="rows"
                                    name="rows"
                                    value={formData.rows}
                                    onChange={handleChange}
                                    min={6}
                                    max={10}
                                    required
                                />
                            </div>
                        </ToolTip>

                        <ToolTip text="Set the number of columns in the grid." direction="top">
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="columns" text="Grid Columns" />
                                <Input
                                    id="columns"
                                    name="columns"
                                    value={formData.columns}
                                    onChange={handleChange}
                                    min={7}
                                    max={10}
                                    required
                                />
                            </div>
                        </ToolTip>
                    </div>

                    <Button
                        text="Start Customized Game"
                        type="submit"
                        style="text-[#373636] border-[#373636] hover:bg-[#373636] hover:text-white py-4 px-8 rounded-full"
                        icon={<RocketLaunch fontSize="large" />}
                    />
                </form>
            </div>
        </div>
    );
}

export default InputModal;
