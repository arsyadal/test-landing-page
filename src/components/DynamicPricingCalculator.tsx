import React, { useState } from 'react';
import { Calculator, Check, ArrowRight } from 'lucide-react';

interface DynamicPricingCalculatorProps {
  isDark: boolean;
}

export const DynamicPricingCalculator: React.FC<DynamicPricingCalculatorProps> = ({ isDark }) => {
  const [requestsMillions, setRequestsMillions] = useState<number>(5); // 5 million
  const [avgDurationMs, setAvgDurationMs] = useState<number>(15); // 15 ms

  // Calculation logic:
  // First 1M requests are FREE
  // Requests above 1M: $0.40 per 1M
  // Memory compute: (requests * durationMs / 1000) * 0.000014
  const billableRequests = Math.max(0, requestsMillions - 1);
  const requestCost = billableRequests * 0.40;
  const computeSeconds = (requestsMillions * 1_000_000 * (avgDurationMs / 1000));
  const memoryCost = (computeSeconds * 0.0000012);
  const totalCost = requestsMillions <= 1 ? 0 : parseFloat((requestCost + memoryCost).toFixed(2));
  const legacyCloudCost = parseFloat((requestsMillions * 1.85 + 24.0).toFixed(2));
  const savingsPct = Math.max(0, Math.round(((legacyCloudCost - totalCost) / legacyCloudCost) * 100));

  return (
    <section id="pricing" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/40">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/30 mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>TRANSPARENT USAGE ESTIMATOR</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Dynamic Compute Pricing Calculator
        </h2>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          No hidden seat licenses. First 1,000,000 invocations every month are completely free. Adjust volume to estimate production costs.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className={`rounded-xl border p-6 lg:p-8 max-w-4xl mx-auto transition-colors ${
        isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300 shadow-md'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Sliders (Left 7 Cols) */}
          <div className="md:col-span-7 space-y-6">
            {/* Slider 1: Requests */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  Monthly Invocations
                </span>
                <span className="text-sm font-bold font-mono text-emerald-500">
                  {requestsMillions >= 1 ? `${requestsMillions} Million` : `${requestsMillions * 1000}K`} requests
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="50"
                step="0.5"
                value={requestsMillions}
                onChange={(e) => setRequestsMillions(parseFloat(e.target.value))}
                className={`w-full accent-emerald-500 cursor-pointer h-2 rounded-lg appearance-none ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
                aria-label="Adjust monthly invocation volume"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>500K (Free Tier)</span>
                <span>25M</span>
                <span>50M Requests</span>
              </div>
            </div>

            {/* Slider 2: Average Duration */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  Execution Duration (Avg)
                </span>
                <span className="text-sm font-bold font-mono text-emerald-500">
                  {avgDurationMs} ms / request
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="80"
                step="1"
                value={avgDurationMs}
                onChange={(e) => setAvgDurationMs(parseInt(e.target.value))}
                className={`w-full accent-emerald-500 cursor-pointer h-2 rounded-lg appearance-none ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
                aria-label="Adjust average execution duration in milliseconds"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>2ms (Snappy)</span>
                <span>40ms</span>
                <span>80ms</span>
              </div>
            </div>

            {/* Feature Inclusion Checklist */}
            <div className={`pt-4 border-t space-y-2 text-xs font-mono ${
              isDark ? 'border-slate-800/60 text-slate-300' : 'border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>310 Global Anycast PoP Locations Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Automated TLS 1.3 Certificates & Custom Domains</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>First 1,000,000 Requests 100% Free Every Month</span>
              </div>
            </div>
          </div>

          {/* Calculated Output Summary Card (Right 5 Cols) */}
          <div className={`md:col-span-5 rounded-xl border p-6 flex flex-col justify-between text-center ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                ESTIMATED MONTHLY COST
              </span>

              <div className="my-3">
                <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-500">
                  ${totalCost.toFixed(2)}
                  <span className="text-xs font-normal text-slate-400"> / month</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  {requestsMillions <= 1 ? 'Free Developer Tier Applied' : 'Pro Edge Scale Tier'}
                </div>
              </div>

              <div className={`p-3 rounded-lg border text-xs font-mono mb-6 ${
                isDark ? 'bg-black/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <div className="text-slate-400 text-[10px] mb-0.5">LEGACY CLOUD ESTIMATE</div>
                <div className="line-through text-slate-500">${legacyCloudCost} / mo</div>
                <div className="text-emerald-500 font-bold mt-0.5">~{savingsPct}% Estimated Savings</div>
              </div>
            </div>

            <a
              href="#waitlist"
              className="w-full py-2.5 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>LOCK IN ESTIMATE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
