import * as Dialog from '@radix-ui/react-dialog'
import type { CategoryFormData } from '../../types/Types';
import Button from '../ui/Button';
import StyledInput from '../ui/StyledInput';
import StyledLabel from '../ui/StyledLabel';
import SwitchButton from '../ui/Switch/Switch';


interface ModalProps {
    newCategory?: CategoryFormData;
    setNewCategory?: React.Dispatch<React.SetStateAction<CategoryFormData>>;
    handleAddCategory?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleUpdateCategory?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    open?: boolean;
    checked?: string;
    buttonText?: string;
    handleOpen?: (open: boolean) => void;
    error?: string;

}

const CategoryModal = ({
    newCategory,
    setNewCategory,
    handleAddCategory,
    handleUpdateCategory,
    open = false,
    checked,
    buttonText,
    handleOpen,
    error

}: ModalProps) => {


    return (<div className='flex justify-between items-center'>
        <Dialog.Root open={open} onOpenChange={handleOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/30 z-40 backdrop-blur-sm' />
                <Dialog.Content className='fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 w-full max-w-md'>
                    <Dialog.Title className='text-xl font-bold mb-4'>Add Category</Dialog.Title>
                    <form onSubmit={checked === 'create' ? handleAddCategory : handleUpdateCategory} className='flex flex-col gap-4'>
                        <div>
                            <StyledLabel htmlFor='name'>Name</StyledLabel>
                            <StyledInput
                                placeholder='Enter category name'
                                name='name'
                                type='text'
                                value={newCategory?.name}
                                onChange={e => setNewCategory && setNewCategory(c => ({ ...c, name: e.target.value }))}
                                id='name'
                            />
                            <p className="mt-2 ml-2 text-sm text-red-600 dark:text-red-500">{error}</p>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
                            <SwitchButton
                                value={newCategory?.status ? "on" : "off"}
                                isOn={newCategory?.status}
                                onChange={(checked: boolean) =>
                                    setNewCategory && setNewCategory(c => ({ ...c, status: checked }))} />

                        </div>
                        <div className='flex justify-end gap-2 mt-4'>
                            <Dialog.Close asChild>
                                <button type='button' className='px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-300'>Cancel</button>
                            </Dialog.Close>
                            <Button type='submit' className='rounded-lg'>{buttonText}</Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </div>)
}
export default CategoryModal;