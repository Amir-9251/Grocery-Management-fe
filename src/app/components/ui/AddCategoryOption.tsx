import { IconPlus } from '@tabler/icons-react';
import React from 'react';

interface AddCategoryOptionProps {
    onClick: () => void;
    className?: string;
}

const AddCategoryOption: React.FC<AddCategoryOptionProps> = ({ onClick, className = "" }) => {
    return (
        <div
            className={`px-3 py-3 my-1 items-center flex gap-4 cursor-pointer hover:bg-blue-100 rounded  ${className}`}
            onClick={onClick}
        >
            <div className=' p-1 rounded bg-orange-500'>
                <IconPlus size={16} color="#fff" />
            </div>
            <span className='text-sm text-slate-900 '>Add New Category</span>
        </div>
    );
};

export default AddCategoryOption; 