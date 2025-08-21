export interface StockEntryFormData {
    _id?: string;
    productName: string;
    code: string;
    category?: { _id?: string; name: string, status?: boolean }; // Adjusted to match the expected type
    categoryId?: string; // Adjusted to match the expected type
    Unitprice: number;
    quantity: number;
    supplier: string;
    ExpiryDate: string;
}

export interface CategoryFormData {
    _id?: string;
    name: string;
    status: boolean;
}

export interface User {
    id: string;
    username: string;
    email: string;
    productCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface BadgeProps {
    status: 'expired' | 'expires-today' | 'expiring-soon' | 'fresh';
    title: string;
}

export interface Option {
    value: string;
    label: string;
}

// Dashboard Analytics Interfaces
export interface DashboardStats {
    totalProducts: number;
    lowStockCount: number;
    inventoryValue: number;
}

export interface LowStockData {
    count: number;
    products: StockEntryFormData[];
}

export interface CategoryDistribution {
    name: string;
    count: number;
    percentage: number;
    color: string;
}

// Sale-related interfaces
export interface CartItem extends StockEntryFormData {
    cartQuantity: number;
    totalPrice: number;
    discount?: number;
    discountedPrice?: number;
}

export interface CustomerInfo {
    name?: string;
    phone?: string;
    email?: string;
}

export interface SaleTransaction {
    _id?: string;
    saleNumber: string;
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
    customerInfo?: CustomerInfo;
    cashReceived?: number;
    changeGiven?: number;
    createdAt: string;
}

export interface PaymentMethod {
    id: string;
    name: string;
    icon: React.ReactNode;
    requiresChange?: boolean;
}

export interface DailySummary {
    date: string;
    totalSales: number;
    totalTransactions: number;
    averageTransaction: number;
    topProducts: Array<{
        productName: string;
        quantitySold: number;
        revenue: number;
    }>;
}

export interface ProductStatusData {
    status: string;
    count: number;
    date: string;
}

export interface ChartDataPoint {
    x: number | string;
    y: number;
}
