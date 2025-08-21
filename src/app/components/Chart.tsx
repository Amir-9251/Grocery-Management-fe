// Chart.tsx
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';
import type { CategoryDistribution, ProductStatusData } from '../types/Types';

interface ChartProps {
    categoryData?: CategoryDistribution[];
    statusData?: ProductStatusData[];
}

const Chart = ({ categoryData = [], statusData = [] }: ChartProps) => {
    const [chartType, setChartType] = useState<'category' | 'status'>('category');

    // Debug logging to track data updates
    useEffect(() => {
        console.log('Chart data updated:', {
            categoryData: categoryData.length,
            statusData: statusData.length,
            chartType
        });
    }, [categoryData, statusData, chartType]);

    // Force chart update when chart type changes
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const chartElement = document.querySelector('.apexcharts-canvas');
            if (chartElement) {
                // Trigger a resize event to force chart redraw
                window.dispatchEvent(new Event('resize'));
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [chartType]);



    // Modern, subtle color palette
    const generateColors = (count: number) => {
        const colors = [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
            '#06b6d4', '#84cc16', '#f97316', '#6366f1', '#ec4899'
        ];
        return colors.slice(0, count);
    };

    // Category Distribution Chart Configuration
    const categoryOptions: ApexOptions = {
        chart: {
            type: 'donut',
            height: 450,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                speed: 800
            }
        },
        title: {
            text: 'Inventory by Category',
            align: 'left',
            style: {
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937'
            }
        },
        labels: categoryData.map(item => item.category),
        colors: generateColors(categoryData.length),
        legend: {
            position: 'bottom',
            fontSize: '16px',
            fontFamily: 'Inter, system-ui, sans-serif',
            markers: {
                size: 10
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Products',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            formatter: () => {
                                return categoryData.reduce((sum, item) => sum + item.count, 0).toString();
                            }
                        },
                        value: {
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#1f2937'
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return Math.round(val) + '%';
            },
            style: {
                fontSize: '14px',
                fontWeight: '700',
                colors: ['#ffffff']
            },
            dropShadow: {
                enabled: true,
                blur: 3,
                opacity: 0.3
            }
        },
        tooltip: {
            y: {
                formatter: function (value: number, opts: { seriesIndex: number }) {
                    const item = categoryData[opts.seriesIndex];
                    return `${value} products (Value: Rs. ${Math.round(item?.value || 0)})`;
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const categorySeries = categoryData.map(item => item.count);

    // Product Status Chart Configuration
    const statusOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 450,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                speed: 800
            }
        },
        title: {
            text: 'Products by Status',
            align: 'left',
            style: {
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937'
            }
        },
        xaxis: {
            categories: statusData.map(item => item.status),
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: '500',
                    colors: '#6b7280'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            title: {
                text: 'Number of Products',
                style: {
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151'
                }
            },
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '12px'
                }
            }
        },
        colors: ['#10b981', '#f59e0b', '#ef4444', '#f97316', '#6b7280'],
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 8,
                horizontal: false,
                columnWidth: '40%',
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                return val.toString();
            },
            offsetY: -20,
            style: {
                fontSize: '14px',
                fontWeight: '700',
                colors: ['#374151']
            },
            dropShadow: {
                enabled: true,
                blur: 2,
                opacity: 0.2
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            y: {
                formatter: function (value: number) {
                    return `${value} products`;
                }
            }
        },
        grid: {
            borderColor: '#f3f4f6',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        }
    };

    const statusSeries = [{
        name: 'Products',
        data: statusData.map(item => item.count)
    }];

    // Show loading state if no data
    if (categoryData.length === 0 && statusData.length === 0) {
        return (
            <div className="p-8">
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium">Loading analytics...</p>
                    <p className="text-xs text-gray-400 mt-1">Please wait while we fetch your data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Chart Type Toggle */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setChartType('category')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${chartType === 'category'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        By Category ({categoryData.length})
                    </button>
                    <button
                        onClick={() => setChartType('status')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${chartType === 'status'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        By Status ({statusData.length})
                    </button>
                </div>

                {/* Debug Info - Remove in production */}
                <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    Active: {chartType} | Cat: {categoryData.length} | Status: {statusData.length}
                </div>
            </div>

            {/* Chart Container */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                {chartType === 'category' && categoryData.length > 0 ? (
                    <ReactApexChart
                        options={categoryOptions}
                        series={categorySeries}
                        type="donut"
                        height={450}
                    />
                ) : chartType === 'status' && statusData.length > 0 ? (
                    <ReactApexChart
                        options={statusOptions}
                        series={statusSeries}
                        type="bar"
                        height={450}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium">No data available</p>
                        <p className="text-xs text-gray-400 mt-1">Chart data for {chartType} view is not available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chart;
