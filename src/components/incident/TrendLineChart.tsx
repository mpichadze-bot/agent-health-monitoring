"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyErrorData } from "@/lib/types";

interface TrendLineChartProps {
  data: DailyErrorData[];
  title: string;
}

export const TrendLineChart = ({ data, title }: TrendLineChartProps) => {
  return (
    <div className="bg-sf-white border border-sf-border rounded-lg p-4">
      <h4 className="text-sm font-bold text-sf-text mb-1">{title}</h4>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11 }}
            stroke="#706E6B"
          />
          <YAxis
            tick={{ fontSize: 11 }}
            stroke="#706E6B"
            label={{
              value: "Sessions",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11 },
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#0176D3"
            strokeWidth={2}
            dot={{ r: 2, fill: "#0176D3" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
