import { IconCircles } from "@tabler/icons-react"
import Header from "../../ui/Header"
import IconWrapper from "../../ui/IconWrapper"


const Sales = () => {
    return (
        <div className="mt-8">
            <Header title="Sales">
                <IconWrapper className="bg-slate-50 shadow-none border rounded-xl border-slate-100">
                    <IconCircles size={32} color="#f97316" />
                </IconWrapper>
            </Header>

        </div>
    )
}

export default Sales