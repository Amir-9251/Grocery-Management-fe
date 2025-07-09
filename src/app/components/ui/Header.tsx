import { useLocation } from "react-router-dom"

interface HeaderProps {
    title: string;
    username?: string | undefined;
    userEmail?: string | undefined;
    children?: React.ReactNode;
}

const Header = ({ title, username, userEmail, children }: HeaderProps) => {
    const location = useLocation();
    return (
        <div className="flex items-center justify-between px-8 py-6 bg-white mb-6 border-b border-slate-100 ">
            <div className="flex items-center gap-4">
                {children}
                <h1 className="text-slate-900 text-3xl font-medium">{title}</h1>
            </div>
            {location.pathname === '/' && <div className="flex items-center gap-4">

                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                    <span className="font-medium text-secondary ">{username?.split(" ")?.map(name => name[0]).join("")}</span>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-slate-900 text-lg font-medium">{username}</h2>
                    <p className="text-sm text-slate-600 font-light">{userEmail}</p>
                </div>

            </div>}
        </div>
    )
}

export default Header