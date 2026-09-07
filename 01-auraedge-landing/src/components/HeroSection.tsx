import React, { useState } from 'react';
import { Globe, ArrowRight, Play, Check, Copy, Radio, Activity } from 'lucide-react';

interface HeroSectionProps {
  isDark: boolean;
}

type EdgeRegion = 'nrt' | 'fra' | 'sjc' | 'sin' | 'lhr';

interface RegionData {
  id: EdgeRegion;
  code: string;
  city: string;
  country: string;
  latencyMs: number;
  popStatus: 'Nominal' | 'Optimal';
  hops: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
  const [selectedRegion, setSelectedRegion] = useState<EdgeRegion>('nrt');
  const [copiedCurl, setCopiedCurl] = useState<boolean>(false);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  const regions: Record<EdgeRegion, RegionData> = {
    nrt: {
      id: 'nrt',
      code: 'NRT-01',
      city: 'Tokyo',
      country: 'Japan',
      latencyMs: 3.8,
      popStatus: 'Optimal',
      hops: ['Client BGP Gateway', 'Anycast Core Edge', 'Wasm V8 Isolate Node', 'Response Handshake'],
    },
    fra: {
      id: 'fra',
      code: 'FRA-04',
      city: 'Frankfurt',
      country: 'Germany',
      latencyMs: 4.2,
      popStatus: 'Optimal',
      hops: ['DE-CIX Exchange', 'Frankfurt Edge Mesh', 'Wasm Isolate Runtime', 'TLS Socket Stream'],
    },
    sjc: {
      id: 'sjc',
      code: 'SJC-02',
      city: 'Silicon Valley',
      country: 'USA',
      latencyMs: 2.9,
      popStatus: 'Optimal',
      hops: ['San Jose Fiber Peering', 'Silicon Anycast Pod', 'Edge Memory Context', 'Payload Ack'],
    },
    sin: {
      id: 'sin',
      code: 'SIN-01',
      city: 'Singapore',
      country: 'Singapore',
      latencyMs: 3.4,
      popStatus: 'Optimal',
      hops: ['Equinix SG1 Gateway', 'Singapore Subsea Ring', 'Isolate VM Worker', 'HTTP/3 Quic Stream'],
    },
    lhr: {
      id: 'lhr',
      code: 'LHR-03',
      city: 'London',
      country: 'UK',
      latencyMs: 4.1,
      popStatus: 'Optimal',
      hops: ['LINX London Hub', 'Thames Edge Server', 'Wasm Context Execution', 'Chunk Delivered'],
    },
  };

  const activeRegion = regions[selectedRegion];

  const handleCopyCurl = () => {
    const cmd = `curl -X POST https://${activeRegion.id}.edge.auraedge.dev/v1/stream -H "Content-Type: application/json" -d '{"event":"user.login","region":"${activeRegion.code}"}'`;
    navigator.clipboard.writeText(cmd);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const triggerSimulatedPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
    }, 450);
  };

  return (
    <section id="simulator" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 overflow-hidden">
      {/* Hero Headline and Callout */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-6 bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
          <Activity className="w-3.5 h-3.5" />
          <span>V8 ISOLATES WITH SUB-5MS COLD STARTS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Compile Event Streams. Execute at the Global Edge.
        </h1>

        <p className={`mt-5 text-sm sm:text-base leading-relaxed ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          AuraEdge compiles developer event handlers into compact WebAssembly isolates. Run serverless code within 4 milliseconds of user devices across 310 global points of presence.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#waitlist"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>START FREE DEPLOYMENT</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#sandbox"
            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-mono font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200'
                : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs'
            } focus-visible:ring-2 focus-visible:ring-emerald-500`}
          >
            <span>OPEN STREAM SANDBOX</span>
          </a>
        </div>

        {/* Verifiable Architecture Metrics */}
        <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/40 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-500">310</div>
            <div className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Global PoP Locations</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-500">&lt; 4.8ms</div>
            <div className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>P99 Cold Start</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-500">100%</div>
            <div className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Wasm & V8 Isolates</div>
          </div>
        </div>
      </div>

      {/* 21st.dev-grade Interactive PoP Terminal Simulator */}
      <div className={`relative rounded-2xl border shadow-2xl overflow-hidden transition-all ${
        isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300'
      }`}>
        {/* Terminal Header */}
        <div className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'bg-[#0B0E17] border-[#1E2438]' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-400 ml-2">
              terminal://auraedge-global-observatory
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>LIVE EDGE SIMULATOR</span>
            </span>
          </div>
        </div>

        {/* Terminal Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/60">
          {/* Left Column: Interactive Region Selector */}
          <div className="lg:col-span-4 p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/40">
              <span>SELECT TARGET REGION</span>
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
            </div>

            <div className="space-y-2">
              {(Object.keys(regions) as EdgeRegion[]).map((rKey) => {
                const reg = regions[rKey];
                const isSelected = selectedRegion === rKey;
                return (
                  <button
                    key={rKey}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(rKey);
                      triggerSimulatedPing();
                    }}
                    className={`w-full p-3 rounded-lg border text-left font-mono transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 shadow-xs'
                        : isDark
                        ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700 text-slate-300'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">{reg.city}</span>
                        <span className="text-[10px] text-slate-400">({reg.country})</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{reg.code}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-500">{reg.latencyMs} ms</div>
                      <span className="text-[10px] text-emerald-500/80">{reg.popStatus}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Route Hop Breakdown & Command Line */}
          <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-slate-800/40">
                <span className="text-slate-400">PROPAGATION ROUTE ANALYSIS</span>
                <button
                  type="button"
                  onClick={triggerSimulatedPing}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>{isPinging ? 'ANALYZING...' : 'RE-PING'}</span>
                </button>
              </div>

              {/* Hop Sequence Trace */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-2">
                {activeRegion.hops.map((hop, index) => (
                  <div
                    key={hop}
                    className={`p-3 rounded-lg border text-left font-mono text-xs transition-all ${
                      isPinging ? 'opacity-40' : 'opacity-100'
                    } ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 mb-1">HOP 0{index + 1}</div>
                    <div className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{hop}</div>
                    <div className="text-[10px] text-emerald-500 mt-1">
                      +{(0.8 + index * 0.9).toFixed(1)}ms
                    </div>
                  </div>
                ))}
              </div>

              {/* cURL Snippet Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>DISPATCH RUNTIME TEST</span>
                  <button
                    type="button"
                    onClick={handleCopyCurl}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCurl ? 'COPIED TO CLIPBOARD' : 'COPY CURL'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-lg bg-[#07090F] border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto select-all">
                  <code>
                    curl -X POST https://{activeRegion.id}.edge.auraedge.dev/v1/stream -d '{`{"event":"user.login","region":"${activeRegion.code}"}`}'
                  </code>
                </div>
              </div>
            </div>

            {/* Diagnostic Footer */}
            <div className="pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <span>Active TLS 1.3 Multiplexing</span>
              <span className="text-emerald-400">
                P99 Latency: {activeRegion.latencyMs}ms verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
