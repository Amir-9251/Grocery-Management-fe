interface StyledLabelProps {
    htmlFor: string;
    children: React.ReactNode;
}
const StyledLabel = ({ htmlFor, children }: StyledLabelProps) => {
    return (
        <label htmlFor={htmlFor} className="block ml-2 mb-2 text-sm font-medium text-slate-600">
            {children}
        </label>
    )
}

export default StyledLabel