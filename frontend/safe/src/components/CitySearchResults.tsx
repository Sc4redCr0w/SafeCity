"use client";

import { useEffect, useState } from "react";
import { getCrimesByCity } from "@/services/crimeService";
import { AlertCircle, Loader } from "lucide-react";

interface Props {
  city: string;
}

export function CitySearchResults({ city }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getCrimesByCity(city);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

  if (loading) {
    return (
      <div className="bg-slate-700/30 p-8 rounded-lg border border-slate-600/50 flex items-center gap-3">
        <Loader className="w-5 h-5 text-blue-400 animate-spin" />
        <span className="text-gray-300">Loading results for {city}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 p-6 rounded-lg border border-red-700/50 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-400" />
        <span className="text-red-300">Error: {error}</span>
      </div>
    );
  }

  if (!data || data.total_incidents === 0) {
    return (
      <div className="bg-yellow-900/30 p-6 rounded-lg border border-yellow-700/50">
        <p className="text-yellow-300">No crime records found for "{city}"</p>
        <p className="text-yellow-200 text-sm mt-2">Try searching with different spelling or city names available in the dataset.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats for this city */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Incidents</p>
          <p className="text-2xl font-bold text-blue-400">{data.total_incidents}</p>
        </div>
        <div className="bg-purple-900/20 border border-purple-700/50 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Crime Types Found</p>
          <p className="text-2xl font-bold text-purple-400">{Object.keys(data.crime_types || {}).length}</p>
        </div>
      </div>

      {/* Crime type breakdown */}
      {data.crime_types && Object.keys(data.crime_types).length > 0 && (
        <div className="bg-slate-700/30 border border-slate-600/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Crime Type Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(data.crime_types).map(([crimeType, count]: [string, any]) => (
              <div key={crimeType} className="flex items-center justify-between">
                <span className="text-gray-300">{crimeType}</span>
                <span className="text-white font-semibold bg-slate-600/50 px-3 py-1 rounded">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent records */}
      {data.records && data.records.length > 0 && (
        <div className="bg-slate-700/30 border border-slate-600/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Records</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {data.records.map((record: any, index: number) => (
              <div key={index} className="bg-slate-800/50 p-3 rounded border border-slate-600/30 text-sm text-gray-300">
                <p className="font-medium">{record["Crime Type"] || "Unknown Crime"}</p>
                <p className="text-xs text-gray-500">{record["Date"] || "Date unknown"} at {record["Time"] || "Time unknown"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
