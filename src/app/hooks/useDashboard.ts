import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import {
    getDashboardAnalytics
} from "../components/Pages/DashBoard/api/dashboard";
import type {
    DashboardStats,
    LowStockData,
    CategoryDistribution,
    ProductStatusData
} from "../types/Types";

export const useDashboard = () => {
    const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
        totalProducts: 0,
        lowStockCount: 0,
        inventoryValue: 0
    });
    const [lowStockData, setLowStockData] = useState<LowStockData>({ count: 0, products: [] });
    const [categoryDistribution, setCategoryDistribution] = useState<CategoryDistribution[]>([]);
    const [productStatusData, setProductStatusData] = useState<ProductStatusData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Use the optimized dashboard analytics endpoint
            const analytics = await getDashboardAnalytics();

            // Update all states from the single analytics response
            setDashboardStats({
                totalProducts: analytics.totalProducts,
                lowStockCount: analytics.lowStockCount,
                inventoryValue: analytics.inventoryValue
            });

            setLowStockData({
                count: analytics.lowStockCount,
                products: [] // Products list not needed for dashboard display
            });

            setCategoryDistribution(analytics.categoryDistribution);

            // Transform status distribution to match expected format
            const statusData = analytics.statusDistribution.map((item: { status: string; count: number }) => ({
                status: item.status,
                count: item.count,
                date: new Date().toISOString().split('T')[0]
            }));
            setProductStatusData(statusData);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setError(error as AxiosError);
        } finally {
            setLoading(false);
        }
    };

    const refreshDashboard = () => {
        getDashboardData();
    };

    return {
        dashboardStats,
        lowStockData,
        categoryDistribution,
        productStatusData,
        loading,
        error,
        refreshDashboard
    };
}; 