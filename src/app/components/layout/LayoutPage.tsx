import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"

export const LayoutPage = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-80 px-8 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                <Outlet /> {/* this renders the child route */}
            </main>
        </div>
    )
}

//  default HomePage;