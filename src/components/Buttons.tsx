interface ButtonProps {
	style: string;
	text: string;
	onClick: () => void;
	disabled?: boolean;
}

function Buttons({ style, text, onClick, disabled }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`text-3xl font-semibold py-4 px-8 rounded-full border-2 bg-[#fff] ${style} hover:text-[#fff]`}
		>
			{text}
		</button>
	);
}

export default Buttons;
