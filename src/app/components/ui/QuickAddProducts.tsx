import React, { useState, useEffect } from 'react';
import { IconPackage, IconPlus, IconTrendingUp } from '@tabler/icons-react';
import { getPopularProducts } from '../Pages/Sell/api/sellApi';
import type { StockEntryFormData } from '../../types/Types';

interface QuickAddProductsProps {
    onAddProduct: (product: StockEntryFormData) => void;
    cart: Array<{ _id?: string; cartQuantity: number }>;
}

const QuickAddProducts: React.FC<QuickAddProductsProps> = ({ onAddProduct, cart }) => {
    const [popularProducts, setPopularProducts] = useState<StockEntryFormData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const result = await getPopularProducts(8);
                setPopularProducts(result.products || []);
            } catch (error) {
                console.error('Failed to fetch popular products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularProducts();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-16 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (popularProducts.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <IconTrendingUp size={20} className="text-orange-500" />
                Quick Add - Popular Products
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {popularProducts.map((product) => {
                    const cartItem = cart.find(item => item._id === product._id);
                    const inCart = cartItem?.cartQuantity || 0;

                    return (
                        <button
                            key={product._id}
                            onClick={() => onAddProduct(product)}
                            disabled={product.quantity === 0}
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                                <IconPackage size={16} className="text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 truncate">
                                    {product.productName}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-600">Rs. {product.Unitprice}</p>
                                    {inCart > 0 && (
                                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                            {inCart} in cart
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">Stock: {product.quantity}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <IconPlus size={16} className="text-gray-400" />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickAddProducts; 