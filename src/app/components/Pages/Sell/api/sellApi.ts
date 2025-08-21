import apiClient from "../../../../services/apiClient";
import { getToken } from "../../../../utils/AppToken";
import type { StockEntryFormData, DailySummary, SaleTransaction } from "../../../../types/Types";

// Search products for selling - only returns available products
export const searchProductsForSale = async (query: string) => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "products/search-for-sale",
        params: {
            search: query,
            availableOnly: true // Only get products with stock > 0
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Get all available products for selling
export const getAvailableProducts = async (page: number = 1, limit: number = 50) => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "products/available",
        params: {
            page,
            limit,
            minStock: 1 // Only products with at least 1 in stock
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Get product by barcode/code for quick scanning
export const getProductByCode = async (code: string): Promise<StockEntryFormData> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: `products/by-code/${code}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Process a sale transaction
export const processSale = async (saleData: {
    items: Array<{
        productId: string;
        productName: string;
        quantity: number;
        unitPrice: number;
        discount?: number;
        totalPrice: number;
    }>;
    subtotal: number;
    discount: number;
    tax: number;
    totalAmount: number;
    paymentMethod: string;
    customerInfo?: {
        name?: string;
        phone?: string;
        email?: string;
    };
    cashReceived?: number;
    changeGiven?: number;
}): Promise<SaleTransaction> => {
    const token = getToken();
    const response = await apiClient({
        method: "POST",
        url: "sales/process",
        data: saleData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Get recent sales for reference
export const getRecentSales = async (limit: number = 10): Promise<{ sales: SaleTransaction[] }> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "sales/recent",
        params: { limit },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Get daily sales summary
export const getDailySummary = async (date?: string): Promise<DailySummary> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "sales/daily-summary",
        params: {
            date: date || new Date().toISOString().split('T')[0]
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Get popular products for quick access
export const getPopularProducts = async (limit: number = 10): Promise<{ products: StockEntryFormData[] }> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "products/popular",
        params: { limit },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Validate stock before sale
export const validateStock = async (items: Array<{ productId: string; quantity: number }>): Promise<{ valid: boolean; errors?: string[] }> => {
    const token = getToken();
    const response = await apiClient({
        method: "POST",
        url: "products/validate-stock",
        data: { items },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Fallback search using existing products API (for when dedicated sell API is not available)
export const fallbackSearchProducts = async (query: string): Promise<{ products: StockEntryFormData[] }> => {
    try {
        {
            console.log("Dedicated sell API not available, using fallback");

            // Fallback to existing search API
            const { searchProductsApi } = await import("../../Products/api/product");
            const result = await searchProductsApi(query);
            console.log("Fallback search result:", result);

            // Filter only available products
            const availableProducts = result.products.filter(
                (product: StockEntryFormData) => product.quantity > 0
            );
            return { products: availableProducts };


        }
    } catch {
        console.log("Error in fallback search, returning empty array");
        return { products: [] };
    }
}; 