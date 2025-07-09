import Select from "react-select";
import type { StylesConfig, GroupBase, ControlProps, CSSObjectWithLabel } from "react-select";

interface Option {
    value: string;
    label: string;
}
interface SelectProps {
    options: Option[];
    onChange: (selectedOption: Option | null) => void;
    name?: string;
    value?: Option | null;
    id?: string;
    placeholder?: string;
}

const StyledSelect = ({ options, onChange, name, placeholder, value, id }: SelectProps) => {
    const styleSelectStyles: StylesConfig<Option, false> = {
        control: (base: CSSObjectWithLabel, state: ControlProps<Option, false, GroupBase<Option>>) => ({
            ...base,
            backgroundColor: 'rgb(248 250 252)', // bg-slate-50
            borderRadius: '0.5rem', // rounded-lg
            borderColor: state.isFocused ? 'rgb(15, 23, 42)' : 'transparent', // focus:border-[15,23,42]
            boxShadow: state.isFocused ? '0 0 0 1px rgb(15, 23, 42)' : 'none', // focus:outline-[15,23,42]
            minHeight: 'auto',
            padding: '0',
            border: '1px solid transparent',
            fontSize: '0.875rem', // text-sm
            paddingLeft: '1rem', // px-4
            paddingRight: '1rem',
            paddingTop: '0.2rem', // py-3
            paddingBottom: '0.2rem',
            '&:hover': {
                borderColor: 'transparent',
            },
        }),
        placeholder: (base: CSSObjectWithLabel) => ({
            ...base,
            color: '#9ca3af', // placeholder:color-gray-400
            textTransform: 'capitalize', // placeholder:capitalize
        }),
        input: (base: CSSObjectWithLabel) => ({
            ...base,
            color: 'black',
        }),
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }),
        singleValue: (base: CSSObjectWithLabel) => ({
            ...base,
            color: 'black',
        }),
    };

    return (
        <div>
            <Select
                options={options}
                onChange={onChange}
                styles={styleSelectStyles}
                value={value}
                placeholder={placeholder || "Select..."}
                name={name}
                id={id}
            />
        </div>
    )
}

export default StyledSelect
