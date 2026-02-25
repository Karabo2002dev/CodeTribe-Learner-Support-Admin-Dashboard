import DashboardCards from "../components/cards/StatCard";
import DailyQueryChart from "../components/charts/DailyQueryChart";
import RecentQueriesTable from "../components/table/RecentQueriesTable";

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-xl font-semibold text-gray-900">
                Dashboard Overview
            </h1>

            <DashboardCards />
            <DailyQueryChart month="2026-02" />
            <RecentQueriesTable />
        </div>
    )
}