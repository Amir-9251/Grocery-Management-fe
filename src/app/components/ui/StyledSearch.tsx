import { IconSearch } from "@tabler/icons-react";

interface StyledInputProps {
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    className?: string;
    id: string;
    value?: string | number;
}

const StyledSearch = ({ type, onChange, placeholder, name, className, value, id }: StyledInputProps) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 top-1 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch size={18} className="text-gray-400" />
            </div>
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
                    rounded-3xl border-transparent
                    border
                    shadow-sm
                    text-[15PX]
                    placeholder:color-gray-400
                    placeholder:capitalize
                    bg-slate-50 border-gray-300
                    pl-10 pr-4 py-2
                    ${className}
                    focus:border-secondary focus:outline-none focus:bg-white`}
            />
        </div>
    )
}

export default StyledSearch