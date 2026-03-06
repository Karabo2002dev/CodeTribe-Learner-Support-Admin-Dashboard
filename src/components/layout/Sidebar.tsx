import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
     ${isActive ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  // Define links for each role
  const adminLinks = [
    { to: "dashboard", label: "Dashboard" },
    { to: "queries", label: "Queries" },
    { to: "documents", label: "Documents" },
    { to: "reports", label: "Reports" },
    { to: "users", label: "Users" },
    { to: "settings", label: "Settings" },
  ];

  const facilitatorLinks = [
    { to: "assigned-queries", label: "Assigned Queries" },
    { to: "settings", label: "Settings" },
  ];

  // Pick links based on role
  const links = user?.role === "ADMIN" ? adminLinks : facilitatorLinks;

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col justify-between">
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm">
          Log Out
        </button>
      </div>
    </aside>
  );
}