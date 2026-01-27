"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RiskDistribution } from "@/types/dashboard";

 function RiskDonut({ data }: { data: RiskDistribution }) {
  const pieData = [
    { name: "Low", value: data.low },
    { name: "Medium", value: data.medium },
    { name: "High", value: data.high },
  ];

  const colors = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="card">
      <h3 className="mb-3 font-medium">Risk Distribution</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={90}>
            {pieData.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RiskDonut