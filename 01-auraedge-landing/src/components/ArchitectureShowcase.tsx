import React, { useRef, useState } from 'react';
import { Layers, Cpu, Zap, Network } from 'lucide-react';

interface ArchitectureShowcaseProps {
  isDark: boolean;
}

export const ArchitectureShowcase: React.FC<ArchitectureShowcaseProps> = ({ isDark }) => {
  // Spotlight card mouse tracking for 21st.dev effect
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const [c1Pos, setC1Pos] = useState<{ x: number; y: number; hover: boolean }>({ x: 0, y: 0, hover: false });
  const [c2Pos, setC2Pos] = useState<{ x: number; y: number; hover: boolean }>({ x: 0, y: 0, hover: false });

  const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card1Ref.current) return;
    const r = card1Ref.current.getBoundingClientRect();
    setC1Pos({ x: e.clientX - r.left, y: e.clientY - r.top, hover: true });
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card2Ref.current) return;
    const r = card2Ref.current.getBoundingClientRect();
    setC2Pos({ x: e.clientX - r.left, y: e.clientY - r.top, hover: true });
  };

  return (
    <section id="architecture" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/40">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
            <Layers className="w-3.5 h-3.5" />
            V8 ISOLATE RUNTIME ARCHITECTURE
          </span>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Zero Container Virtualization Overhead
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          How AuraEdge Eliminates Cold Starts
        </h2>
        <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Traditional serverless spins up entire guest operating systems and runtime containers. AuraEdge initiates sandboxed V8 execution contexts inside pre-warmed native isolates.
        </p>
      </div>

      {/* Main Architecture Comparison Panel */}
      <div className={`rounded-xl border p-6 mb-8 transition-colors overflow-x-auto ${
        isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300'
      }`}>
        <h3 className="text-base font-semibold font-mono mb-4 text-emerald-500 flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          SYSTEM EXECUTION BENCHMARK
        </h3>

        <div className="min-w-[600px]">
          <div className={`grid grid-cols-4 pb-3 border-b text-xs font-mono ${
            isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>SPECIFICATION</span>
            <span>LEGACY CONTAINER RUNTIMES</span>
            <span>STANDARD NODE INSTANCES</span>
            <span className="text-emerald-500 font-semibold">AURAEDGE V8 ISOLATES</span>
          </div>

          <div className={`divide-y text-xs font-mono ${isDark ? 'divide-slate-800/40' : 'divide-slate-100'}`}>
            <div className="grid grid-cols-4 py-3 items-center">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>P99 Cold-Start Time</span>
              <span className="text-slate-400">450ms to 2200ms</span>
              <span className="text-slate-400">120ms to 600ms</span>
              <span className="text-emerald-500 font-bold">2.9ms to 4.8ms</span>
            </div>

            <div className="grid grid-cols-4 py-3 items-center">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Baseline Memory Footprint</span>
              <span className="text-slate-400">128MB to 512MB</span>
              <span className="text-slate-400">64MB to 128MB</span>
              <span className="text-emerald-500 font-bold">&lt; 3MB Per Isolate</span>
            </div>

            <div className="grid grid-cols-4 py-3 items-center">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Global Distribution Model</span>
              <span className="text-slate-400">Single Central Region</span>
              <span className="text-slate-400">Multi-Region Replication</span>
              <span className="text-emerald-500 font-bold">310 Anycast Edge PoPs</span>
            </div>

            <div className="grid grid-cols-4 py-3 items-center">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Compilation Target</span>
              <span className="text-slate-400">Docker Image Tarball</span>
              <span className="text-slate-400">JavaScript Bundle</span>
              <span className="text-emerald-500 font-bold">WebAssembly Bytecode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two 21st.dev-grade Magnetic Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spotlight Card 1 */}
        <div
          ref={card1Ref}
          onMouseMove={handleMouseMove1}
          onMouseLeave={() => setC1Pos(p => ({ ...p, hover: false }))}
          className={`relative rounded-xl border p-6 overflow-hidden transition-all select-none ${
            isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300'
          }`}
        >
          {/* Spotlight Beam */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-200"
            style={{
              opacity: c1Pos.hover ? 1 : 0,
              background: `radial-gradient(360px circle at ${c1Pos.x}px ${c1Pos.y}px, rgba(16, 185, 129, 0.14), transparent 80%)`,
            }}
          />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4">
              <Zap className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-semibold mb-2">Sub-5ms Memory Isolation</h3>
            <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Multiple developer isolates run concurrently within a shared native host process without memory leakage or cross-tenant security risk.
            </p>

            <div className={`p-3 rounded-lg border text-xs font-mono space-y-1.5 ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center justify-between">
                <span>Thread Concurrency:</span>
                <span className="text-emerald-500 font-bold">Async epoll Event Loop</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security Sandbox:</span>
                <span className="text-emerald-500 font-bold">V8 Hardened Boundaries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight Card 2 */}
        <div
          ref={card2Ref}
          onMouseMove={handleMouseMove2}
          onMouseLeave={() => setC2Pos(p => ({ ...p, hover: false }))}
          className={`relative rounded-xl border p-6 overflow-hidden transition-all select-none ${
            isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300'
          }`}
        >
          {/* Spotlight Beam */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-200"
            style={{
              opacity: c2Pos.hover ? 1 : 0,
              background: `radial-gradient(360px circle at ${c2Pos.x}px ${c2Pos.y}px, rgba(16, 185, 129, 0.14), transparent 80%)`,
            }}
          />

          <div className="relative z-10">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4">
              <Network className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-semibold mb-2">Automated Anycast Routing</h3>
            <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every inbound packet hits the closest geographical point of presence via BGP routing. No centralized load balancer bottleneck.
            </p>

            <div className={`p-3 rounded-lg border text-xs font-mono space-y-1.5 ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center justify-between">
                <span>Route Protocol:</span>
                <span className="text-emerald-500 font-bold">BGP Anycast + QUIC/HTTP3</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Failover Convergence:</span>
                <span className="text-emerald-500 font-bold">&lt; 250ms Global Reroute</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
