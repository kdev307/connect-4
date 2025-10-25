import { Cell } from "../../types";
import Coin from "./Coin";

interface CellProps {
    value: Cell;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    disabled: boolean;
    animateDrop?: boolean;
    isWinningCell?: boolean;
}

function Cells({
    value,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    disabled,
    animateDrop,
    isWinningCell,
}: CellProps) {
    return (
        <div
            className={`size-36 flex items-center justify-center rounded-md
                ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            `}
            onClick={disabled ? undefined : onClick}
            onMouseEnter={disabled ? undefined : onMouseEnter}
            onMouseLeave={disabled ? undefined : onMouseLeave}
            onTouchStart={disabled ? undefined : onTouchStart}
            onTouchEnd={disabled ? undefined : onTouchEnd}
        >
            <Coin
                coinColour={
                    value === 0 ? "red" : value === 1 ? "blue" : "empty"
                }
                coinSize="size-20 md:size-32"
                shouldAnimate={animateDrop}
                isWinning={isWinningCell}
            />
        </div>
    );
}

export default Cells;
