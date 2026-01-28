"use client";

import { useEffect, useState } from "react";
import { getCrimeStatistics } from "@/services/crimeService";
import { MapPin } from "lucide-react";

export function TopCitiesChart() {
  const [cities, setCities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCrimeStatistics();
        setCities(data.top_cities || {});
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  if (loading) return <div className="p-6 bg-slate-800/50 rounded-xl text-gray-400">Loading...</div>;
  if (error) return <div className="p-6 bg-red-900/30 text-red-400 rounded-xl border border-red-700/50">Error: {error}</div>;

  const maxCity = Math.max(...Object.values(cities), 1);

  const colors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-pink-500 to-pink-600",
    "from-orange-500 to-orange-600",
    "from-green-500 to-green-600",
    "from-red-500 to-red-600",
    "from-indigo-500 to-indigo-600",
    "from-cyan-500 to-cyan-600",
    "from-yellow-500 to-yellow-600",
    "from-lime-500 to-lime-600"
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-semibold">Crime Incidents by City</h2>
      </div>
      <div className="space-y-4">
        {Object.entries(cities).map(([city, count], index) => {
          const colorGradient = colors[index % colors.length];

          return (
            <div key={city}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">{city}</span>
                <span className="text-sm font-semibold text-gray-400">{count} incidents</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${colorGradient} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${(count / maxCity) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
