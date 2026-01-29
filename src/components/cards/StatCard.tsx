import {
  QuestionAnswer,
  OpenInNew,
  CheckCircle,
} from "@mui/icons-material";

export default function StatCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
            <div className="bg-green-100 rounded-2xl p-6 shadow-sm relative">
                <QuestionAnswer className="absolute top-5 right-5 text-green-700" />
                <p className="text-sm text-gray-600 mb-2">Total Queries</p>
                <h2 className="text-3xl font-semibold text-gray-900">1,245</h2>
                <p className="text-xs text-gray-600 mt-2">
                    Total Queries Received
                </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm relative">
                <OpenInNew className="absolute top-5 right-5 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Opened Queries</p>
                <h2 className="text-3xl font-semibold text-gray-900">1,000</h2>
                <p className="text-xs text-gray-600 mt-2">
                    Currently Unresolved
                </p>
            </div>

            <div className="bg-green-100 rounded-2xl p-6 shadow-sm relative">
                <CheckCircle className="absolute top-5 right-5 text-green-700" />
                <p className="text-sm text-gray-600 mb-2">Resolved Queries</p>
                <h2 className="text-3xl font-semibold text-gray-900">1,245</h2>
                <p className="text-xs text-gray-600 mt-2">
                    Successfully Closed
                </p>
            </div>

        </div>
    )
}