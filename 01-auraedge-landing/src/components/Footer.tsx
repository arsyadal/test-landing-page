import React from 'react';
import { Cpu } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <footer className={`w-full border-t py-12 transition-colors ${
      isDark ? 'bg-[#06070B] border-[#1E2438] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/40">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-slate-950 font-mono font-bold text-xs">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono font-bold text-sm tracking-wider text-slate-200 uppercase">
                AURAEDGE PLATFORM
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              High-performance distributed edge stream execution engine. Compiled to WebAssembly with sub-5ms V8 isolate cold starts.
            </p>
          </div>

          {/* Operational Status Pill */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>310/310 Edge PoPs Operational</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
              <span>BGP Anycast Latency: 3.4ms avg</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Real Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            Built with React 19, Vite, Tailwind CSS v4, and Bun.
          </div>

          <div className="flex items-center gap-4">
            <a href="#simulator" className="hover:text-emerald-400 transition-colors">
              PoP Simulator
            </a>
            <a href="#sandbox" className="hover:text-emerald-400 transition-colors">
              Stream Sandbox
            </a>
            <a href="#architecture" className="hover:text-emerald-400 transition-colors">
              Isolate Architecture
            </a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">
              Pricing Calculator
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              Technical FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
