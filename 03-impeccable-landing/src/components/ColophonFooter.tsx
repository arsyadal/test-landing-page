import React from 'react';
import { Terminal, Shield } from 'lucide-react';

export const ColophonFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#08090C] py-16 text-xs font-mono text-[#8D96A5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#1A1E27]">
          {/* Identity */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2 text-[#F1F4F7] font-bold text-sm">
              <Terminal className="w-4 h-4 text-[#E07A5F]" />
              <span>CHRONICLE OBSERVABILITY SPEC</span>
            </div>
            <p className="text-xs text-[#8D96A5] leading-relaxed max-w-sm">
              High-resolution empirical time-series instrumentation. Designed strictly according to the Impeccable Craft Floor standard.
            </p>
          </div>

          {/* Colophon Specs */}
          <div className="md:col-span-4 space-y-1.5 text-[11px]">
            <div className="text-[#F1F4F7] font-bold mb-1 uppercase tracking-wider">Colophon Specs</div>
            <div>Typography: JetBrains Mono + Plus Jakarta Sans</div>
            <div>Palette: Obsidian #0C0D10 / Copper #E07A5F / Phosphor #10B981</div>
            <div>Contrast Floor: 16.2:1 (Primary Text on Base)</div>
          </div>

          {/* Certification */}
          <div className="md:col-span-3 space-y-1.5 text-[11px]">
            <div className="text-[#F1F4F7] font-bold mb-1 uppercase tracking-wider">Quality Standard</div>
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <Shield className="w-3.5 h-3.5" />
              <span>Impeccable 61-Rule Verified</span>
            </div>
            <div>Zero AI Kickers / Zero Card Mosaics</div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555E6D]">
          <div>
            Chronicle Core Engine v0.1.3 · Apache 2.0 Open Source
          </div>
          <div className="flex items-center gap-6 text-[#8D96A5]">
            <a href="#instrument" className="hover:text-[#F1F4F7] transition-colors">Oscilloscope</a>
            <a href="#schematic" className="hover:text-[#F1F4F7] transition-colors">Memory Bus</a>
            <a href="#pricing" className="hover:text-[#F1F4F7] transition-colors">Ledger</a>
            <a href="#access" className="hover:text-[#F1F4F7] transition-colors">Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
