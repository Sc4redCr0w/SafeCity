"use client";

import { useEffect, useState } from "react";
import { getTopCrimes } from "@/services/crimeService";
import { TrendingDown } from "lucide-react";

export function TopCrimesChart() {
  const [crimes, setCrimes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const data = await getTopCrimes(8);
        setCrimes(data.top_crimes || {});
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCrimes();
  }, []);

  if (loading) return <div className="p-6 bg-slate-800/50 rounded-xl text-gray-400">Loading...</div>;
  if (error) return <div className="p-6 bg-red-900/30 text-red-400 rounded-xl border border-red-700/50">Error: {error}</div>;

  const maxCrime = Math.max(...Object.values(crimes), 1);

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <TrendingDown className="w-5 h-5 text-red-400" />
        <h2 className="text-xl font-semibold">Top Crime Types</h2>
      </div>
      <div className="space-y-4">
        {Object.entries(crimes).map(([crime, count]) => (
          <div key={crime}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">{crime}</span>
              <span className="text-sm font-semibold text-gray-400">{count} cases</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(count / maxCrime) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
