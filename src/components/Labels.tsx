interface LabelProps {
    htmlFor: string;
    text: string;
    className?: string;
}

function Label({ htmlFor, text, className = "" }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`text-[1.6rem] font-semibold text-[#333] w-full ${className}`}
        >
            {text}
        </label>
    );
}

export default Label;
