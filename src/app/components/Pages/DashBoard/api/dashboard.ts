import apiClient from "../../../../services/apiClient";
import { getToken } from "../../../../utils/AppToken";
import type {
    LowStockData,
    CategoryDistribution,
    ProductStatusData
} from "../../../../types/Types";

// Main dashboard analytics API - tries dedicated endpoint first, falls back to products endpoint
export const getDashboardAnalytics = async () => {
    const token = getToken();

    try {
        // Try the dedicated dashboard analytics endpoint first
        const response = await apiClient({
            method: "GET",
            url: "dashboard/analytics",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data && response.data.success) {
            return response.data.data;
        }
    } catch (_error) {
        // If dashboard endpoint doesn't exist, fall back to products endpoint
        console.log("Dashboard endpoint not available, using fallback method");
        return await getDashboardAnalyticsFallback();
    }

    // Fallback if dashboard endpoint fails
    return await getDashboardAnalyticsFallback();
};

// Fallback method using products endpoint (current implementation)
const getDashboardAnalyticsFallback = async () => {
    const [
        lowStockData,
        inventoryValue,
        categoryDistribution,
        statusData
    ] = await Promise.all([
        getLowStockCountFallback(),
        getInventoryValueFallback(),
        getCategoryDistributionFallback(),
        getProductsByStatusFallback()
    ]);

    const totalProducts = statusData.reduce((sum, item) => sum + item.count, 0);
    const outOfStockCount = statusData.find(item => item.status === 'Out of Stock')?.count || 0;

    return {
        totalProducts,
        lowStockCount: lowStockData.count,
        inventoryValue,
        outOfStockCount,
        categoryDistribution,
        statusDistribution: statusData
    };
};

// Optimized functions that use the main analytics endpoint or fallback
export const getLowStockCount = async (): Promise<LowStockData> => {
    try {
        const analytics = await getDashboardAnalytics();
        return {
            count: analytics.lowStockCount,
            products: [] // Products list not included in analytics endpoint for performance
        };
    } catch (_error) {
        return await getLowStockCountFallback();
    }
};

export const getInventoryValue = async (): Promise<number> => {
    try {
        const analytics = await getDashboardAnalytics();
        return analytics.inventoryValue;
    } catch (_error) {
        return await getInventoryValueFallback();
    }
};

export const getCategoryDistribution = async (): Promise<CategoryDistribution[]> => {
    try {
        const analytics = await getDashboardAnalytics();
        return analytics.categoryDistribution;
    } catch (_error) {
        return await getCategoryDistributionFallback();
    }
};

export const getProductsByStatus = async (): Promise<ProductStatusData[]> => {
    try {
        const analytics = await getDashboardAnalytics();
        return analytics.statusDistribution.map((item: { status: string; count: number }) => ({
            status: item.status,
            count: item.count,
            date: new Date().toISOString().split('T')[0]
        }));
    } catch {
        return await getProductsByStatusFallback();
    }
};

// Fallback implementations (current working methods)
const getLowStockCountFallback = async (): Promise<LowStockData> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "products",
        params: {
            page: 1,
            limit: 1000,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data && response.data.products) {
        const lowStockProducts = response.data.products.filter((product: any) => product.quantity <= 5 && product.quantity > 0);
        return {
            count: lowStockProducts.length,
            products: lowStockProducts
        };
    }
    return { count: 0, products: [] };
};

const getInventoryValueFallback = async (): Promise<number> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "products",
        params: {
            page: 1,
            limit: 1000,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data && response.data.products) {
        const totalValue = response.data.products.reduce((sum: number, product: any) => {
            return sum + (product.Unitprice * product.quantity);
        }, 0);
        return totalValue;
    }
    return 0;
};

const getCategoryDistributionFallback = async (): Promise<CategoryDistribution[]> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "products",
        params: {
            page: 1,
            limit: 1000,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data && response.data.products) {
        const categoryMap = new Map();

        response.data.products.forEach((product: any) => {
            const categoryName = product.category?.name || 'Uncategorized';
            const currentData = categoryMap.get(categoryName) || { count: 0, value: 0 };
            categoryMap.set(categoryName, {
                count: currentData.count + 1,
                value: currentData.value + (product.Unitprice * product.quantity)
            });
        });

        return Array.from(categoryMap.entries()).map(([name, data]) => ({
            category: name,
            count: data.count,
            value: data.value
        }));
    }
    return [];
};

const getProductsByStatusFallback = async (): Promise<ProductStatusData[]> => {
    const token = getToken();
    const response = await apiClient({
        method: "GET",
        url: "products",
        params: {
            page: 1,
            limit: 1000,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.data && response.data.products) {
        const statusMap = {
            'Out of Stock': 0,
            'Expired': 0,
            'Expires Today': 0,
            'Expiring Soon': 0,
            'Fresh': 0
        };

        const today = new Date();

        response.data.products.forEach((product: any) => {
            if (product.quantity <= 0) {
                statusMap['Out of Stock']++;
            } else if (product.ExpiryDate) {
                const expiryDate = new Date(product.ExpiryDate);
                const diffTime = expiryDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays < 0) {
                    statusMap['Expired']++;
                } else if (diffDays === 0) {
                    statusMap['Expires Today']++;
                } else if (diffDays <= 3) {
                    statusMap['Expiring Soon']++;
                } else {
                    statusMap['Fresh']++;
                }
            } else {
                statusMap['Fresh']++;
            }
        });

        return Object.entries(statusMap).map(([status, count]) => ({
            status,
            count,
            date: today.toISOString().split('T')[0]
        }));
    }
    return [];
}; 