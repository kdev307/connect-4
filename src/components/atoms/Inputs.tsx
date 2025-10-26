interface InputProps {
    id: string;
    name: string;
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    placeholder?: string;
    type?: string;
    min?: number;
    max?: number;
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
    placeholder,
    type,
    min,
    max,
}: InputProps) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
            placeholder={placeholder}
            min={min}
            max={max}
            className={`flex-1 p-3 text-lg border rounded-md border-[#222] text-[#000] bg-[#fff] ${className}`}
        />
    );
}

export default Input;
