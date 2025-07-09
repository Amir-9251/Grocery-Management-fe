interface StyledInputProps {
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    className?: string;
    id: string;
    value?: string | number;
}

const StyledInput = ({ type, onChange, placeholder, name, className, value, id }: StyledInputProps) => {
    return (
        <input
            type={type || "text"}
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            min={0}
            onChange={onChange}
            className={`
                mt-1 block w-full
                rounded-xl border-transparent
                border
                shadow-sm
                text-[15PX]
                placeholder:color-gray-400
                placeholder:capitalize
                bg-slate-50 border-gray-300
                px-4 py-3
                ${className}
                focus:border-secondary focus:outline-none focus:bg-white`}
        />
    )
}

export default StyledInput