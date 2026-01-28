"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, AlertTriangle, TrendingUp, Loader, BarChart3 } from "lucide-react";
import { predictCrimeByCity } from "@/services/crimeLocationService";

const CrimePredictionMap = dynamic(() => import("@/components/CrimePredictionMap").then(mod => ({ default: mod.CrimePredictionMap })), {
  ssr: false,
  loading: () => <div className="bg-slate-900/50 rounded-lg p-4 h-96 flex items-center justify-center text-gray-400">Loading map...</div>
});

export default function CrimePredictionPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionData, setPredictionData] = useState<any>(null);

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 75) return { level: "CRITICAL", color: "text-red-500", bgColor: "bg-red-900/20" };
    if (percentage >= 50) return { level: "HIGH", color: "text-orange-500", bgColor: "bg-orange-900/20" };
    if (percentage >= 25) return { level: "MEDIUM", color: "text-yellow-500", bgColor: "bg-yellow-900/20" };
    return { level: "LOW", color: "text-green-500", bgColor: "bg-green-900/20" };
  };

  const handlePredict = async () => {
    if (!selectedCity.trim()) return;

    setLoading(true);
    setError(null);
    setPredictionData(null);

    try {
      const data = await predictCrimeByCity(selectedCity);
      if (data.found) {
        setPredictionData(data);
      } else {
        setError(`No data found for "${selectedCity}". Try another city.`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePredict();
    }
  };

  const handleMapCitySelect = (city: string) => {
    setSelectedCity(city);
    setTimeout(() => {
      // Auto-predict after setting city
      const timer = setTimeout(async () => {
        setLoading(true);
        setError(null);
        setPredictionData(null);
        try {
          const data = await predictCrimeByCity(city);
          if (data.found) {
            setPredictionData(data);
          } else {
            setError(`No data found for "${city}".`);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, 100);
      return () => clearTimeout(timer);
    }, 0);
  };

  const riskInfo = predictionData ? getRiskLevel(predictionData.risk_percentage) : null;
  const sortedCrimes = predictionData
    ? Object.entries(predictionData.crime_breakdown)
        .sort(([, a], [, b]) => b.count - a.count)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] text-white p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          <h1 className="text-4xl font-semibold">Crime Risk Prediction</h1>
        </div>
        <p className="text-gray-400 ml-11">
          Select a location on the map to analyze crime patterns and predict risk levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Map and Selection */}
        <div className="lg:col-span-1 space-y-6">
          {/* City Selection */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              Select Location
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter city name"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />

              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    Predict Risk
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="p-4 border-b border-slate-600/50">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                Click on a city marker
              </h3>
            </div>
            <CrimePredictionMap onCitySelect={handleMapCitySelect} />
          </div>

          {/* Info Card */}
          <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
            <p className="text-sm text-blue-300">
              💡 Click markers on the map or type a city name to analyze crime data
            </p>
          </div>
        </div>

        {/* Right: Prediction Results */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-700/50 p-6 rounded-xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {predictionData && (
            <>
              {/* Risk Level Card */}
              <div className={`bg-gradient-to-br ${riskInfo.bgColor} border border-slate-700/50 p-8 rounded-xl backdrop-blur-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{predictionData.city}</h3>
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>

                <div className="space-y-4">
                  {/* Risk Percentage */}
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Risk Level</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-5xl font-bold ${riskInfo.color}`}>
                        {predictionData.risk_percentage}%
                      </span>
                      <span className={`text-2xl font-bold ${riskInfo.color}`}>
                        {riskInfo.level}
                      </span>
                    </div>
                  </div>

                  {/* Risk Bar */}
                  <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-4 rounded-full transition-all ${
                        predictionData.risk_percentage >= 75
                          ? "bg-red-500"
                          : predictionData.risk_percentage >= 50
                          ? "bg-orange-500"
                          : predictionData.risk_percentage >= 25
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${predictionData.risk_percentage}%` }}
                    />
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Total Incidents</p>
                      <p className="text-xl font-bold text-blue-400">{predictionData.total_incidents}</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Crime Types</p>
                      <p className="text-xl font-bold text-purple-400">{predictionData.unique_crime_types}</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Avg per Type</p>
                      <p className="text-xl font-bold text-green-400">{predictionData.avg_crimes_per_type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crime Breakdown */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Crime Type Breakdown
                </h3>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sortedCrimes.map(([crimeType, data], index) => (
                    <div key={crimeType} className="bg-slate-800/50 p-4 rounded-lg border border-slate-600/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-900/50 rounded-full text-xs font-bold text-purple-400">
                            {index + 1}
                          </div>
                          <span className="font-semibold text-white">{crimeType}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-400">{data.count}</p>
                          <p className="text-xs text-gray-400">{data.percentage}%</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${data.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/50 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4">📋 Recommendations</h3>
                <ul className="space-y-2 text-sm text-green-300">
                  <li>• Increase police patrols in high-crime areas</li>
                  <li>• Focus on {sortedCrimes[0]?.[0] || "crime prevention"}</li>
                  <li>• Enhance community awareness programs</li>
                  <li>• Implement targeted intervention strategies</li>
                </ul>
              </div>
            </>
          )}

          {!predictionData && !error && (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-12 rounded-xl backdrop-blur-sm text-center">
              <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                Select a city from the map or enter a city name to see crime analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
