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
        <div className="relative w-96">
            <div className="absolute inset-y-0 top-1 left-0 pl-4 flex items-center pointer-events-none">
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
                    rounded-3xl 
                    border
                    text-[15PX]
                    placeholder:color-gray-400
                    placeholder:capitalize
                    bg-white border-orange-300
                    pl-11 pr-4 py-3
                    ${className}
                    focus:border-secondary focus:outline-none focus:bg-white`}
            />
        </div>
    )
}

export default StyledSearch