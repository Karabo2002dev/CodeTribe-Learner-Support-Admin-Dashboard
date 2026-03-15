import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
