import { Cell } from "../types";
import Coin from "./Coin";

interface CellProps {
    value: Cell;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    disabled: boolean;
}

function Cells({ value, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd, disabled }: CellProps) {
    return (
        <div className={`w-40 h-40 flex items-center justify-center rounded-md  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} onClick={disabled ? undefined : onClick}
        onMouseEnter={disabled ? undefined : onMouseEnter}
        onMouseLeave={disabled ? undefined : onMouseLeave}
        onTouchStart={disabled ? undefined : onTouchStart}
        onTouchEnd={disabled ? undefined : onTouchEnd}>
            <Coin coinColour={value === 0 ? "red" : value === 1 ? "blue" : "empty"} coinSize="size-36" />
        </div>
    );
}

export default Cells;
