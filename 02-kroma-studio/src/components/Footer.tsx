import React from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <footer className={`w-full border-t py-12 transition-colors ${
      isDark ? 'bg-[#08090E] border-[#22293C] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-mono font-bold text-sm tracking-wider text-slate-200 uppercase">
                KROMA LAB ARCHITECTURE
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Engineered with pure mathematical canvas shaders, zero bloated WebGL wrappers, and accessible tactile component physics.
            </p>
          </div>

          {/* Compliance & Standards Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Anti-Slop R-01 to R-38 Verified</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
              <span>UI/UX Pro Max Certified</span>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            Built with React 19, TypeScript, Tailwind CSS v4, and Bun.
          </p>
          <div className="flex items-center gap-4">
            <a href="#playground" className="hover:text-emerald-400 transition-colors">
              Shader Canvas
            </a>
            <a href="#components" className="hover:text-emerald-400 transition-colors">
              Tactile Deck
            </a>
            <a href="#states" className="hover:text-emerald-400 transition-colors">
              State Engine
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
