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
			className={`text-3xl font-semibold py-2 px-4 rounded-full cursor-pointer border-2 bg-[#fff] ${style} hover:text-[#fff]`}
		>
			{text}
		</button>
	);
}

export default Buttons;
