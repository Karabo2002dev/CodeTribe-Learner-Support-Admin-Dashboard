import { Avatar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../../store/hook";

export default function Topbar() {
  const user = useAppSelector((state) => state.auth.user);
  console.log("Current user in Topbar:", user);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4 bg-green-500">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" />
        </div>

        {/* Search */}
        <div className="flex items-center w-[420px] bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
          <SearchIcon className="text-gray-400 mr-2" />
          <InputBase
            placeholder="Search"
            className="flex-1 text-sm"
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar sx={{ width: 36, height: 36 }}>
            {user?.fullname?.charAt(0).toUpperCase()}
          </Avatar>

          <div className="leading-tight">
            <p className="text-sm font-medium text-white">
              {user?.fullname ?? "Guest"}
            </p>
            <p className="text-xs text-gray-200">
              {user?.role ?? "Unknown role"}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
