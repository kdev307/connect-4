import { Board } from "../types"
import Cells from "./Cells"

interface GameBoardProps{
  board: Board,
  onCellClick: (columnIndex: number)=> void
}

function GameBoard({board, onCellClick}: GameBoardProps) {
  return (
    <div className="w-fit mx-auto p-10 bg-[#f6f5d0] flex flex-col gap-10 items-center justify-center border-2 rounded-xl">
      {board.map((row, rowIndex)=>(
        <div key={rowIndex} className="flex items-center justify-center gap-10">
          {row.map((cell, columnIndex)=>(
            <Cells key={columnIndex}
            value={cell}
            onClick={() => onCellClick(columnIndex)}/>
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameBoard