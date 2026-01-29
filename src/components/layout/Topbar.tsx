import { Avatar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Topbar() {
    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-8 py-4">
                
                <div className="flex items-center gap-3">
                    <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" className="h-8 w-auto"/>
                    <span className="text-green-600 font-semibold text-lg">
                        CodeTribe
                    </span>
                </div>

                <div className="flex items-center w-[420px] bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                    <SearchIcon className="text-gray-400 mr-2" />
                    <InputBase placeholder="Search" className="flex-1 text-sm" inputProps={{ "aria-label": "search" }}/>
                </div>

                <div className="flex items-center gap-3">
                    <Avatar sx={{ width: 36, height: 36 }} />
                    <div className="leading-tight">
                        <p className="text-sm font-medium text-gray-900">Name</p>
                        <p className="text-xs text-gray-500">Department</p>
                    </div>
                </div>

            </div>
        </header>
    )
}