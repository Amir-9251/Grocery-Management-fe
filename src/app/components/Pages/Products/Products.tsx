
import Header from "../../ui/Header"
import type { StockEntryFormData } from '../../../types/Types';
import ProductTable from "../../ProductTable";
import { formatDate } from "../../../utils/FormateDate";
import { useProducts } from "./hooks";
import { lazy, useEffect, useState, useRef } from "react";
import ConfirmModal from "../../Models/ConfirmModal";
import { IconBox } from "@tabler/icons-react";
import IconWrapper from "../../ui/IconWrapper";
import Button from "../../ui/Button";
import { IconPlus } from "@tabler/icons-react";
import ProductDetailModal from "../../Models/ProductDetailModal";
import TableSkeleton from "../../ui/TableSkeleton";
import StyledSearch from "../../ui/StyledSearch";
const ProductModal = lazy(() => import("../../Models/ProductModal"));


interface columnsType {
    header: string;
    accessorKey: string;
}


const Products = () => {

    const { products,
        deleteProduct,
        loading,
        createProduct,
        updateProduct,
        getProducts,
        loadMoreProducts,
        resetProducts,
        searchProducts,
        hasMore
    } = useProducts()
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<StockEntryFormData | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState<string>('');
    const [pageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    console.log('Products Search Query:', searchQuery);

    const formattedProducts = products?.map((product: StockEntryFormData) => ({
        ...product,
        ExpiryDate: product.quantity > 0 && product.ExpiryDate ? formatDate(product.ExpiryDate) : "",
    })) || [];

    const columns: columnsType[] = [
        {
            header: 'category',
            accessorKey: 'category.name',
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

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updatedProduct) {
            await createProduct(updatedProduct);
        }
        setOpen(false);
        setChecked('create');
    }

    const handleDeleteProduct = async () => {
        if (!deleteProductId) return;
        await deleteProduct(deleteProductId);
        setConfirmOpen(false);
    }

    const handleEditProduct = (product: StockEntryFormData) => {
        setUpdatedProduct(product);
        setChecked('update');
        setOpen(true);
    }

    const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updatedProduct && updatedProduct._id) {
            await updateProduct(updatedProduct._id, updatedProduct);
        }
        setOpen(false);
        setChecked('create');
    }

    const handleOpen = (open: boolean) => {
        setUpdatedProduct({
            productName: '',
            code: '',
            Unitprice: 0,
            supplier: '',
            quantity: 0,
            ExpiryDate: '',
            category: { name: '', status: true }
        });
        setOpen(open);
    }

    const handleDelete = (id: string) => {
        setDeleteProductId(id);
        setConfirmOpen(true);
    }

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        loadMoreProducts(nextPage, pageSize);
    }

    useEffect(() => {
        // Reset products and load first page
        resetProducts();
        getProducts(1, pageSize);
        setCurrentPage(1);
    }, [pageSize]);

    useEffect(() => {
        // Clear the previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Set a new timeout
        searchTimeoutRef.current = setTimeout(() => {
            if (searchQuery.trim() !== '') {
                searchProducts(searchQuery);
            }
            else {
                resetProducts();
                getProducts(1, pageSize);
            }
        }, 500);

        // Cleanup function to clear timeout on unmount
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    return (
        <div className="mt-8">
            <Header title="Products">
                <IconWrapper className="bg-slate-50 shadow-none border rounded-xl border-slate-100">
                    <IconBox size={32} color="#f97316" />
                </IconWrapper>
            </Header>

            <div className='flex justify-between pb-6 px-4 items-center'>
                <p className=' text-slate-900 font-medium text-xl  rounded'>Products List</p>
                <StyledSearch
                    id="search"
                    placeholder="Search products..."
                    name="search"
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
                <Button
                    className='rounded-lg text-[13px]'
                    onClick={() => handleOpen(true)}>
                    <IconPlus size={18} className="mr-1.5" color="#fff" />
                    Add Product
                </Button>
            </div>

            {loading && products.length === 0 ?
                <TableSkeleton columns={5} />
                : formattedProducts.length !== 0 ?
                    <ProductTable
                        data={formattedProducts}
                        columns={columns}
                        onDelete={handleDelete}
                        onEdit={handleEditProduct}
                        onSelect={setSelectedProduct}
                        onLoadMore={handleLoadMore}
                        hasMore={hasMore}
                        loading={loading}
                    />
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