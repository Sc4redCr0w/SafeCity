'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            nigran.<span className="opacity-30">a</span>i
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link href="/predict" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Citywise
          </Link>
          <Link href="/predict-accident" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Accidents
          </Link>
          <Link href="/fir" className="text-sm font-medium hover:text-blue-400 transition-colors">
            FIR
          </Link>
          <Link href="/crime-analytics" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Analytics
          </Link>
          <Link 
            href="/landing"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-medium transition"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
