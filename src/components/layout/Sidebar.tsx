import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
        ${isActive ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`

    return (
        <aside className="w-64 min-h-screen bg-white border-r flex flex-col justify-between">
        
            <nav className="p-4 space-y-2">
                <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                </NavLink>

                <NavLink to="/queries" className={linkClass}>
                    Queries
                </NavLink>

                <NavLink to="/faqs" className={linkClass}>
                    FAQ’s
                </NavLink>

                <NavLink to="/reports" className={linkClass}>
                    Reports
                </NavLink>

                <NavLink to="/users" className={linkClass}>
                    Users
                </NavLink>

                <NavLink to="/settings" className={linkClass}>
                    Settings
                </NavLink>
            </nav>

            <div className="p-4">
                <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm">
                    Log Out
                </button>
            </div>

        </aside>
    )
}