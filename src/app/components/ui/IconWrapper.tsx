
interface IconWrapperProps {
    children?: React.ReactNode;
    className?: string;
}

const IconWrapper = ({ children, className }: IconWrapperProps) => {
    return (
        <div className={`flex items-center justify-center bg-slate-200 p-2.5 shadow rounded-xl ${className}`}>{children}</div>
    )
}

export default IconWrapper