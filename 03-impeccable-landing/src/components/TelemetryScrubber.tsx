import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface AnomalyEvent {
  offsetSeconds: number;
  label: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  metric: string;
  rootCause: string;
  traceId: string;
}

export const TelemetryScrubber: React.FC = () => {
  const [scrubPosition, setScrubPosition] = useState<number>(-18.4);

  const anomalies: AnomalyEvent[] = [
    {
      offsetSeconds: -48.2,
      label: 'Ring Buffer L1 Saturation',
      severity: 'WARNING',
      metric: 'Threshold exceeded: 88.4% fill capacity',
      rootCause: 'Consumer worker thread starved during garbage collection pause on downstream service.',
      traceId: '0x7f8a92b410de',
    },
    {
      offsetSeconds: -18.4,
      label: 'Hardware TSC Clock Skew',
      severity: 'CRITICAL',
      metric: 'Drift delta: +4.21µs across socket 0 and socket 1',
      rootCause: 'PTP IEEE-1588 master synchronization pulse dropped by switch port optical transceiver.',
      traceId: '0x3c19e844fa02',
    },
    {
      offsetSeconds: -4.1,
      label: 'Out-of-Order Packet Injection',
      severity: 'INFO',
      metric: 'Sequence divergence: Packet #841029 preceded #841028',
      rootCause: 'Alternate multi-path routing convergence delay on secondary fiber line.',
      traceId: '0x99e012fa88bc',
    },
  ];

  // Find closest anomaly or active diagnostic
  const activeIncident = anomalies.reduce((prev, curr) => {
    return Math.abs(curr.offsetSeconds - scrubPosition) < Math.abs(prev.offsetSeconds - scrubPosition) ? curr : prev;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#232834]">
      <div className="max-w-3xl mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F4F7]">
          Historical playback down to the nanosecond.
        </h2>
        <p className="mt-3 text-sm text-[#8D96A5] leading-relaxed text-balance">
          Drill into temporal anomalies across 60 seconds of captured telemetry. Drag the timebase cursor to inspect raw diagnostic registers and trace identifiers.
        </p>
      </div>

      {/* Scrubber Container Plate */}
      <div className="rounded-lg border border-[#232834] bg-[#14171C] p-6 space-y-6">
        {/* Scrubber Bar and Ruler */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-[#8D96A5]">TEMPORAL POSITION</span>
            <span className="text-sm font-bold font-mono text-[#E07A5F] tabular-nums">
              T{scrubPosition >= 0 ? `+${scrubPosition.toFixed(1)}` : scrubPosition.toFixed(1)}s
            </span>
          </div>

          {/* Interactive Range Slider */}
          <div className="relative py-2">
            <input
              type="range"
              min="-60"
              max="0"
              step="0.1"
              value={scrubPosition}
              onChange={(e) => setScrubPosition(parseFloat(e.target.value))}
              className="w-full accent-[#E07A5F] cursor-pointer h-2 bg-[#0E1015] border border-[#2B3242] rounded-none appearance-none"
              aria-label="Drag temporal cursor to inspect telemetry history"
            />

            {/* Anomaly markers on timeline */}
            <div className="relative w-full h-4 mt-1">
              {anomalies.map((anom) => {
                const pct = ((anom.offsetSeconds - (-60)) / 60) * 100;
                return (
                  <button
                    key={anom.offsetSeconds}
                    type="button"
                    onClick={() => setScrubPosition(anom.offsetSeconds)}
                    className="absolute -translate-x-1/2 top-0 group cursor-pointer"
                    style={{ left: `${pct}%` }}
                    aria-label={`Jump to incident at ${anom.offsetSeconds} seconds`}
                  >
                    <div className={`w-2 h-2 rotate-45 border ${
                      anom.severity === 'CRITICAL'
                        ? 'bg-[#E07A5F] border-[#E07A5F]'
                        : 'bg-[#F59E0B] border-[#F59E0B]'
                    }`} />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-0.5 rounded bg-[#0C0D10] text-[10px] font-mono whitespace-nowrap border border-[#2B3242] text-[#F1F4F7]">
                      {anom.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between text-[10px] font-mono text-[#8D96A5] mt-1">
            <span>T-60.0s</span>
            <span>T-30.0s</span>
            <span>T-00.0s (NOW)</span>
          </div>
        </div>

        {/* Selected Incident Telemetry Card */}
        <div className="border border-[#232834] bg-[#0E1015] p-5 rounded">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1F242F]">
            <div className="flex items-center gap-2">
              <AlertCircle className={`w-4 h-4 ${
                activeIncident.severity === 'CRITICAL' ? 'text-[#E07A5F]' : 'text-amber-400'
              }`} />
              <span className="font-mono text-sm font-bold text-[#F1F4F7]">
                {activeIncident.label}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#8D96A5]">
              <span className="tabular-nums">TRACE: <strong className="text-[#8D96A5]">{activeIncident.traceId}</strong></span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeIncident.severity === 'CRITICAL'
                  ? 'bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30'
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              }`}>
                {activeIncident.severity}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-[#8D96A5] block text-[10px] mb-1">RECORDED PARAMETER</span>
              <p className="text-[#E8ECEF] bg-[#14171C] p-2.5 rounded border border-[#232834]">
                {activeIncident.metric}
              </p>
            </div>

            <div>
              <span className="text-[#8D96A5] block text-[10px] mb-1">DETERMINISTIC ROOT CAUSE</span>
              <p className="text-[#E8ECEF] bg-[#14171C] p-2.5 rounded border border-[#232834]">
                {activeIncident.rootCause}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
