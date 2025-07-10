import { IconPackage } from "@tabler/icons-react/dist/esm/tabler-icons-react.mjs"
import Card from "../../ui/Card"
import Chart from "../../Chart"
import Header from "../../ui/Header"
import { useProfile } from "../../../hooks/useProfile"
import { IconAlertTriangle } from "@tabler/icons-react"
import IconWrapper from "../../ui/IconWrapper"
import { IconDashboard } from "@tabler/icons-react"
import { IconCalendarStats } from "@tabler/icons-react"

const DashBoard = () => {
    const { user } = useProfile();

    return (
        <div className="mt-8">
            <Header
                title="Dashboard"
                username={user?.username}
                userEmail={user?.email}
            >
                <IconWrapper className="bg-slate-50 shadow-none border rounded-xl border-slate-100">
                    <IconDashboard size={32} color="#f97316" />
                </IconWrapper>
            </Header>

            <div className="flex gap-6">
                <Card
                    title="Total Products"
                    totalPrice={user?.productCount || 0}
                    variant="success"
                    subtitle="Active inventory"
                >
                    <IconPackage size={34} />
                </Card>
                <Card
                    title="Today Sale"
                    totalPrice={150}
                    variant="info"
                    subtitle="Revenue today"
                >
                    <IconCalendarStats size={34} />
                </Card>
                <Card
                    title="Low stock"
                    totalPrice={150}
                    variant="warning"
                    subtitle="Items to restock"
                >
                    <IconAlertTriangle size={34} />
                </Card>
            </div>
            <Chart />
        </div>
    )
}

export default DashBoard