import { Player } from "../types/Player"
import Coin from "./Coin";

interface CellProps{
    value: Player;
    onClick: ()=>void
}
function Cells({value, onClick}: CellProps) {
    return (
        <div className="w-40 h-40 flex items-center justify-center rounded-md" onClick={onClick}>
            <Coin coinColour={value ?? "empty"} coinSize="size-36"/>
        </div>
    )
}

export default Cells