import {
  Dashboard as DashboardIcon,
  QuestionAnswer,
  HelpOutline,
  BarChart,
  People,
  Settings,
  Logout,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Queries", icon: <QuestionAnswer />, path: "/dashboard/queries" },
    { label: "FAQ’s", icon: <HelpOutline />, path: "/dashboard/faqs" },
    { label: "Reports", icon: <BarChart />, path: "/dashboard/reports" },
    { label: "Users", icon: <People />, path: "/dashboard/users" },
    { label: "Settings", icon: <Settings />, path: "/dashboard/settings" }
]

export default function Sidebar() {
    return (
        <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col justify-between min-h-screen">
        
            <nav className="px-6 py-8 flex flex-col gap-3">
                {menuItems.map(({ label, icon, path }) => (
                    <NavLink
                        key={label}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition
                            ${
                                isActive
                                ? "bg-green-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`
                        }
                    >
                        <span className="text-lg">{icon}</span>
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="px-6 pb-6">
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition">
                    <Logout />
                    Log Out
                </button>
            </div>
        </aside>
    )
}