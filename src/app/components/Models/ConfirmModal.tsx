import { Dialog } from "radix-ui"
import Button from "../ui/Button"
import { IconAlertTriangle } from "@tabler/icons-react";

interface ConfirmModalProps {
    open: boolean;
    handleOpen: (open: boolean) => void;
    confirmDelete: () => void;
}

const ConfirmModal = ({ open, handleOpen, confirmDelete }: ConfirmModalProps) => {
    return (
        <div className='flex justify-between items-center'>
            <Dialog.Root open={open} onOpenChange={handleOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/30 z-40 backdrop-blur-sm' />
                    <Dialog.Content className='fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-8 w-full max-w-md'>
                        <Dialog.Title className='text-xl font-bold mb-4'>Confirm Deletion</Dialog.Title>
                        <div className='mt-4 border border-gray-50 p-4 rounded-2xl shadow-sm py-8 flex flex-col items-center'>
                            <IconAlertTriangle className='mb-6' color='red' size={48} strokeWidth={1} />
                            <p className='text-slate-700'>Are you sure you want to delete this category?</p>

                        </div>
                        <div className='flex justify-end gap-2 mt-4'>
                            <Dialog.Close asChild>
                                <button type='button' className='px-4 py-2 rounded-lg font-semibold bg-slate-100 border-none outline-none text-slate-700 hover:bg-slate-300'>Cancel</button>
                            </Dialog.Close>
                            <Button type='button' className='rounded-lg' onClick={confirmDelete}>Delete</Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default ConfirmModal