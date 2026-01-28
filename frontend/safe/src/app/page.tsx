import Link from "next/link";
import { BarChart3, Map, Shield, TrendingUp, AlertTriangle, FileText, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-24">
      {/* Hero Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Crime Analytics & Prediction Platform
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Advanced analytics and machine learning-powered predictions for crime risk assessment across Indian cities.
          </p>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Crime Analytics Card */}
            <Link href="/crime-analytics">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer group backdrop-blur-sm h-full">
                <div className="flex justify-center mb-4">
                  <BarChart3 className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  Crime Analytics
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Explore comprehensive crime statistics and trends across Indian cities.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold group-hover:bg-blue-500/40 transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Crime Prediction Card */}
            <Link href="/crime-prediction">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer group backdrop-blur-sm h-full">
                <div className="flex justify-center mb-4">
                  <Map className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  Crime Prediction
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Get risk predictions with interactive maps and location-based analysis.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold group-hover:bg-cyan-500/40 transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* FIR Management Card */}
            <Link href="/fir">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer group backdrop-blur-sm h-full">
                <div className="flex justify-center mb-4">
                  <FileText className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  FIR Management
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Add, search, and manage First Information Reports with ease.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold group-hover:bg-purple-500/40 transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Dashboard Card */}
            <Link href="/dashboard">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-green-400/50 transition-all hover:shadow-lg hover:shadow-green-500/20 cursor-pointer group backdrop-blur-sm h-full">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                  Dashboard
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  View comprehensive dashboards with real-time crime data and insights.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold group-hover:bg-green-500/40 transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Landing Page Card */}
            <Link href="/landing">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-8 rounded-xl hover:border-orange-400/50 transition-all hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer group backdrop-blur-sm h-full">
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="w-10 h-10 text-orange-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                  Landing Page
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Discover SafeCity's comprehensive features and capabilities.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold group-hover:bg-orange-500/40 transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Call to Action */}
          <div className="pt-8 border-t border-slate-800">
            <p className="text-slate-400 mb-6">Ready to get started?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/crime-analytics"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-medium transition transform hover:scale-105"
              >
                Start Analyzing
              </Link>
              <Link 
                href="/landing"
                className="px-8 py-3 border border-blue-400/50 hover:bg-blue-400/10 rounded-lg font-medium transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
