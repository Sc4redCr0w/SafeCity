// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { Shield, AlertTriangle, Gauge } from "lucide-react";

// import { fetchDashboardSummary } from "@/services/dashboardService";
// import { DashboardSummary } from "@/types/dashboard";

// import KPICard from "@/components/dashboard/KPICard";
// import TrendChart from "@/components/dashboard/TrendChart";
// import RiskDonut from "@/components/dashboard/RiskDonut";
// import AlertsPanel from "@/components/dashboard/AlertsPanel";

// const DashboardMap = dynamic(() => import("./DashboardMap"), {
//   ssr: false,
// });

// function DashboardPage() {
//   const [data, setData] = useState<DashboardSummary | null>(null);

//   useEffect(() => {
//     fetchDashboardSummary().then(setData);
//   }, []);

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6">
//         Loading dashboard…
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-gray-200 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* HEADER */}
//         <div className="card flex items-center gap-3">
//           <Shield className="text-blue-400" />
//           <div>
//             <h1 className="text-2xl font-semibold">SafeCity Dashboard</h1>
//             <p className="text-sm text-gray-400">
//               City-wide monitoring & analytics
//             </p>
//           </div>
//         </div>

//         {/* KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <KPICard
//             title="Total Incidents"
//             value={data.kpis.total_incidents}
//             icon={<AlertTriangle />}
//           />
//           <KPICard
//             title="High Risk Zones"
//             value={data.kpis.high_risk_zones}
//             icon={<Gauge />}
//           />
//           <KPICard
//             title="Avg Confidence"
//             value={`${Math.round(data.kpis.avg_confidence * 100)}%`}
//             icon={<Gauge />}
//           />
//         </div>

//         {/* Trend */}
//         <TrendChart data={data.trend} />

//         {/* Split */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <RiskDonut data={data.risk_distribution} />
//           <AlertsPanel points={data.heatmap_points} />
//         </div>

//         <div className="card"> <h3 className="mb-3 font-medium">City Risk Heat Snapshot</h3> <DashboardMap points={data.heatmap_points} /> <p className="text-xs text-gray-400 mt-2"> Hover to inspect aggregated risk signals </p> </div>

//         {/* Map */}
//         {/* <div className="card">
//           <h3 className="mb-3 font-medium">City Risk Heat Snapshot</h3>
//           <DashboardMap points={data.heatmap_points} />
//           <p className="text-xs text-gray-400 mt-2">
//             Hover to inspect aggregated risk signals
//           </p>
//         </div> */}

//         <div className="card">
//   <h3 className="mb-3 font-medium">City Risk Heat Snapshot</h3>
//   <DashboardMap points={data.heatmap_points} />
//   <p className="text-xs text-gray-400 mt-2">
//     Hover to inspect aggregated risk signals
//   </p>
// </div>

//       </div>
//     </div>
//   );
// }

// export default DashboardPage



"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  AlertTriangle,
  Gauge,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip as LeafletTooltip,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

/* ---------------- HELPERS ---------------- */

const riskColor = (risk: string) =>
  risk === "High" ? "#ef4444" : risk === "Medium" ? "#facc15" : "#22c55e";

/* ---------------- PAGE ---------------- */

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard/summary")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading dashboard…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Failed to load dashboard data
      </div>
    );
  }

  const pieData = [
    { name: "Low", value: data.risk_distribution.low },
    { name: "Medium", value: data.risk_distribution.medium },
    { name: "High", value: data.risk_distribution.high },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="rounded-xl bg-white/5 p-6 border border-white/10">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Shield className="text-blue-400" />
            SafeCity Dashboard
          </h1>
          <p className="text-sm text-gray-400">
            City-wide monitoring & analytics
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPI title="Total Incidents" value={data.kpis.total_incidents} icon={<AlertTriangle />} />
          <KPI title="High Risk Zones" value={data.kpis.high_risk_zones} icon={<Gauge />} />
          <KPI title="Avg Confidence" value={`${Math.round(data.kpis.avg_confidence * 100)}%`} icon={<Gauge />} />
        </div>

        {/* TREND */}
        <Card title="Incident Trend (Last 7 Days)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.trend}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#60a5fa"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* DONUT + ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Risk Distribution">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90}>
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#22c55e", "#facc15", "#ef4444"][i]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card title="High Risk Localities">
            <ul className="space-y-2 text-sm">
              {data.heatmap_points
                .filter((p: any) => p.risk === "High")
                .slice(0, 5)
                .map((p: any, i: number) => (
                  <li key={i} className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="text-red-400 font-medium">High Risk</span>
                  </li>
                ))}
            </ul>
          </Card>
        </div>

        {/* MAP */}
        <Card title="City Risk Heat Snapshot">
          <div className="h-[420px] rounded-lg overflow-hidden">
            <MapContainer
              center={[19.076, 72.8777]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {data.heatmap_points.map((p: any, i: number) => (
                <CircleMarker
                  key={i}
                  center={[p.lat, p.lng]}
                  radius={10}
                  pathOptions={{
                    color: riskColor(p.risk),
                    fillOpacity: 0.7,
                  }}
                >
                  <LeafletTooltip>
                    <div>
                      <b>{p.name}</b>
                      <br />
                      Risk: {p.risk}
                      <br />
                      Incidents: {p.incidents}
                    </div>
                  </LeafletTooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Hover to inspect aggregated risk signals
          </p>
        </Card>

      </div>
    </div>
  );
}

/* ---------------- SMALL HELPERS ---------------- */

function Card({ title, children }: any) {
  return (
    <div className="rounded-xl bg-white/5 p-5 border border-white/10">
      <h3 className="mb-3 font-medium">{title}</h3>
      {children}
    </div>
  );
}

function KPI({ title, value, icon }: any) {
  return (
    <div className="rounded-xl bg-white/5 p-5 border border-white/10">
      <p className="text-sm text-gray-400">{title}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-blue-400">{icon}</span>
        <span className="text-2xl font-semibold">{value}</span>
      </div>
    </div>
  );
}
