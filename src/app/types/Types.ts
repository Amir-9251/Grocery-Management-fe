export interface StockEntryFormData {
    _id?: string;
    productName: string;
    code: string;
    category?: { _id?: string; name: string, status: boolean }; // Adjusted to match the expected type
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
