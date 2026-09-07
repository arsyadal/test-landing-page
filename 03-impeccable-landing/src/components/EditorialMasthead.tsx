import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const EditorialMasthead: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toISOString().replace('T', ' ').replace('Z', ' UTC');
      setUtcTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full border-b border-[#232834] bg-[#0C0D10]/95 backdrop-blur-md sticky top-0 z-50">
      {/* Top Telemetry Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-[11px] font-mono border-b border-[#1A1E27] text-[#8D96A5]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            RING_BUFFER_ACTIVE
          </span>
          <span className="text-[#323947]">/</span>
          <span>INGEST: 4.2M EVENTS/SEC</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 tabular-nums">
          <span>CLOCK: {utcTime}</span>
        </div>
      </div>

      {/* Main Masthead Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-3 group">
          <span className="font-mono text-xl font-bold tracking-tight text-[#F1F4F7]">
            CHRONICLE
          </span>
          <span className="text-[10px] font-mono text-[#8D96A5] tracking-widest uppercase">
            SPEC 04.2
          </span>
        </a>

        {/* Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-[#8D96A5]" aria-label="Main Navigation">
          <a href="#instrument" className="hover:text-[#F1F4F7] transition-colors">
            01. OSCILLOSCOPE
          </a>
          <a href="#schematic" className="hover:text-[#F1F4F7] transition-colors">
            02. MEMORY_BUS
          </a>
          <a href="#pricing" className="hover:text-[#F1F4F7] transition-colors">
            03. COMPUTATION_LEDGER
          </a>
          <a href="#access" className="hover:text-[#F1F4F7] transition-colors">
            04. ACCESS_KEY
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="#access"
            className="px-3.5 py-1.5 rounded text-xs font-mono font-medium bg-[#E07A5F] hover:bg-[#d56b4f] text-[#0C0D10] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>INITIALIZE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
