import { Cell } from "../types";
import Coin from "./Coin";

interface CellProps {
    value: Cell;
    onClick: () => void;
}

function Cells({ value, onClick }: CellProps) {
    return (
        <div className="w-40 h-40 flex items-center justify-center rounded-md" onClick={onClick}>
            <Coin coinColour={value === 0 ? "red" : value === 1 ? "blue" : "empty"} coinSize="size-36" />
        </div>
    );
}

export default Cells;
