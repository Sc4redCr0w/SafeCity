'use client';

import { Shield, MapPin, Zap, BarChart3, Database, Brain, TrendingUp, AlertCircle, Users, Clock, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('@/components/Globe3D'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-500/20 to-cyan-500/20 animate-pulse"></div>,
});

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle demo request
    alert(`Demo requested for: ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">SafeCity</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#capabilities" className="hover:text-blue-400 transition">How It Works</a>
            <a href="#for-police" className="hover:text-blue-400 transition">For Police</a>
            <a href="#compliance" className="hover:text-blue-400 transition">Compliance</a>
            <a href="#resources" className="hover:text-blue-400 transition">Resources</a>
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 3D Globe */}
          <Suspense fallback={<div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-500/20 to-cyan-500/20 animate-pulse"></div>}>
            <Globe3D />
          </Suspense>

          {/* Additional glow effects */}
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-40 -right-40 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -bottom-40 -left-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full">
            <p className="text-blue-300 text-sm font-medium">For Police Chiefs & Government Leaders</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Predict.
            <br />
            <span className="text-5xl md:text-7xl">Prevent.</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-5xl md:text-7xl">Protect.</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Smarter policing for safer cities. Deploy patrols intelligently, respond 45% faster, reduce crime through data-driven decisions. Trusted by 280+ law enforcement agencies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-medium text-lg transition transform hover:scale-105">
              Schedule Demo →
            </button>
            <button className="px-8 py-4 border border-blue-400/50 hover:bg-blue-400/10 rounded-lg font-medium text-lg transition">
              View Case Studies
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50 backdrop-blur">
              <p className="text-3xl font-bold text-blue-400 mb-2">94%</p>
              <p className="text-slate-300 text-sm">Prediction Accuracy</p>
            </div>
            <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50 backdrop-blur">
              <p className="text-3xl font-bold text-yellow-400 mb-2">45min</p>
              <p className="text-slate-300 text-sm">Avg Response Time</p>
            </div>
            <div className="border border-slate-800 rounded-lg p-6 bg-slate-900/50 backdrop-blur">
              <p className="text-3xl font-bold text-red-400 mb-2">280+</p>
              <p className="text-slate-300 text-sm">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-slate-300 text-lg">Three intelligent systems that work together to prevent crime and optimize police operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group border border-slate-800 hover:border-blue-400/50 rounded-xl p-8 bg-slate-900/50 backdrop-blur hover:bg-slate-900/80 transition">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition">
                <MapPin className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligent Crime Mapping</h3>
              <p className="text-slate-300 mb-4">
                Real-time FIR-based heatmaps identifying high-risk zones. Reduce patrol guesswork with predictive risk zones updated every 4 hours.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Real-time FIR integration
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Predictive hotspot zones
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  4-hour zone updates
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group border border-slate-800 hover:border-cyan-400/50 rounded-xl p-8 bg-slate-900/50 backdrop-blur hover:bg-slate-900/80 transition">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition">
                <Brain className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Predictive Risk Assessment</h3>
              <p className="text-slate-300 mb-4">
                ML models analyze crime patterns, crowd density, events, and seasonality to forecast incidents 72 hours ahead with 94% accuracy.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  72-hour forecasting
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  Multi-pattern analysis
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  94% accuracy rate
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group border border-slate-800 hover:border-purple-400/50 rounded-xl p-8 bg-slate-900/50 backdrop-blur hover:bg-slate-900/80 transition">
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition">
                <Zap className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Deployment Optimization</h3>
              <p className="text-slate-300 mb-4">
                Automated squad recommendations by type, manpower, and priority. Right officers, right place, right time. Reduce response time by 45%.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  Squad optimization
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  45% faster response
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  Resource efficiency
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section id="for-police" className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Who This Is For</h2>
            <p className="text-slate-300 text-lg">SafeCity is purpose-built for law enforcement leaders and government officials who need smarter, faster, and more responsible public safety solutions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Police Chiefs */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Police Chiefs & Commissioners</h3>
              <p className="text-slate-400 text-sm mb-6">
                Allocate resources more effectively, reduce response times, and demonstrate measurable impact on public safety metrics.
              </p>
              <div className="text-xs font-medium text-blue-400 mb-4">KEY OUTCOMES:</div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">45% faster response deployment</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Optimized patrol allocation across precincts</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Data-driven decision making</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Enhanced officer safety</span>
                </div>
              </div>
            </div>

            {/* City Administrators */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">City Administrators & Public Safety Directors</h3>
              <p className="text-slate-400 text-sm mb-6">
                Optimize municipal public safety spending, meet accountability metrics, and build safer communities through evidence-based policing.
              </p>
              <div className="text-xs font-medium text-cyan-400 mb-4">KEY OUTCOMES:</div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Reduced crime rate projections</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Efficient budget utilization</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Community trust & transparency</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Regulatory compliance assurance</span>
                </div>
              </div>
            </div>

            {/* Federal */}
            <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">State & Federal Law Enforcement</h3>
              <p className="text-slate-400 text-sm mb-6">
                Coordinate inter-jurisdictional deployments, analyze regional threats, and support specialized units with actionable intelligence.
              </p>
              <div className="text-xs font-medium text-purple-400 mb-4">KEY OUTCOMES:</div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Multi-jurisdiction coordination</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Regional threat analysis</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Task force optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-slate-300">Interstate intelligence sharing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How SafeCity Works</h2>
            <p className="text-slate-300 text-lg">Simple, transparent process—no complex jargon, just smarter policing</p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { step: 1, title: 'Data Collection', desc: 'FIRs, crowd data, events', icon: Database },
              { step: 2, title: 'AI/ML Analysis', desc: 'Pattern & threat detection', icon: Brain },
              { step: 3, title: 'Risk Scoring', desc: 'Confidence & urgency calculation', icon: TrendingUp },
              { step: 4, title: 'Deployment', desc: 'Squad recommendation', icon: AlertCircle },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl font-bold text-slate-700 mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-slate-400 text-sm mt-2">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-slate-700">→</div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed explanation */}
          <div className="border border-slate-800 rounded-lg p-8 bg-slate-900/50">
            <h3 className="text-2xl font-bold mb-6">How It Works for Your Department</h3>
            <div className="space-y-4">
              {[
                { num: 1, title: 'Feed Real Data', desc: 'Connect existing FIR systems, traffic, and event data (no changes to existing processes)' },
                { num: 2, title: 'AI Analyzes Patterns', desc: 'SafeCity identifies crime patterns officers might miss, with full transparency' },
                { num: 3, title: 'Get Smart Recommendations', desc: 'Officers receive specific deployment suggestions based on real-time risk assessment' },
                { num: 4, title: 'Make Better Decisions', desc: 'Officers use AI insights combined with their expertise to deploy smarter and respond faster' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{item.num}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{item.title}</p>
                    <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Department?</h2>
          <p className="text-slate-300 text-lg mb-8">See how SafeCity can help your agency prevent crime, optimize resources, and keep communities safer.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-medium text-lg transition transform hover:scale-105">
              Schedule a Demo
            </button>
            <button className="px-8 py-4 border border-slate-600 hover:border-slate-500 rounded-lg font-medium text-lg transition">
              Download Case Study
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="font-bold">SafeCity</span>
              </div>
              <p className="text-slate-400 text-sm">Predict. Prevent. Protect.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Features</a></li>
                <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 SafeCity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
