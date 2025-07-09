
import Header from "../../ui/Header"
import type { StockEntryFormData } from '../../../types/Types';
import ProductTable from "../../ProductTable";
import { formatDate } from "../../../utils/FormateDate";
import { useProducts } from "./hooks";
import { lazy, useState } from "react";
import ConfirmModal from "../../Models/ConfirmModal";
import { IconBox } from "@tabler/icons-react";
import IconWrapper from "../../ui/IconWrapper";
import Button from "../../ui/Button";
import { IconPlus } from "@tabler/icons-react";
import ProductDetailModal from "../../Models/ProductDetailModal";
import Loader from "../../../animations/Loading";
const ProductModal = lazy(() => import("../../Models/ProductModal"));


interface columnsType {
    header: string;
    accessorKey: string;
}


const Products = () => {

    const { products, deleteProduct, loading, createProduct, updateProduct } = useProducts()
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<StockEntryFormData | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState<string>('');
    const [updatedProduct, setUpdatedProduct] = useState<StockEntryFormData>({
        code: '',
        productName: '',
        Unitprice: 0,
        supplier: '',
        quantity: 0,
        ExpiryDate: '',
        category: { name: '', status: true }
    });

    const [checked, setChecked] = useState('create');
    // const [open, setOpen] = useState(false);

    const formattedProducts = products?.map((product: StockEntryFormData) => ({
        ...product,
        ExpiryDate: product.quantity > 0 && product.ExpiryDate ? formatDate(product.ExpiryDate) : "",
    })) || [products];



    const columns: columnsType[] = [
        {
            header: 'Product Code',
            accessorKey: 'code',
        },
        {
            header: 'Product Name',
            accessorKey: 'productName',
        },
        {
            header: 'Unit Price (Rs)',
            accessorKey: 'Unitprice',
        },
    ];



    const handleDeleteProduct = async () => {
        if (!deleteProductId) return;
        await deleteProduct(deleteProductId);
        setConfirmOpen(false);
    }

    const handleEditProduct = (product: StockEntryFormData) => {
        console.log("product::", product)
        setUpdatedProduct(product);
        // console.log("category", category)
        setChecked('update');
        setOpen(true);
    }


    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("updatedProduct", updatedProduct)
        if (updatedProduct) {

            await createProduct(updatedProduct);
        }

        setOpen(false);

        setChecked('create');

    }
    const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("updatedProduct", updatedProduct)
        if (updatedProduct && updatedProduct._id) {
            await updateProduct(updatedProduct._id, updatedProduct);
        }
        if (setOpen) {
            setOpen(false);
        }
        if (setChecked) setChecked('create');

    }
    const handleOpen = (open: boolean) => {
        if (setUpdatedProduct) {
            setUpdatedProduct({
                productName: '',
                code: '',
                Unitprice: 0,
                supplier: '',
                quantity: 0,
                ExpiryDate: '',
                category: { name: '', status: true }
            });
        }
        if (setOpen) {
            setOpen(open);
        }

    }
    const handleDelete = (id: string) => {
        setDeleteProductId(id);
        setConfirmOpen(true);
    }



    return (
        <div className="mt-8">
            <Header title="Products">
                <IconWrapper className="bg-slate-50 shadow-none border rounded-xl border-slate-100">
                    <IconBox size={32} color="#f97316" />
                </IconWrapper>
            </Header>

            <div className='flex justify-between pb-6 px-4 items-center'>
                <p className=' text-slate-900 font-medium text-xl  rounded'>Products List</p>

                <Button
                    className='rounded-lg text-[13px]'
                    onClick={() => handleOpen(true)}>
                    <IconPlus size={18} className="mr-1.5" color="#fff" />
                    Add Product
                </Button>


            </div>



            {formattedProducts.length !== 0 ?
                <ProductTable
                    data={formattedProducts.reverse()}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={handleEditProduct}
                    onSelect={setSelectedProduct}
                /> :
                loading ? <div className="flex items-center justify-center h-64">
                    <Loader className='w-10 h-10  text-orange-600' />
                </div>
                    :
                    <div className="flex flex-col items-center justify-center h-64 ">
                        <IconWrapper>
                            <IconBox size={32} color=" #f97316" />
                        </IconWrapper>
                        <span className='text-slate-500'>No products available.</span>
                        <span className='text-slate-500'>Add new products to organize your inventory.</span>
                    </div>}

            <ConfirmModal
                open={confirmOpen}
                handleOpen={setConfirmOpen}
                confirmDelete={handleDeleteProduct}
            />

            <ProductModal
                updatedProduct={updatedProduct}
                setUpdatedProduct={setUpdatedProduct}
                open={open}
                handleOpen={handleOpen}
                handleAddProduct={checked === 'create' ? handleAddProduct : undefined}
                handleUpdateProduct={checked === 'update' ? handleUpdateProduct : undefined}
                checked={checked}
            />

            <ProductDetailModal
                open={!!selectedProduct}
                handleOpen={(open: boolean) => setSelectedProduct(open ? selectedProduct : null)}
                product={selectedProduct || {
                    code: '',
                    productName: '',
                    Unitprice: 0,
                    supplier: '',
                    quantity: 0,
                    ExpiryDate: '',
                    category: { name: '', status: true }
                }} />


        </div>
    )
}

export default Products