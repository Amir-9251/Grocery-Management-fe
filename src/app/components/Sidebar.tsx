import { Link, useLocation } from "react-router-dom"
import { IconShoppingCart, IconDashboard, IconCategory, IconBox, IconLogout } from "@tabler/icons-react"
import { removeToken } from "../utils/AppToken";


const Sidebar = () => {
    const location = useLocation();
    const Items = [
        {
            title: 'Dashboard',
            icon: <IconDashboard size={24} color={`${location.pathname === '/' ? '#f97316' : 'currentColor'}`} />,
            label: '/'
        },
        {
            title: 'Category',
            icon: <IconCategory size={24} color={`${location.pathname === '/category' ? '#f97316' : 'currentColor'}`} />,
            label: '/category'
        },
        {
            title: 'Products',
            icon: <IconBox size={24} color={`${location.pathname === '/products' ? '#f97316' : 'currentColor'}`} />,
            label: '/products'
        },

    ]

    return (
        <div className="bg-slate-800 text-white w-80 px-2 shadow h-screen flex flex-col fixed">
            <div className="flex items-center justify-start px-4 py-4">
                <IconShoppingCart size={40} color="#f97316" />
                <div className="flex flex-col ml-3 text-lg font-sans font-bold">
                    <span>Grocery</span>
                    <span>Manager</span>
                </div>
            </div>

            <div className="flex-1">
                {Items.map((item, index) => (
                    <Link key={index} to={item.label} className={`flex items-center gap-2 w-full  px-5 py-3 rounded-xl my-1 text-slate-300 text-sm hover:text-white  hover:bg-slate-700 transition-colors duration-200 ${location.pathname === item.label ? 'bg-slate-700 text-white' : ''}`} >
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                ))}
            </div>

            <div className="pb-4">
                <button className="flex items-center gap-2 w-full px-5 py-3 rounded-xl my-1 text-slate-300 text-sm hover:text-white hover:bg-slate-700 transition-colors duration-200 group" onClick={() => { removeToken() }}>
                    <IconLogout size={24} className="text-slate-300 group-hover:text-orange-500 transition-colors duration-200" />
                    <span className="text-base">Logout</span>
                </button>
            </div>

        </div>
    )
}

export default Sidebar