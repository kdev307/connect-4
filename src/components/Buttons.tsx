interface ButtonProps {
	style: string;
	text: string;
	type?: "button" | "submit" | "reset";
	onClick?: (e: React.FormEvent) => void;
	disabled?: boolean;
}

function Buttons({ style, text, onClick, disabled, type }: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
				text-3xl py-2 px-4 font-semibold rounded-full  border-2 bg-[#fff]  hover:text-white
			cursor-pointer"} 
			${style}`}
		>
			{text}
		</button>
	);
}

export default Buttons;
