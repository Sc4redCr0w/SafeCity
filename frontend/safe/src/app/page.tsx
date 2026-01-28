import Link from "next/link";
import { BarChart3, Map, Wand2, TrendingUp, Shield, AlertTriangle, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] text-white">
      {/* Navigation */}
      <nav className="bg-black/40 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">SafeCity</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:text-blue-400 transition-colors text-sm font-medium">Dashboard</Link>
            <Link href="/crime-analytics" className="hover:text-blue-400 transition-colors text-sm font-medium">Analytics</Link>
            <Link href="/crime-prediction" className="hover:text-blue-400 transition-colors text-sm font-medium">Prediction</Link>
            <Link href="/fir" className="hover:text-blue-400 transition-colors text-sm font-medium">FIR</Link>
            <Link href="/predict" className="hover:text-blue-400 transition-colors text-sm font-medium">Predict</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Crime Analytics & Prediction Platform
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Advanced analytics and machine learning-powered predictions for crime risk assessment across Indian cities.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Crime Analytics Card */}
          <Link href="/crime-analytics">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer group backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <BarChart3 className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                Crime Analytics
              </h3>
              <p className="text-gray-300 text-sm">
                Explore comprehensive crime statistics and trends across Indian cities.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold group-hover:bg-blue-500/40 transition-colors">
                Explore →
              </div>
            </div>
          </Link>

          {/* Dashboard Card */}
          <Link href="/dashboard">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-green-400/50 transition-all hover:shadow-lg hover:shadow-green-500/20 cursor-pointer group backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <Map className="w-10 h-10 text-green-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                Risk Dashboard
              </h3>
              <p className="text-gray-300 text-sm">
                Real-time heatmaps showing crime risk zones and safety intelligence.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold group-hover:bg-green-500/40 transition-colors">
                View →
              </div>
            </div>
          </Link>

          {/* Prediction Card */}
          <Link href="/crime-prediction">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-orange-400/50 transition-all hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer group backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="w-10 h-10 text-orange-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                Risk Predictor
              </h3>
              <p className="text-gray-300 text-sm">
                Get crime risk predictions with breakdown by type on interactive maps.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold group-hover:bg-orange-500/40 transition-colors">
                Analyze →
              </div>
            </div>
          </Link>

          {/* FIR Management Card */}
          <Link href="/fir">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer group backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                <FileText className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                FIR Management
              </h3>
              <p className="text-gray-300 text-sm">
                Add, search, and manage First Information Reports with ease.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold group-hover:bg-purple-500/40 transition-colors">
                Manage →
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-400 flex items-center gap-2 justify-center">
              <TrendingUp className="w-6 h-6" />
              18
            </div>
            <p className="text-gray-400 text-sm mt-2">Crime Records Analyzed</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-green-400 flex items-center gap-2 justify-center">
              <Map className="w-6 h-6" />
              12
            </div>
            <p className="text-gray-400 text-sm mt-2">Indian Cities Covered</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-purple-400 flex items-center gap-2 justify-center">
              <BarChart3 className="w-6 h-6" />
              8+
            </div>
            <p className="text-gray-400 text-sm mt-2">Crime Type Categories</p>
          </div>
          <div className="bg-gradient-to-br from-pink-900/20 to-pink-800/10 border border-pink-700/30 p-6 rounded-lg backdrop-blur-sm">
            <div className="text-3xl font-bold text-pink-400 flex items-center gap-2 justify-center">
              <Shield className="w-6 h-6" />
              99%
            </div>
            <p className="text-gray-400 text-sm mt-2">Model Accuracy</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-8 text-center text-gray-400 text-sm">
        <p>SafeCity © 2026 | Crime Analytics & Prediction Platform</p>
      </footer>
    </div>
  );
}
