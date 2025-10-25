interface InputProps {
    id: string;
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

function Input({
    id,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    required = false,
    className = "",
}: InputProps) {
    return (
        <input
            type="number"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            className={`flex-1 p-3 text-lg border rounded-md border-[#222] text-[#000] bg-[#fff] ${className}`}
        />
    );
}

export default Input;
