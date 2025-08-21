import React, { useState, useEffect, useRef } from 'react';
import {
    IconSearch, IconPlus, IconMinus, IconTrash, IconShoppingCart,
    IconPackage, IconScan, IconDiscount, IconCash, IconCreditCard,
    IconWallet, IconCheck, IconUser, IconCalculator, IconPrinter,
    IconX, IconPercentage
} from '@tabler/icons-react';
import { processSale, getProductByCode } from './api/sellApi';
import { useToast } from '../../../hooks/useToast';
import type {
    StockEntryFormData,
    CartItem,
    CustomerInfo,
    PaymentMethod,
    SaleTransaction
} from '../../../types/Types';
import Header from '../../ui/Header';
import IconWrapper from '../../ui/IconWrapper';
import Button from '../../ui/Button';
import StyledSearch from '../../ui/StyledSearch';
import StyledInput from '../../ui/StyledInput';
import StyledLabel from '../../ui/StyledLabel';
import QuickAddProducts from '../../ui/QuickAddProducts';
import DailySummaryCard from '../../ui/DailySummaryCard';
import KeyboardShortcutsHelp from '../../ui/KeyboardShortcutsHelp';
import { searchProductsApi } from '../Products/api/product';

const SellPage = () => {
    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<StockEntryFormData[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [barcodeMode, setBarcodeMode] = useState(false);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: '',
        phone: '',
        email: ''
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [cashReceived, setCashReceived] = useState<number | ''>('');
    const [globalDiscount, setGlobalDiscount] = useState<number>(0);
    const [taxRate] = useState<number>(0); // 0% tax by default
    const [showReceipt, setShowReceipt] = useState<SaleTransaction | null>(null);

    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const barcodeInputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToast();

    // Payment methods
    const paymentMethods: PaymentMethod[] = [
        {
            id: 'cash',
            name: 'Cash',
            icon: <IconCash size={20} />,
            requiresChange: true
        },
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: <IconCreditCard size={20} />
        },
        {
            id: 'mobile',
            name: 'Mobile Payment',
            icon: <IconWallet size={20} />
        }
    ];

    // Search products with debouncing
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(async () => {
            if (searchQuery.trim() !== '') {
                try {
                    const results = await searchProductsApi(searchQuery);
                    console.log('Search results:', results);

                    let products: StockEntryFormData[] = [];
                    if (Array.isArray(results)) {
                        products = results;
                    } else if (results && results.products) {
                        products = results.products;
                    }

                    const availableProducts = products.filter(
                        (product: StockEntryFormData) => product.quantity > 0
                    );
                    setSearchResults(availableProducts);
                } catch (err) {
                    console.error('Search error:', err);
                    setSearchResults([]);
                    showToast('error', 'Search Error', 'Failed to search products');
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery, showToast]);

    // Barcode scanning
    const handleBarcodeInput = async (code: string) => {
        if (!code.trim()) return;

        try {
            const product = await getProductByCode(code);
            if (product && product.quantity > 0) {
                addToCart(product);
                showToast('success', 'Product Added', `${product.productName} added to cart`);
            } else {
                showToast('warning', 'Product Not Found', 'No product found with this code or out of stock');
            }
        } catch (err) {
            console.error('Barcode error:', err);
            showToast('error', 'Scan Error', 'Failed to scan barcode');
        }
    };

    // Add product to cart
    const addToCart = (product: StockEntryFormData, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id);

            if (existingItem) {
                const newQuantity = Math.min(existingItem.cartQuantity + quantity, product.quantity);
                return prevCart.map(item =>
                    item._id === product._id
                        ? {
                            ...item,
                            cartQuantity: newQuantity,
                            totalPrice: newQuantity * item.Unitprice,
                            discountedPrice: newQuantity * item.Unitprice * (1 - (item.discount || 0) / 100)
                        }
                        : item
                );
            } else {
                const cartQuantity = Math.min(quantity, product.quantity);
                return [...prevCart, {
                    ...product,
                    cartQuantity,
                    totalPrice: cartQuantity * product.Unitprice,
                    discount: 0,
                    discountedPrice: cartQuantity * product.Unitprice
                }];
            }
        });
    };

    // Update cart item quantity
    const updateCartQuantity = (productId: string, newQuantity: number) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                return prevCart.filter(item => item._id !== productId);
            }

            return prevCart.map(item => {
                if (item._id === productId) {
                    const quantity = Math.min(newQuantity, item.quantity);
                    return {
                        ...item,
                        cartQuantity: quantity,
                        totalPrice: quantity * item.Unitprice,
                        discountedPrice: quantity * item.Unitprice * (1 - (item.discount || 0) / 100)
                    };
                }
                return item;
            });
        });
    };

    // Update item discount
    const updateItemDiscount = (productId: string, discount: number) => {
        setCart(prevCart => prevCart.map(item => {
            if (item._id === productId) {
                const discountedPrice = item.totalPrice * (1 - discount / 100);
                return {
                    ...item,
                    discount,
                    discountedPrice
                };
            }
            return item;
        }));
    };

    // Remove item from cart
    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.discountedPrice || item.totalPrice), 0);
    const globalDiscountAmount = subtotal * (globalDiscount / 100);
    const afterGlobalDiscount = subtotal - globalDiscountAmount;
    const taxAmount = afterGlobalDiscount * (taxRate / 100);
    const totalAmount = afterGlobalDiscount + taxAmount;

    // Process sale
    const handleProcessSale = async () => {
        if (cart.length === 0) {
            showToast('warning', 'Empty Cart', 'Please add items to cart before processing sale');
            return;
        }

        if (!selectedPaymentMethod) {
            showToast('warning', 'Payment Method Required', 'Please select a payment method');
            return;
        }

        if (selectedPaymentMethod.requiresChange && (!cashReceived || cashReceived < totalAmount)) {
            showToast('warning', 'Insufficient Cash', 'Cash received must be greater than or equal to total amount');
            return;
        }

        setIsProcessing(true);

        try {
            const saleData = {
                items: cart.map(item => ({
                    productId: item._id!,
                    productName: item.productName,
                    quantity: item.cartQuantity,
                    unitPrice: item.Unitprice,
                    discount: item.discount || 0,
                    totalPrice: item.discountedPrice || item.totalPrice
                })),
                subtotal,
                discount: globalDiscountAmount,
                tax: taxAmount,
                totalAmount,
                paymentMethod: selectedPaymentMethod.name,
                customerInfo: customerInfo.name || customerInfo.phone ? customerInfo : undefined,
                cashReceived: selectedPaymentMethod.requiresChange ? Number(cashReceived) : undefined,
                changeGiven: selectedPaymentMethod.requiresChange ? Number(cashReceived) - totalAmount : undefined
            };

            const result = await processSale(saleData);

            showToast('success', 'Sale Completed', `Sale processed successfully. Total: Rs. ${totalAmount.toLocaleString()}`);

            // Show receipt
            setShowReceipt({
                ...result,
                ...saleData,
                saleNumber: result.saleNumber || `SALE-${Date.now()}`,
                createdAt: new Date().toISOString()
            });

            // Reset cart and forms
            setCart([]);
            setCustomerInfo({ name: '', phone: '', email: '' });
            setSelectedPaymentMethod(null);
            setCashReceived('');
            setGlobalDiscount(0);
            setShowPaymentModal(false);

        } catch (err) {
            console.error('Sale processing error:', err);
            showToast('error', 'Sale Failed', 'Failed to process sale. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        showToast('info', 'Cart Cleared', 'All items removed from cart');
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                switch (e.key) {
                    case 'b':
                        e.preventDefault();
                        setBarcodeMode(!barcodeMode);
                        break;
                    case 'p':
                        e.preventDefault();
                        if (cart.length > 0) setShowPaymentModal(true);
                        break;
                    case 'c':
                        e.preventDefault();
                        clearCart();
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [barcodeMode, cart.length]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="pt-8 pb-12">
                <div className="max-w-7xl mx-auto px-4 space-y-8">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <Header title="Sell Products" username="Store Manager" userEmail="manager@store.com">
                            <IconWrapper className="bg-gradient-to-br from-green-50 to-green-100 shadow-none border border-green-200 rounded-xl">
                                <IconShoppingCart size={32} color="#10b981" />
                            </IconWrapper>
                        </Header>

                        {/* Quick Actions Bar */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    onClick={() => setBarcodeMode(!barcodeMode)}
                                    className={`${barcodeMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                                >
                                    <IconScan size={16} />
                                    {barcodeMode ? 'Exit Scan Mode' : 'Barcode Scanner'}
                                </Button>
                                <Button
                                    onClick={() => setShowPaymentModal(true)}
                                    disabled={cart.length === 0}
                                    className="bg-green-500 hover:bg-green-600"
                                >
                                    <IconCalculator size={16} />
                                    Process Sale (Ctrl+P)
                                </Button>
                                <Button
                                    onClick={clearCart}
                                    disabled={cart.length === 0}
                                    className="bg-red-500 hover:bg-red-600"
                                >
                                    <IconTrash size={16} />
                                    Clear Cart (Ctrl+C)
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Product Search Section */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Add Popular Products - visible in barcode mode */}
                            {barcodeMode && (
                                <QuickAddProducts
                                    onAddProduct={addToCart}
                                    cart={cart}
                                />
                            )}

                            {/* Search/Barcode Input */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {barcodeMode ? 'Barcode Scanner' : 'Search Products'}
                                    </h2>
                                    {barcodeMode && (
                                        <div className="flex items-center gap-2 text-sm text-blue-600">
                                            <IconScan size={16} />
                                            <span>Scan Mode Active</span>
                                        </div>
                                    )}
                                </div>

                                {barcodeMode ? (
                                    <StyledInput
                                        ref={barcodeInputRef}
                                        placeholder="Scan or enter barcode..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleBarcodeInput(e.currentTarget.value);
                                                e.currentTarget.value = '';
                                            }
                                        }}
                                        autoFocus
                                    />
                                ) : (
                                    <StyledSearch
                                        id="search"
                                        placeholder="Search products..."
                                        name="search"
                                        type="text"
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        value={searchQuery}
                                    />
                                )}
                            </div>

                            {/* Search Results */}
                            {!barcodeMode && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <div className="p-6 border-b border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Search Results ({searchResults.length})
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        {searchQuery.trim() === '' ? (
                                            <div className="text-center py-8">
                                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <IconSearch size={32} className="text-blue-400" />
                                                </div>
                                                <p className="text-gray-600 font-medium">Search for products to sell</p>
                                                <p className="text-sm text-gray-500 mt-2">Type a product name or code to start searching</p>
                                            </div>
                                        ) : searchResults.length > 0 ? (
                                            <div className="space-y-4">
                                                {searchResults.map((product) => {
                                                    const cartItem = cart.find(item => item._id === product._id);
                                                    const currentQuantity = cartItem?.cartQuantity || 0;

                                                    return (
                                                        <div key={product._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-2 bg-green-50 rounded-lg">
                                                                        <IconPackage size={20} color="#10b981" />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-900">{product.productName}</h4>
                                                                        <p className="text-sm text-gray-600">Code: {product.code}</p>
                                                                        <p className="text-sm text-gray-600">Category: {product.category?.name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right mr-4">
                                                                <p className="font-semibold text-gray-900">Rs. {product.Unitprice}</p>
                                                                <p className="text-sm text-gray-600">Stock: {product.quantity}</p>
                                                                {currentQuantity > 0 && (
                                                                    <p className="text-xs text-green-600 font-medium">In cart: {currentQuantity}</p>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {currentQuantity > 0 ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() => updateCartQuantity(product._id!, currentQuantity - 1)}
                                                                            className="w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                                                                        >
                                                                            <IconMinus size={14} className="text-red-600" />
                                                                        </button>
                                                                        <span className="w-8 text-center font-medium text-gray-700">{currentQuantity}</span>
                                                                        <button
                                                                            onClick={() => updateCartQuantity(product._id!, currentQuantity + 1)}
                                                                            disabled={currentQuantity >= product.quantity}
                                                                            className="w-8 h-8 flex items-center justify-center bg-green-100 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                        >
                                                                            <IconPlus size={14} className="text-green-600" />
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => addToCart(product)}
                                                                        className="bg-green-500 hover:bg-green-600"
                                                                    >
                                                                        <IconPlus size={16} />
                                                                        Add
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-orange-200">
                                                    <IconSearch size={36} className="text-orange-500" />
                                                </div>
                                                <div className="max-w-md mx-auto">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                        No products found for "{searchQuery}"
                                                    </h3>
                                                    <p className="text-gray-600 mb-4">
                                                        We couldn't find any products matching your search criteria.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cart Section */}
                        <div className="space-y-6">
                            {/* Daily Summary Card */}
                            <DailySummaryCard />

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <IconShoppingCart size={20} />
                                            Shopping Cart ({cart.length})
                                        </h3>
                                        {cart.length > 0 && (
                                            <button
                                                onClick={clearCart}
                                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6">
                                    {cart.length > 0 ? (
                                        <div className="space-y-4">
                                            {cart.map((item) => (
                                                <div key={item._id} className="border border-gray-200 rounded-xl p-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900 text-sm">{item.productName}</h4>
                                                            <p className="text-xs text-gray-600">Rs. {item.Unitprice} each</p>
                                                            {item.discount && item.discount > 0 && (
                                                                <p className="text-xs text-green-600">Discount: {item.discount}%</p>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item._id!)}
                                                            className="text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <IconTrash size={16} />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateCartQuantity(item._id!, item.cartQuantity - 1)}
                                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                                            >
                                                                <IconMinus size={14} />
                                                            </button>
                                                            <span className="w-8 text-center font-medium">{item.cartQuantity}</span>
                                                            <button
                                                                onClick={() => updateCartQuantity(item._id!, item.cartQuantity + 1)}
                                                                disabled={item.cartQuantity >= item.quantity}
                                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <IconPlus size={14} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Item discount input */}
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <IconDiscount size={16} className="text-orange-500" />
                                                        <input
                                                            type="number"
                                                            placeholder="Discount %"
                                                            value={item.discount || ''}
                                                            onChange={(e) => updateItemDiscount(item._id!, Number(e.target.value) || 0)}
                                                            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded"
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </div>

                                                    <div className="text-right">
                                                        {item.discount && item.discount > 0 ? (
                                                            <>
                                                                <p className="text-xs text-gray-500 line-through">Rs. {item.totalPrice}</p>
                                                                <p className="font-semibold text-green-600">Rs. {item.discountedPrice?.toFixed(2)}</p>
                                                            </>
                                                        ) : (
                                                            <p className="font-semibold text-gray-900">Rs. {item.totalPrice}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Global Discount */}
                                            <div className="border-t border-gray-200 pt-4">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <IconPercentage size={16} className="text-purple-500" />
                                                    <label className="text-sm font-medium text-gray-700">Global Discount (%)</label>
                                                    <input
                                                        type="number"
                                                        value={globalDiscount}
                                                        onChange={(e) => setGlobalDiscount(Number(e.target.value) || 0)}
                                                        className="w-16 px-2 py-1 text-sm border border-gray-200 rounded"
                                                        min="0"
                                                        max="100"
                                                    />
                                                </div>

                                                {/* Totals */}
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Subtotal:</span>
                                                        <span>Rs. {subtotal.toFixed(2)}</span>
                                                    </div>
                                                    {globalDiscount > 0 && (
                                                        <div className="flex justify-between text-green-600">
                                                            <span>Global Discount ({globalDiscount}%):</span>
                                                            <span>-Rs. {globalDiscountAmount.toFixed(2)}</span>
                                                        </div>
                                                    )}
                                                    {taxRate > 0 && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Tax ({taxRate}%):</span>
                                                            <span>Rs. {taxAmount.toFixed(2)}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                                                        <span>Total:</span>
                                                        <span className="text-green-600">Rs. {totalAmount.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => setShowPaymentModal(true)}
                                                    className="w-full mt-4 bg-green-500 hover:bg-green-600"
                                                >
                                                    <IconCalculator size={16} />
                                                    Process Sale - Rs. {totalAmount.toFixed(2)}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <IconShoppingCart size={32} className="text-gray-400" />
                                            </div>
                                            <p className="text-gray-600">Your cart is empty</p>
                                            <p className="text-sm text-gray-500 mt-1">Search and add products to get started</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Process Payment</h2>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <IconX size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <IconUser size={20} />
                                    Customer Information (Optional)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <StyledLabel htmlFor="customerName">Name</StyledLabel>
                                        <StyledInput
                                            id="customerName"
                                            value={customerInfo.name}
                                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="Customer name"
                                        />
                                    </div>
                                    <div>
                                        <StyledLabel htmlFor="customerPhone">Phone</StyledLabel>
                                        <StyledInput
                                            id="customerPhone"
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                                            placeholder="Phone number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedPaymentMethod(method)}
                                            className={`p-4 border-2 rounded-xl transition-all ${selectedPaymentMethod?.id === method.id
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                {method.icon}
                                                <span className="font-medium">{method.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cash Payment Details */}
                            {selectedPaymentMethod?.requiresChange && (
                                <div>
                                    <StyledLabel htmlFor="cashReceived">Cash Received</StyledLabel>
                                    <StyledInput
                                        id="cashReceived"
                                        type="number"
                                        value={cashReceived}
                                        onChange={(e) => setCashReceived(Number(e.target.value) || '')}
                                        placeholder="Amount received"
                                        min={totalAmount}
                                    />
                                    {cashReceived && Number(cashReceived) >= totalAmount && (
                                        <p className="mt-2 text-sm text-green-600">
                                            Change: Rs. {(Number(cashReceived) - totalAmount).toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Order Summary */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Items:</span>
                                        <span>{cart.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>Rs. {subtotal.toFixed(2)}</span>
                                    </div>
                                    {globalDiscount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount:</span>
                                            <span>-Rs. {globalDiscountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    {taxRate > 0 && (
                                        <div className="flex justify-between">
                                            <span>Tax:</span>
                                            <span>Rs. {taxAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                                        <span>Total:</span>
                                        <span>Rs. {totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex gap-3">
                            <Button
                                onClick={() => setShowPaymentModal(false)}
                                className="flex-1 bg-gray-500 hover:bg-gray-600"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleProcessSale}
                                disabled={isProcessing || !selectedPaymentMethod}
                                className="flex-1 bg-green-500 hover:bg-green-600"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <IconCheck size={16} />
                                        Complete Sale
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Receipt</h2>
                                <button
                                    onClick={() => setShowReceipt(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <IconX size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="text-center">
                                <h3 className="font-bold text-lg">Grocery Store</h3>
                                <p className="text-sm text-gray-600">Sale Receipt</p>
                                <p className="text-sm text-gray-600">#{showReceipt.saleNumber}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(showReceipt.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="border-t border-b border-gray-200 py-4">
                                {showReceipt.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm mb-2">
                                        <div>
                                            <div className="font-medium">{item.productName}</div>
                                            <div className="text-gray-600">
                                                {item.quantity} x Rs. {item.unitPrice}
                                                {item.discount > 0 && ` (-${item.discount}%)`}
                                            </div>
                                        </div>
                                        <div className="font-medium">
                                            Rs. {item.totalPrice.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>Rs. {showReceipt.subtotal.toFixed(2)}</span>
                                </div>
                                {showReceipt.discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount:</span>
                                        <span>-Rs. {showReceipt.discount.toFixed(2)}</span>
                                    </div>
                                )}
                                {showReceipt.tax > 0 && (
                                    <div className="flex justify-between">
                                        <span>Tax:</span>
                                        <span>Rs. {showReceipt.tax.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total:</span>
                                    <span>Rs. {showReceipt.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                <p>Payment Method: {showReceipt.paymentMethod}</p>
                                {showReceipt.cashReceived && (
                                    <>
                                        <p>Cash Received: Rs. {showReceipt.cashReceived.toFixed(2)}</p>
                                        <p>Change: Rs. {showReceipt.changeGiven?.toFixed(2)}</p>
                                    </>
                                )}
                            </div>

                            <div className="text-center text-xs text-gray-500">
                                <p>Thank you for your business!</p>
                                <p>Please keep your receipt for returns</p>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200">
                            <Button
                                onClick={() => setShowReceipt(null)}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                            >
                                <IconPrinter size={16} />
                                Print Receipt
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyboard Shortcuts Help */}
            <KeyboardShortcutsHelp />
        </div>
    );
};

export default SellPage;