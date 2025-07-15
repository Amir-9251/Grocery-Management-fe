import * as Dialog from '@radix-ui/react-dialog'
import type { CategoryFormData, StockEntryFormData } from '../../types/Types';
import Button from '../ui/Button';
import StyledInput from '../ui/StyledInput';
import StyledLabel from '../ui/StyledLabel';
import { useCallback, useEffect, useState } from 'react';
import StyledSelect from '../ui/StyledSelect';
import { CreateCategoryApi, GetCategoriesApi } from '../Pages/Category/api';
import AddCategoryOption from '../ui/AddCategoryOption';
import CategoryModal from './CategoryModal';

interface Option {
    _id?: string; // Optional ID for the category
    value: string;
    label: string;
}

interface ModalProps {
    updatedProduct?: StockEntryFormData;
    setUpdatedProduct?: React.Dispatch<React.SetStateAction<StockEntryFormData>>;
    handleAddProduct?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleUpdateProduct?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    open?: boolean;
    checked?: string;
    handleOpen?: (open: boolean) => void;
}

const ProductModal = ({
    updatedProduct,
    setUpdatedProduct,
    handleAddProduct,
    handleUpdateProduct,
    open = false,
    checked = 'create',
    handleOpen

}: ModalProps) => {
    const [Categories, setCategories] = useState<Option[]>([])
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState<CategoryFormData>({
        name: '',
        status: true // Default status
    });
    const [formData, setFormData] = useState<StockEntryFormData>({
        productName: '',
        code: '',
        quantity: 0,
        Unitprice: 0,
        supplier: '',
        ExpiryDate: '',
        category: { name: '', status: true } // Default category
    });

    // If updatedProduct changes, pre-fill the form
    useEffect(() => {
        if (updatedProduct) {
            setFormData(updatedProduct);
        }
    }, [updatedProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        if (updatedProduct && setUpdatedProduct) {
            setUpdatedProduct(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleCategoryChange = (selectedOption: Option | null) => {
        const categoryId = selectedOption?._id || '';
        setFormData((prevData) => ({
            ...prevData,
            categoryId: categoryId
        }));
        if (updatedProduct && setUpdatedProduct) {
            setUpdatedProduct(prev =>
            ({
                ...prev, categoryId: categoryId,
                category: { name: selectedOption?.label || '' }
            }));
        }
    }

    const handleAddCategoryClick = () => {
        setCategoryModalOpen(true);
    };


    const handleAddCategory = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await CreateCategoryApi(category);
        setCategoryModalOpen(false);
        setCategory({ name: '', status: true }); // Reset category state
    }, [category]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await GetCategoriesApi(1, 5);
            const categoryOptions: Option[] = categories.categories
                .filter((category: { name: string, status: boolean }) => category.status) // keep only active
                .map((category: { name: string, _id: string }) => ({
                    _id: category._id,
                    value: category.name,
                    label: category.name
                }));
            setCategories(categoryOptions);
        };

        fetchCategories();
    }, [handleAddCategory]);

    return (<div className='flex justify-between items-center '>
        <Dialog.Root open={open} onOpenChange={handleOpen}>

            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40' />
                <Dialog.Content className='fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl'>
                    <Dialog.Title className='text-[26px] ml-2 py-3 text-slate-900 font-bold mb-4'>{checked === 'create' ? 'Add Product' : 'Update Product'}</Dialog.Title>
                    <div className="border border-slate-100 rounded-2xl px-6 py-10 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                        <form onSubmit={checked === 'create' ? handleAddProduct : handleUpdateProduct} className="flex flex-col gap-4">
                            <div className='grid grid-cols-2 gap-x-16 gap-y-4'>

                                <div>
                                    <StyledLabel
                                        htmlFor="productName">Product Name</StyledLabel>
                                    <StyledInput
                                        type="text"
                                        placeholder="Product Name"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        id="productName"
                                        name="productName"

                                    />
                                </div>
                                <div>
                                    <StyledLabel
                                        htmlFor="Categories">Categories</StyledLabel>
                                    <StyledSelect
                                        options={Categories}
                                        name='Categories'
                                        value={formData.category && formData.category.name ? { value: formData.category.name, label: formData.category.name, } : null}
                                        placeholder='Select a category'
                                        onChange={handleCategoryChange}
                                        id="Categories"
                                        AddCategoryComponent={AddCategoryOption}
                                        onAddCategoryClick={handleAddCategoryClick}
                                    />
                                </div>
                                <div>
                                    <StyledLabel htmlFor="productCode">Product Code</StyledLabel>
                                    <StyledInput
                                        type="text"
                                        placeholder="Product Code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        name="code"
                                        id="productCode"
                                    />
                                </div>
                                <div>
                                    <StyledLabel htmlFor="quantity">Quantity</StyledLabel>
                                    <StyledInput
                                        type="number"
                                        placeholder="Quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        name="quantity"
                                        id="quantity"
                                    />
                                </div>
                                <div>
                                    <StyledLabel htmlFor="Unitprice">Unit Price</StyledLabel>
                                    <StyledInput
                                        type="number"
                                        placeholder="Price"
                                        value={formData.Unitprice}
                                        onChange={handleChange}
                                        id="Unitprice"
                                        name="Unitprice"
                                    />
                                </div>
                                <div>
                                    <StyledLabel htmlFor="supplier">Supplier</StyledLabel>
                                    <StyledInput
                                        type="text"
                                        placeholder="Supplier Name"
                                        value={formData.supplier}
                                        onChange={handleChange}
                                        id="supplier"
                                        name="supplier"
                                    />
                                </div>
                                <div>
                                    <StyledLabel htmlFor="expire-date">Expire Date</StyledLabel>
                                    <StyledInput
                                        type="date"
                                        value={formData.ExpiryDate}
                                        onChange={handleChange}
                                        name="ExpiryDate"
                                        id="expire-date"
                                    />
                                </div>
                            </div>
                            <div className='flex items-center gap-3 mt-4'>
                                <Dialog.Close asChild>
                                    <button type='button' className='px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-300'>Cancel</button>
                                </Dialog.Close>
                                <Button className="px-5  rounded-lg" type="submit">
                                    {checked === 'create' ? 'Submit' : 'Update Product'}
                                </Button>

                            </div>
                        </form>
                    </div >

                    <CategoryModal
                        open={categoryModalOpen}
                        handleOpen={() => setCategoryModalOpen(false)}
                        buttonText='Add Category'
                        newCategory={category}
                        setNewCategory={setCategory}
                        checked='create'
                        handleAddCategory={handleAddCategory}
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </div>)
}
export default ProductModal;