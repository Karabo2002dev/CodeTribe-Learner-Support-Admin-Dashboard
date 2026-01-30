import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Oct 1", value: 30 },
    { day: "Oct 3", value: 45 },
    { day: "Oct 6", value: 60 },
    { day: "Oct 9", value: 40 },
    { day: "Oct 12", value: 55 },
    { day: "Oct 15", value: 70 },
    { day: "Oct 18", value: 35 },
    { day: "Oct 21", value: 65 },
    { day: "Oct 24", value: 58 },
    { day: "Oct 27", value: 62 },
    { day: "Oct 30", value: 60 }
]

export default function DailyQueryChart() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
        
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">
                    Daily Query Volume
                </h3>
                <span className="text-sm text-gray-400">October</span>
            </div>

            <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                        <YAxis hide />
                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#16a34a"
                            fill="url(#colorGreen)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}