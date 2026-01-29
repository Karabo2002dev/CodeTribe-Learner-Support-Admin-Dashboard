const rows = [
    {
        name: "Karabo Kgaphola",
        category: "Schedules",
        status: "Open",
        staff: "Mr Sizwe",
        date: "01 January 2026"
    },
    {
        name: "Zwivhuya Sagida",
        category: "Assessments",
        status: "Resolved",
        staff: "Mr Sizwe",
        date: "01 January 2026"
    },
    {
        name: "Mpho Khaphathe",
        category: "Assessments",
        status: "Open",
        staff: "Mr Vukona",
        date: "28 November 2025"
    },
    {
        name: "Motikoni Mohohe",
        category: "Support Service",
        status: "Resolved",
        staff: "Mr Zack",
        date: "01 December 2025"
    },
    {
        name: "Siyanda Mhlongo",
        category: "Support Service",
        status: "Open",
        staff: "Mr Zack",
        date: "05 December 2025"
    }
]

export default function RecentQueriesTable() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
        
            <h3 className="font-semibold text-gray-900 mb-4">
                Recent Learner Queries
            </h3>

            <div className="overflow-x-auto border border-green-200 rounded-xl">
                <table className="min-w-full text-sm">
                
                    <thead className="bg-green-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Learner Name</th>
                            <th className="px-4 py-3 text-left font-medium">Category</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-left font-medium">Assigned Staff</th>
                            <th className="px-4 py-3 text-left font-medium">Date</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-green-200">
                        {rows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition">
                                
                                <td className="px-4 py-4 text-gray-900">
                                    {row.name}
                                </td>

                                <td className="px-4 py-4 text-gray-600">
                                    {row.category}
                                </td>

                                <td className="px-4 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium
                                        ${
                                            row.status === "Open"
                                            ? "bg-green-200 text-green-700"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>

                                <td className="px-4 py-4 text-gray-600">
                                    {row.staff}
                                </td>

                                <td className="px-4 py-4 text-gray-600">
                                    {row.date}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}