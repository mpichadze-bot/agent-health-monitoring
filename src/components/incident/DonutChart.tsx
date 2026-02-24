"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel: string;
  title: string;
}

export const DonutChart = ({ data, centerLabel, title }: DonutChartProps) => {
  return (
    <div className="bg-sf-white border border-sf-border rounded-lg p-4">
      <h4 className="text-sm font-bold text-sf-text mb-3">{title}</h4>
      <div className="flex items-center gap-4">
        <div className="relative w-[120px] h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-sf-text">{centerLabel}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-sf-text-secondary truncate max-w-[150px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
