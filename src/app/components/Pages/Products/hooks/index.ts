import { useEffect, useState } from "react";
import type { StockEntryFormData } from "../../../../types/Types";
import { CreateProductsApi, DeleteProductApi, GetProductByIdApi, GetProductsApi, UpdateProductApi } from "../api/product";

export const useProducts = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<StockEntryFormData[]>([]);
    const [product, setProduct] = useState<StockEntryFormData | null>(null);
    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await GetProductsApi();
            if (response) {
                setProducts(response);
                setLoading(false);
            } else {
                setError("No products found");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to fetch products");
            console.error("Error fetching products:", err);
            setLoading(false);
        }
    }
    const getProductById = async (productId: string) => {
        setLoading(true);
        try {
            const response = await GetProductByIdApi(productId);
            if (response) {
                setProduct(response);
                setLoading(false);
            } else {
                setError("Product not found");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to fetch product");
            setLoading(false);
            console.error("Error fetching product:", err);
        }
    }

    const updateProduct = async (productId: string, productData: StockEntryFormData) => {
        setLoading(true);
        try {
            const response = await UpdateProductApi(productId, productData);
            if (response) {
                getProducts();
                setLoading(false);
            }
            else {
                setError("Failed to update product");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to update product");
            setLoading(false);
            console.error("Error updating product:", err);
        }
    }

    const deleteProduct = async (productId: string) => {
        setLoading(true);
        try {
            const response = await DeleteProductApi(productId);
            if (response) {
                getProducts();
                setLoading(false);
            }
            else {
                setError("Failed to delete product");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to delete product");
            setLoading(false);
            console.error("Error deleting product:", err);
        }
    }

    const createProduct = async (productData: StockEntryFormData) => {
        setLoading(true);
        try {
            const response = await CreateProductsApi(
                {
                    productName: productData.productName,
                    code: productData.code,
                    Unitprice: productData.Unitprice,
                    supplier: productData.supplier,
                    quantity: productData.quantity,
                    ExpiryDate: productData.ExpiryDate,
                    categoryId: productData.categoryId
                });

            if (response) {
                getProducts();
                setLoading(false);
            }
            else {
                setError("Failed to create product");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to delete product");
            setLoading(false);
            console.error("Error deleting product:", err);
        }

    }

    useEffect(() => {
        getProducts();
    }, []);
    return {
        setProducts, loading, error, products, product,
        getProductById, updateProduct, deleteProduct, createProduct
    };
}