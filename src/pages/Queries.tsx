import QueryFilters from "../components/QueryFilters";
import QueriesTable from "../components/QueriesTable";

export default function Queries() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold mb-6">Queries</h1>

            <QueryFilters />
            <QueriesTable />
        </div>
    )
}