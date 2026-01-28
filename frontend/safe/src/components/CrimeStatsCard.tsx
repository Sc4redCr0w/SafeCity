"use client";

import { useEffect, useState } from "react";
import { getCrimeStatistics } from "@/services/crimeService";
import { AlertCircle, Building2, Layers, Activity } from "lucide-react";

export function CrimeStatsCard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getCrimeStatistics();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6 bg-slate-800/50 rounded-xl text-gray-400">Loading...</div>;
  if (error) return <div className="p-6 bg-red-900/30 text-red-400 rounded-xl border border-red-700/50">Error: {error}</div>;
  if (!stats) return null;

  const statCards = [
    {
      label: "Total Crimes",
      value: stats.total_crimes,
      icon: AlertCircle,
      color: "blue",
      bgColor: "from-blue-900/30 to-blue-800/20",
      borderColor: "border-blue-700/50",
      iconColor: "text-blue-400"
    },
    {
      label: "Cities Covered",
      value: stats.unique_cities,
      icon: Building2,
      color: "green",
      bgColor: "from-green-900/30 to-green-800/20",
      borderColor: "border-green-700/50",
      iconColor: "text-green-400"
    },
    {
      label: "Crime Types",
      value: stats.unique_crime_types,
      icon: Layers,
      color: "purple",
      bgColor: "from-purple-900/30 to-purple-800/20",
      borderColor: "border-purple-700/50",
      iconColor: "text-purple-400"
    },
    {
      label: "Avg per City",
      value: (stats.total_crimes / Math.max(stats.unique_cities, 1)).toFixed(1),
      icon: Activity,
      color: "orange",
      bgColor: "from-orange-900/30 to-orange-800/20",
      borderColor: "border-orange-700/50",
      iconColor: "text-orange-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className={`bg-gradient-to-br ${card.bgColor} border ${card.borderColor} p-6 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-${card.color}-500/20 transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 text-sm font-medium">{card.label}</h3>
              <Icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
