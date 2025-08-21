import { IconPackage } from "@tabler/icons-react/dist/esm/tabler-icons-react.mjs"
import Card from "../../ui/Card"
import Chart from "../../Chart"
import Header from "../../ui/Header"
import { useProfile } from "../../../hooks/useProfile"
import { useDashboard } from "../../../hooks/useDashboard"
import { IconAlertTriangle } from "@tabler/icons-react"
import IconWrapper from "../../ui/IconWrapper"
import { IconDashboard } from "@tabler/icons-react"
import { IconCoin } from "@tabler/icons-react"
import { IconRefresh } from "@tabler/icons-react"
import Loading from "../../../animations/Loading"

const DashBoard = () => {
    const { user } = useProfile();
    const {
        dashboardStats,
        categoryDistribution,
        productStatusData,
        loading,
        error,
        refreshDashboard
    } = useDashboard();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="pt-20 flex justify-center items-center">
                    <div className="text-center">
                        <Loading />
                        <p className="mt-4 text-gray-600 text-sm">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 pt-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">Unable to load dashboard</h3>
                                <p className="text-sm text-red-600 mt-1">Please check your connection and try again</p>
                            </div>
                            <button
                                onClick={refreshDashboard}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                            >
                                <IconRefresh size={16} />
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="pt-8 pb-12">
                <div className="max-w-7xl mx-auto px-4 space-y-8">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <Header
                            title="Dashboard"
                            username={user?.username}
                            userEmail={user?.email}
                        >
                            <IconWrapper className="bg-gradient-to-br from-orange-50 to-orange-100 shadow-none border border-orange-200 rounded-xl">
                                <IconDashboard size={32} color="#f97316" />
                            </IconWrapper>
                        </Header>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="transform hover:scale-[1.02] transition-transform duration-200">
                            <Card
                                title="Total Products"
                                totalPrice={dashboardStats.totalProducts}
                                variant="success"
                                subtitle="Active inventory"
                            >
                                <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                                    <IconPackage size={32} color="#10b981" />
                                </div>
                            </Card>
                        </div>

                        <div className="transform hover:scale-[1.02] transition-transform duration-200">
                            <Card
                                title="Inventory Value"
                                totalPrice={Math.round(dashboardStats.inventoryValue)}
                                variant="info"
                                subtitle="Total stock value"
                                priceUnit="Rs"
                            >
                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                    <IconCoin size={32} color="#3b82f6" />
                                </div>
                            </Card>
                        </div>

                        <div className="transform hover:scale-[1.02] transition-transform duration-200">
                            <Card
                                title="Low Stock"
                                totalPrice={dashboardStats.lowStockCount}
                                variant="warning"
                                subtitle="Items to restock"
                            >
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                                    <IconAlertTriangle size={32} color="#f59e0b" />
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Analytics Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Analytics Overview</h2>
                                <p className="text-sm text-gray-600 mt-1">Inventory insights and trends</p>
                            </div>
                            <button
                                onClick={refreshDashboard}
                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                            >
                                <IconRefresh size={16} />
                                Refresh
                            </button>
                        </div>
                        <Chart
                            categoryData={categoryDistribution}
                            statusData={productStatusData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard