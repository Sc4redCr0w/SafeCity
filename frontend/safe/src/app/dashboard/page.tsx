"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const FilteredHeatmap = dynamic(
  () => import("@/components/dashboard/FilteredHeatmap"),
  { ssr: false }
);

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/dashboard/summary")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-400">
        Failed to load dashboard data
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] text-white p-8 space-y-8 pt-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">SafeCity Dashboard</h1>
        <p className="text-sm text-gray-400">
          City-wide crime risk monitoring
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPI title="Total Incidents" value={data.kpis.total_incidents} />
        <KPI title="High Risk Zones" value={data.kpis.high_risk_zones} />
        <KPI
          title="Avg Confidence"
          value={`${Math.round(data.kpis.avg_confidence * 100)}%`}
        />
      </div>

      {/* Incident Trend */}
      <div className="bg-[#020617] border border-white/10 rounded-xl p-6">
        <h3 className="mb-4 font-medium">Incident Trend (Last 7 Days)</h3>
        <div className="space-y-2 text-sm">
          {data.trend.map((d: any) => (
            <div
              key={d.date}
              className="flex justify-between border-b border-white/5 pb-1"
            >
              <span className="text-gray-400">{d.date}</span>
              <span>{d.incidents} incidents</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="bg-[#020617] border border-white/10 rounded-xl p-6">
        <h3 className="mb-4 font-medium">Risk Distribution</h3>
        <ul className="space-y-2 text-sm">
          <li>🟢 Low Risk: {data.risk_distribution.low}%</li>
          <li>🟡 Medium Risk: {data.risk_distribution.medium}%</li>
          <li>🔴 High Risk: {data.risk_distribution.high}%</li>
        </ul>
      </div>

      {/* INTERACTIVE HEATMAP WITH FILTERS */}
      <FilteredHeatmap />

      {/* Heat Snapshot (List) */}
      <div className="bg-[#020617] border border-white/10 rounded-xl p-6">
        <h3 className="mb-4 font-medium">City Risk Heat Snapshot</h3>

        <div className="max-h-[400px] overflow-y-auto space-y-3 text-sm">
          {data.heatmap_points.map((p: any) => (
            <div
              key={p.name}
              className="flex justify-between items-center border-b border-white/5 pb-2"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-gray-400 text-xs">
                  Incidents: {p.incidents} · Confidence:{" "}
                  {Math.round(p.avg_confidence * 100)}%
                </p>
              </div>
              <RiskBadge risk={p.risk} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function KPI({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-[#020617] border border-white/10 rounded-xl p-6">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const color =
    risk === "High"
      ? "text-red-400"
      : risk === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return <span className={`font-medium ${color}`}>{risk}</span>;
}

