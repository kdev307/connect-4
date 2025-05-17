import Buttons from "./Buttons";

interface ResultProps {
	onReset: ()=> void;
	onClose: ()=>void;
	message: string;
	messageStyle:string;
}

function Result({onReset,onClose, message, messageStyle}: ResultProps) {
    return (
    <div
			className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm backdrop-brightness-50"

		>
			<div
				className="relative w-1/3 flex flex-col bg-white rounded-xl p-10 border-2 border-[#422801]"
				onClick={(e) => e.stopPropagation()}
			>
                <button
					onClick={onClose}
					className="self-end text-3xl font-semibold px-2 py-0 rounded-full bg-[#fff] text-[#422801] border-2 border-[#422801] hover:bg-[#422801] hover:text-[#fff]"
				>
					X
				</button>
				<h2 className="text-5xl text-[#01423a] font-semibold p-2 my-4 text-center">
					Game Over
				</h2>

				<h3 className={`text-3xl text-center font-bold p-2 h-16  ${messageStyle}`}> {message}</h3>
				<Buttons
					text="Play Again"
					onClick={onReset}
					style="text-[#560000] border-[#560000] hover:bg-[#560000]"/>
				
			</div>
		</div>
    )
}

export default Result;