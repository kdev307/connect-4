import { ReactNode } from "react";

interface ButtonProps {
    style: string;
    text?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.FormEvent) => void;
    disabled?: boolean;
    icon?: ReactNode;
}

function Button({ style, text, onClick, disabled, type, icon }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
				text-3xl py-2 px-4 font-semibold rounded-full  border-2 bg-[#fff]  hover:text-white
			cursor-pointer w-full transition-colors duration-300 ease-in-out flex items-center justify-center gap-4 
			${style}`}
        >
            {icon}
            {text}
        </button>
    );
}

export default Button;
