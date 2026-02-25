import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/axios";

interface ChartData {
    bucket_day : number
    percentage : string
}
export default function DailyQueryChart({ month }: { month: string }) {
  const [data, setData] = useState<{ day: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await api.get("/queries/trend", { params: { month } }); // send body
        // map backend data to chart format
        const chartData = res.data.data.map((d: ChartData) => ({
          day: `${d.bucket_day} ${new Date(month + "-01").toLocaleString(
            "en-US",
            { month: "short" }
          )}`,
          value: Number(d.percentage),
        }));
        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [month]);

  if (loading) return <p className="text-gray-500">Loading chart...</p>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Daily Query Volume</h3>
        <span className="text-sm text-gray-400">{month}</span>
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
  );
}
