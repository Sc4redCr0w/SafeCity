
"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin, RotateCcw } from "lucide-react";

const DynamicMap = dynamic(
  () => import("@/components/FilteredHeatmapMap"),
  { ssr: false }
);

interface HeatmapPoint {
  name: string;
  lat: number;
  lng: number;
  incidents: number;
  intensity: number;
  risk_level: string;
  avg_confidence: number;
}

interface FilteredHeatmapProps {
  onDataUpdate?: (data: any) => void;
}

export default function FilteredHeatmap({ onDataUpdate }: FilteredHeatmapProps) {
  const [duration, setDuration] = useState("7days");
  const [crimeType, setCrimeType] = useState("all");
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23);
  const [heatmapData, setHeatmapData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHeatmapData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        duration,
        crime_type: crimeType,
        start_hour: startHour.toString(),
        end_hour: endHour.toString(),
      });

      const res = await fetch(
        `http://127.0.0.1:8001/heatmap/filtered?${params}`
      );

      if (!res.ok) throw new Error("Failed to fetch heatmap data");

      const data = await res.json();
      setHeatmapData(data);
      onDataUpdate?.(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [duration, crimeType, startHour, endHour, onDataUpdate]);

  useEffect(() => {
    fetchHeatmapData();
  }, [fetchHeatmapData]);

  const resetFilters = () => {
    setDuration("7days");
    setCrimeType("all");
    setStartHour(0);
    setEndHour(23);
  };

  return (
    <div className="rounded-xl bg-slate-900 p-6 border border-slate-800 space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <MapPin className="text-blue-400" size={20} />
        Crime Heatmap
      </h2>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-800 rounded-lg p-4">
        {/* Duration */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="alltime">All Time</option>
          </select>
        </div>

        {/* Crime Type */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Crime Type</label>
          <select
            value={crimeType}
            onChange={(e) => setCrimeType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Crime Types</option>
            <option value="1">Assault</option>
            <option value="2">Robbery</option>
            <option value="3">Burglary</option>
            <option value="4">Theft</option>
            <option value="5">Vehicle Theft</option>
            <option value="6">Cyber Crime</option>
            <option value="7">Fraud</option>
            <option value="8">Property Crime</option>
            <option value="9">Drug-related</option>
            <option value="10">Public Nuisance</option>
          </select>
        </div>

        {/* Start Hour */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            From Hour
          </label>
          <input
            type="number"
            min="0"
            max="23"
            value={startHour}
            onChange={(e) => setStartHour(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Hour */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">To Hour</label>
          <input
            type="number"
            min="0"
            max="23"
            value={endHour}
            onChange={(e) => setEndHour(parseInt(e.target.value) || 23)}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex gap-2">
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm transition"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>
        {loading && <span className="text-sm text-yellow-400">Loading...</span>}
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>

      {/* MAP */}
      {heatmapData && (
        <div className="h-[500px] rounded-lg overflow-hidden border border-slate-700">
          <DynamicMap points={heatmapData.heatmap_points} />
        </div>
      )}

      {/* LEGEND */}
      {heatmapData && (
        <div className="flex gap-6 text-sm bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Low Risk</span>
          </div>
          <div className="ml-auto text-gray-400">
            Total Incidents: {heatmapData.heatmap_points.reduce((sum: number, p: HeatmapPoint) => sum + p.incidents, 0)}
          </div>
        </div>
      )}
    </div>
  );
}
