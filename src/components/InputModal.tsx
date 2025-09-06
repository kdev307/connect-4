import { useState } from "react";
import Button from "./Buttons";
import Close from "@mui/icons-material/Close";
import Input from "./Inputs";
import Label from "./Labels";
import ToolTip from "./ToolTip";
import { RocketLaunch } from "@mui/icons-material";

interface InputModalProps {
    onToggleInputModal: () => void;
}

function InputModal({ onToggleInputModal }: InputModalProps) {
    const [formData, setFormData] = useState({
        numPlayers: 2,
        rows: 6,
        columns: 7,
        connectCount: 4,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm backdrop-bbottomness-50"
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

                <form className="grid grid-cols-1 gap-8">
                    <div className="flex gap-x-6 my-6">
                        <ToolTip
                            text="Set the number of players (minimum 2)."
                            direction="bottom"
                        >
                            <div className="flex flex-col w-full gap-2">
                                <Label
                                    htmlFor="numPlayers"
                                    text="Number of Players"
                                />
                                <Input
                                    id="numPlayers"
                                    name="numPlayers"
                                    value={formData.numPlayers}
                                    onChange={handleChange}
                                    onFocus={() => {}}
                                    onBlur={() => {}}
                                    required
                                />
                            </div>
                        </ToolTip>

                        <ToolTip
                            text="Set the minimum number of connections to win."
                            direction="bottom"
                        >
                            <div className="flex flex-col w-full gap-2">
                                <Label
                                    htmlFor="connectCount"
                                    text="Minimum Connections"
                                />
                                <Input
                                    id="connectCount"
                                    name="connectCount"
                                    value={formData.connectCount}
                                    onChange={handleChange}
                                    onFocus={() => {}}
                                    onBlur={() => {}}
                                    required
                                />
                            </div>
                        </ToolTip>
                    </div>

                    <div className="flex gap-x-6 my-6">
                        <ToolTip
                            text="Set the number of rows in the grid."
                            direction="top"
                        >
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="rows" text="Grid Rows" />
                                <Input
                                    id="rows"
                                    name="rows"
                                    value={formData.rows}
                                    onChange={handleChange}
                                    onFocus={() => {}}
                                    onBlur={() => {}}
                                    required
                                />
                            </div>
                        </ToolTip>

                        <ToolTip
                            text="Set the number of columns in the grid."
                            direction="top"
                        >
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="columns" text="Grid Columns" />
                                <Input
                                    id="columns"
                                    name="columns"
                                    value={formData.columns}
                                    onChange={handleChange}
                                    onFocus={() => {}}
                                    onBlur={() => {}}
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
