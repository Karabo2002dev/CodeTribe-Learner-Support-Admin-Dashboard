const QueriesTable = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-green-50 h-14 text-sm text-gray-600">
                        <th className="w-12 text-center">
                            <input type="checkbox" className="h-4 w-4" />
                        </th>
                        <th className="text-left">Learner Name</th>
                        <th className="text-left">Subject</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Category</th>
                        <th className="text-left">Assigned Staff</th>
                        <th className="text-left">Last Updated</th>
                        <th className="text-right pr-6">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="h-14 border-b border-green-200 text-sm hover:bg-green-50">
                            <td className="w-12 text-center align-middle">
                                <input type="checkbox" className="h-4 w-4" />
                            </td>

                            <td>Learner Name</td>
                            <td>Subject</td>

                            <td>
                                <span className="inline-flex items-center justify-center min-w-[64px] px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                Open
                                </span>
                            </td>

                            <td>Category</td>
                            <td>Assigned Staff</td>
                            <td>Last Updated</td>

                            <td className="text-right pr-6 text-green-600 font-medium cursor-pointer">
                                View
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QueriesTable;