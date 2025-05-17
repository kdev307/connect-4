import { Player } from "../types/Player"

interface CellProps{
    value: Player;
    onClick: ()=>void
}
function Cells({value, onClick}: CellProps) {
    return (
    <div className="w-40 h-40 flex items-center justify-center rounded-md" onClick={onClick}>
        <div className={`w-36 h-36 rounded-full shadow-md cursor-pointer   ${value === null ? "bg-white": value ==="Red" ? "bg-red-700": "bg-blue-700"} border-2 border-black` }></div>
    </div>
    )
}

export default Cells