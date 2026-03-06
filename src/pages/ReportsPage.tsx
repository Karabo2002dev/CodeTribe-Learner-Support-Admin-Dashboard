import {
  Card,
  CardContent,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const ReportsPage = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Reports</h1>

                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <DownloadIcon fontSize="small" />
                    Export
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Report Type:</span>
                    <Select size="small" defaultValue="daily">
                        <MenuItem value="daily">Daily Query Volume</MenuItem>
                        <MenuItem value="response">Response Time</MenuItem>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Date range:</span>
                    <div className="flex items-center border rounded-lg px-3 py-1">
                        <input type="text" className="outline-none text-sm w-44" value="19 January 2026 - 10 July 2026" readOnly/>
                        <IconButton size="small">
                            <CalendarMonthIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-xl">
                    <CardContent>
                        <h2 className="font-semibold mb-2">Daily Query Volume</h2>
                        <div className="h-48 flex items-center justify-center text-gray-400">
                            Chart Placeholder
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl">
                    <CardContent>
                        <h2 className="font-semibold mb-2">Response Time Trends</h2>
                        <div className="h-48 flex items-center justify-center text-gray-400">
                            Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-xl w-full lg:w-1/2">
                <CardContent>
                    <h2 className="font-semibold mb-4">Top Query Categories</h2>

                    <div className="space-y-3">
                        {[
                        { label: "Schedules", value: "80%" },
                        { label: "Assessments", value: "50%" },
                        { label: "Programme Rules", value: "40%" },
                        { label: "Support Services", value: "70%" }
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full">
                                    <div
                                        className="h-3 bg-green-600 rounded-full"
                                        style={{ width: item.value }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ReportsPage;