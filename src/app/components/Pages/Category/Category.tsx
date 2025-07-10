import { useEffect, useState } from 'react'
import Header from '../../ui/Header'
import CategoryTable from './components/CategoryTable'
import { CreateCategoryApi, DeleteCategoryApi, GetCategoriesApi, UpdateCategoryApi } from './api'
import type { CategoryFormData } from '../../../types/Types'
import CategoryModal from '../../Models/CategoryModal'
import { AxiosError } from 'axios'
import ConfirmModal from '../../Models/ConfirmModal'
import { IconCategory } from '@tabler/icons-react'
import IconWrapper from '../../ui/IconWrapper'
import Button from '../../ui/Button'
import { IconPlus } from '@tabler/icons-react'
import TableSkeleton from '../../ui/TableSkeleton'
const Category = () => {
    const [categories, setCategories] = useState<CategoryFormData[]>([])
    const [newCategory, setNewCategory] = useState<CategoryFormData>({ name: '', status: true });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState('create');
    const [open, setOpen] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');
    const [confirmOpen, setConfirmOpen] = useState(false);

    const columns = [
        {
            header: 'Category Name',
            accessorKey: 'name',
        },

    ]

    const getCategories = async () => {
        setLoading(true);
        try {

            const response = await GetCategoriesApi();
            if (!response) return
            setLoading(false);
            setCategories(response);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching categories:', error);
        }
    }

    const handleDeleteCategory = async () => {
        setLoading(true);
        try {
            const response = await DeleteCategoryApi(deleteCategoryId);
            if (response) {
                getCategories();
                setLoading(false);
                setConfirmOpen(false);
            } else {
                console.error('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            setLoading(false);
        }
    }
    console.log("Loading categories:", loading);
    const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await CreateCategoryApi(newCategory);

            if (response) {
                getCategories();
                setOpen(false);
                setLoading(false);
                setNewCategory({ name: '', status: true });
            }
        } catch (error) {
            setLoading(false);
            if (error instanceof AxiosError) {
                console.error('Error adding category:', error.response?.data?.message);
                setError(error.response?.data?.message);
            } else {
                console.error('Error adding category:', error);
            }
        }
    }
    const handleEditCategory = (category: CategoryFormData) => {
        setNewCategory(category);

        setChecked('update');
        setOpen(true);
    }

    const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        console.log("Updating category:", newCategory);
        if (!newCategory._id) {
            console.error('No category ID provided for update.');
            return;
        }
        try {
            const response = await UpdateCategoryApi(newCategory._id, {
                name: newCategory.name,
                status: newCategory.status
            });
            if (response) {
                getCategories();
                setOpen(false);
                setLoading(false);
                setNewCategory({ name: '', status: true });
            }
        } catch (error) {
            console.error('Error updating category:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])
    const handleOpen = (open: boolean) => {
        setNewCategory({ name: '', status: true });
        setOpen(open);
        setError('');
        setChecked('create');

    }
    const handleDelete = (id: string) => {
        setDeleteCategoryId(id);
        setConfirmOpen(true);
    }


    return (
        <div className='mt-8'>
            <Header title='Category'>
                <IconWrapper className="bg-slate-50 shadow-none border rounded-xl border-slate-100">
                    <IconCategory size={32} color="#f97316" />
                </IconWrapper>
            </Header>
            <div className='max-w-3xl ml-10  '>
                <div className='flex justify-between pb-6 px-2 items-center'>
                    <p className=' text-slate-900 font-medium text-xl  rounded'>Add Category</p>
                    <Button
                        className='rounded-lg text-[13px]'
                        onClick={() => handleOpen(true)}>
                        <IconPlus size={18} className="mr-1.5" color="#fff" />
                        Add Category
                    </Button>
                </div>

                {loading ? (
                    <TableSkeleton columns={columns.length} />
                )
                    : categories.length !== 0 ?
                        <CategoryTable
                            columns={columns}
                            data={categories}
                            onDelete={handleDelete}
                            onEdit={handleEditCategory}
                        /> : <div className="flex flex-col items-center justify-center h-64">
                            <IconWrapper>
                                <IconCategory size={32} color="#f97316" />
                            </IconWrapper>
                            <span className='text-slate-500'>No categories available.</span>
                            <span className='text-slate-500'>Add new items to manage your stock.</span>
                        </div>
                }

            </div>

            <ConfirmModal
                open={confirmOpen}
                handleOpen={setConfirmOpen}
                confirmDelete={handleDeleteCategory}
            />
            <CategoryModal
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                open={open}
                error={error}
                handleOpen={handleOpen}
                handleAddCategory={checked === 'create' ? handleAddCategory : undefined}
                handleUpdateCategory={checked === 'update' ? handleUpdateCategory : undefined}
                checked={checked}
                buttonText={checked === 'create' ? 'Submit' : 'Update'}
            />
        </div>
    )
}

export default Category