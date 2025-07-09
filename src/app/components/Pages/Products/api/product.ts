import apiClient from "../../../../services/apiClient";
import type { StockEntryFormData } from '../../../../types/Types';
import { getToken } from "../../../../utils/AppToken";

export const CreateProductsApi = async (productData: StockEntryFormData) => {
    const baseUrl = 'product';
    const token = getToken();
    const response = await apiClient({
        method: "POST",
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { data: productData }, // Wrap in { data: ... }
    });
    return response.data;
}

export const GetProductsApi = async () => {
    const baseUrl = 'products';
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
export const DeleteProductApi = async (productId: string) => {
    const baseUrl = `product/${productId}`;
    const token = getToken();
    const response = await apiClient({
        method: "DELETE",
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const UpdateProductApi = async (productId: string, productData: StockEntryFormData) => {
    const baseUrl = `product/${productId}`;
    const token = getToken();
    const response = await apiClient({
        method: "PUT",
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { data: productData }, // Wrap in { data: ... }
    });
    return response.data;
}

export const GetProductByIdApi = async (productId: string) => {
    const baseUrl = `product/${productId}`;
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}