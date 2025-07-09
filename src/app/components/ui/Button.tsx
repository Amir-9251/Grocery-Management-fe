
interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, children, className, disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-secondary shadow cursor-pointer flex justify-center items-center  h-10 text-white text-[16px] font-semibold px-4 py-2 rounded-md hover:bg-hover ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
