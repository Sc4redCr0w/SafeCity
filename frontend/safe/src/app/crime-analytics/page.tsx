"use client";

import { useState } from "react";
import { Search, BarChart3, MapPin, TrendingUp } from "lucide-react";
import { CrimeStatsCard } from "@/components/CrimeStatsCard";
import { TopCrimesChart } from "@/components/TopCrimesChart";
import { TopCitiesChart } from "@/components/TopCitiesChart";
import { CitySearchResults } from "@/components/CitySearchResults";

export default function CrimeAnalyticsPage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (selectedCity.trim()) {
      setSearched(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] text-white p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-semibold">Crime Analytics</h1>
        </div>
        <p className="text-gray-400 ml-11">
          Comprehensive crime statistics and insights for Indian cities
        </p>
      </div>

      {/* Statistics Cards */}
      <section className="mb-12">
        <CrimeStatsCard />
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <TopCrimesChart />
        <TopCitiesChart />
      </section>

      {/* City Search Section */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl backdrop-blur-sm mb-12">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-blue-500" />
          <h2 className="text-2xl font-semibold">Search by City</h2>
        </div>
        
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSearched(false);
              }}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
          <button 
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {searched && selectedCity && (
          <CitySearchResults city={selectedCity} />
        )}

        {!searched && !selectedCity && (
          <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600/50">
            <p className="text-gray-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Enter a city name and click search to view detailed crime statistics
            </p>
          </div>
        )}
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-lg">Data Overview</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Comprehensive analysis of crime data from major Indian cities with detailed statistics and trends.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/50 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <Search className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold text-lg">Advanced Search</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Filter and explore crime patterns by specific cities to identify trends and hotspots.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="font-semibold text-lg">Actionable Insights</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Get data-driven recommendations for safety improvements and resource allocation.
          </p>
        </div>
      </section>
    </div>
  );
}
