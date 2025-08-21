import React, { useState, useEffect } from 'react';
import {
    IconCash,
    IconShoppingCart,
    IconTrendingUp,
    IconCalendar,
    IconChartBar
} from '@tabler/icons-react';
import { getDailySummary } from '../Pages/Sell/api/sellApi';
import type { DailySummary } from '../../types/Types';

const DailySummaryCard: React.FC = () => {
    const [summary, setSummary] = useState<DailySummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchDailySummary = async () => {
            try {
                const result = await getDailySummary(selectedDate);
                setSummary(result);
            } catch (error) {
                console.error('Failed to fetch daily summary:', error);
                setSummary(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDailySummary();
    }, [selectedDate]);

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <IconChartBar size={20} className="text-purple-500" />
                    Daily Summary
                </h3>
                <div className="flex items-center gap-2">
                    <IconCalendar size={16} className="text-gray-400" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="text-sm border border-gray-200 rounded px-2 py-1"
                    />
                </div>
            </div>

            {summary ? (
                <div className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <IconCash size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-green-600 font-medium">Total Sales</p>
                                    <p className="text-xl font-bold text-green-700">
                                        Rs. {summary.totalSales.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <IconShoppingCart size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-600 font-medium">Transactions</p>
                                    <p className="text-xl font-bold text-blue-700">
                                        {summary.totalTransactions}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Average Transaction */}
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <IconTrendingUp size={20} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-purple-600 font-medium">Average Transaction</p>
                                <p className="text-lg font-bold text-purple-700">
                                    Rs. {summary.averageTransaction.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top Products */}
                    {summary.topProducts && summary.topProducts.length > 0 && (
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">Top Sellers Today</h4>
                            <div className="space-y-2">
                                {summary.topProducts.slice(0, 3).map((product, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm text-gray-900">
                                                {product.productName}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {product.quantitySold} units sold
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm text-green-600">
                                                Rs. {product.revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconChartBar size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600">No sales data for this date</p>
                    <p className="text-sm text-gray-500 mt-1">Start making sales to see summary</p>
                </div>
            )}
        </div>
    );
};

export default DailySummaryCard; 