import { Dialog } from "radix-ui"
import Button from "../ui/Button"
import type { StockEntryFormData } from "../../types/Types";
import { IconBox } from "@tabler/icons-react";
import { IconStrikethrough } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconHash } from "@tabler/icons-react";
import { IconHourglass } from "@tabler/icons-react";
import { IconCategory } from "@tabler/icons-react";
import Badge from "../ui/Badge";

interface ConfirmModalProps {
    open: boolean;
    handleOpen: (open: boolean) => void;
    product: StockEntryFormData;
}

const ProductDetailModal = ({ open, handleOpen, product }: ConfirmModalProps) => {
    return (
        <div className='flex justify-between items-center '>
            <Dialog.Root open={open} onOpenChange={handleOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-black/30 z-40 backdrop-blur-sm' />
                    <Dialog.Content className='fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl px-8 py-12 w-full max-w-2xl'>
                        <Dialog.Title className='text-2xl ml-3 font-bold mb-4 text-slate-900'>Product Details</Dialog.Title>

                        <table className=' rounded-2xl py-2 px-8 flex flex-col '>
                            <tbody>
                                <tr className='flex items-center justify-between w-full border-b border-slate-200 py-6'>
                                    <td className='flex items-center gap-3'>
                                        <IconBox size={28} color="#f97316" />
                                        <span className='font-semibold text-lg text-slate-900'>Product Name</span>
                                    </td>
                                    <td className='text-slate-700 font-medium text-base'>{product.productName}</td>
                                </tr>
                                <tr className='flex items-center justify-between w-full border-b border-slate-200 py-6'>
                                    <td className='flex items-center gap-3'>
                                        <IconStrikethrough size={28} color="#f97316" />
                                        <span className='font-semibold text-lg text-slate-900'>Unit Price</span>
                                    </td>
                                    <td className='text-slate-700 font-medium text-base'>{product.Unitprice}</td>
                                </tr>

                                <tr className='flex items-center justify-between w-full border-b border-slate-200 py-6'>
                                    <td className='flex items-center gap-3'>
                                        <IconHash size={28} color="#f97316" />
                                        <span className='font-semibold text-lg text-slate-900'>Quantity</span>
                                    </td>
                                    <td className='text-slate-700 font-medium text-base'>{product.quantity === 0 ? <Badge status="expired" title="Out of Stock " /> : product.quantity}</td>
                                </tr>
                                {product.quantity !== 0 && <tr className='flex items-center justify-between w-full border-b border-slate-200 py-6'>
                                    <td className='flex items-center gap-3'>
                                        <IconHourglass size={28} color="#f97316" />
                                        <span className='font-semibold text-lg text-slate-900'>Expiry Date</span>
                                    </td>
                                    <td className='text-slate-700 font-medium text-base'>{product.ExpiryDate}</td>
                                </tr>}
                                <tr className='flex items-center justify-between w-full border-b border-slate-200 py-6'>
                                    <td className='flex items-center gap-3'>
                                        <IconCategory size={28} color="#f97316" />
                                        <span className='font-semibold text-lg text-slate-900'>Category</span>
                                    </td>
                                    <td className='text-slate-700 font-medium text-base'>{product.category?.name}</td>
                                </tr>
                                <tr className='flex items-center justify-between w-full border-b border-slate-200 py-6'>
                                    <td className='flex items-center gap-3'>
                                        <IconUser size={28} color="#f97316" />
                                        <span className='font-semibold text-lg text-slate-900'>Supplier</span>
                                    </td>
                                    <td className='text-slate-700 font-medium text-base'>{product.supplier}</td>
                                </tr>


                            </tbody>
                        </table>


                        <div className='flex justify-end gap-2 mt-4'>
                            <Dialog.Close asChild>
                                <Button type="button">Cancel</Button>
                            </Dialog.Close>

                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default ProductDetailModal