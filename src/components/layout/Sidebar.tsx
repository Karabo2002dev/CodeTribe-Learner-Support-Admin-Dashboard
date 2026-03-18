import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { logout } from "../../store/authSlice";
import {
  FiSearch,
  FiHome,
  FiFileText,
  FiSettings,
  FiUsers,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { LuMessageSquareMore } from "react-icons/lu";


type SidebarLink = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const adminLinks: SidebarLink[] = [
    { to: "dashboard", label: "Dashboard", icon: <FiHome size={18} /> },
    { to: "queries", label: "Queries", icon: <LuMessageSquareMore size={18} /> },
    { to: "documents", label: "Documents", icon: <HiOutlineDocumentText size={18} /> },
    { to: "users", label: "Users", icon: <FiUsers size={18} /> },
    { to: "settings", label: "Settings", icon: <FiSettings size={18} /> },
    { to: "ContactUs", label: "Contact Us", icon: <FiFileText size={18} /> },
  ];

  const facilitatorLinks: SidebarLink[] = [
    { to: "assigned-queries", label: "Assigned Queries", icon: <LuMessageSquareMore size={18} /> },
    { to: "settings", label: "Settings", icon: <FiSettings size={18} /> },
  ];

  const links = user?.role === "ADMIN" ? adminLinks : facilitatorLinks;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    [
      "group flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium transition-all duration-200",
      isActive
        ? "bg-white text-gray-900 shadow-sm border border-gray-200"
        : "text-gray-500 hover:bg-white hover:text-gray-800",
    ].join(" ");

  return (
    <aside className="w-[290px] min-h-screen bg-[#f5f5f5] border-r border-gray-200 flex flex-col justify-between px-3 py-4">
      <div>
        {/* Top */}
        <div className="flex items-center justify-between px-2 mb-6">
          <h1 className="text-[22px] font-bold tracking-tight">
            <span className="text-[#8BC34A]">Code</span>
            <span className="text-gray-500">Tribe</span>
          </h1>

          <button title="log-out" type="button" onClick={handleLogout} className="h-10 w-10 rounded-xl flex items-center justify-center text-gray-700 hover:bg-white transition">
            <FiLogOut size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 px-1">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <FiSearch className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
            <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-500 font-medium">
              ⌘ K
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-2 px-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              <span className="text-gray-500 group-[.active]:text-gray-900">
                {link.icon}
              </span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-1">
        <div className="space-y-2 mb-6">
          <button className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium text-gray-500 hover:bg-white hover:text-gray-800 transition">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <MdOutlineSupportAgent size={16} />
            </span>
            <span>Support</span>
          </button>

          <button className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium text-gray-500 hover:bg-white hover:text-gray-800 transition">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-100 text-pink-500">
              <FiHelpCircle size={16} />
            </span>
            <span>Help</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-pink-200 via-orange-300 to-red-500 flex items-center justify-center text-white font-semibold">
              {getInitials(user?.fullname)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-gray-900">
                {user?.fullname || "User"}
              </p>
              <p className="truncate text-sm text-gray-500">
                {user?.email || "No email"}
              </p>
              <p className="truncate text-xs text-gray-400">
                {user?.phone_number || "No phone number"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-800 transition"
              title="Log out"
            >
              <FiChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}