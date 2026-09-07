import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, ArrowRight } from 'lucide-react';

type WaveformMode = 'harmonic' | 'transient' | 'jitter';

export const HeroInstrument: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [timebase, setTimebase] = useState<number>(50); // 50 microseconds
  const [gain, setGain] = useState<number>(1);
  const [waveMode, setWaveMode] = useState<WaveformMode>('harmonic');

  // Telemetry metrics
  const [vpp] = useState<number>(3.24);
  const [freqKHz] = useState<number>(14.28);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      const w = (canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1));
      const h = (canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1));

      // Background Plate
      ctx.fillStyle = '#0E1015';
      ctx.fillRect(0, 0, w, h);

      // Oscilloscope Reticle Grid
      ctx.strokeStyle = '#1A1E27';
      ctx.lineWidth = 1;

      // 8 horizontal divisions, 10 vertical divisions
      const divX = w / 10;
      const divY = h / 8;

      for (let x = 0; x <= 10; x++) {
        ctx.beginPath();
        ctx.moveTo(x * divX, 0);
        ctx.lineTo(x * divX, h);
        ctx.stroke();
      }

      for (let y = 0; y <= 8; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * divY);
        ctx.lineTo(w, y * divY);
        ctx.stroke();
      }

      // Center crosshair graticule
      ctx.strokeStyle = '#2B3242';
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      if (isRunning) {
        t += 0.024 * (timebase / 50);
      }

      // Draw Channel A (Copper / Amber Primary Signal)
      ctx.strokeStyle = '#E07A5F';
      ctx.lineWidth = 2.2;
      ctx.beginPath();

      const centerY = h / 2;
      const amp = (h * 0.28) * gain;

      for (let x = 0; x <= w; x += 3) {
        const nx = x / w;
        let y = centerY;

        if (waveMode === 'harmonic') {
          y = centerY + Math.sin(nx * 18 + t * 4) * amp * 0.75 + Math.sin(nx * 36 - t * 2) * (amp * 0.25);
        } else if (waveMode === 'transient') {
          const spike = Math.exp(-Math.pow((nx - (t % 1)) * 14, 2));
          y = centerY - (spike * amp * 1.5) + Math.sin(nx * 40 + t) * (amp * 0.08);
        } else {
          // Jitter mode
          const noise = (Math.sin(nx * 80 + t * 10) * 0.2 + (Math.random() - 0.5) * 0.15);
          y = centerY + (Math.sin(nx * 12 + t * 3) + noise) * amp;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Channel B (Phosphor Green Secondary Clock Signal)
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 1.4;
      ctx.beginPath();

      const clockAmp = h * 0.14;
      const clockCenterY = h * 0.78;

      for (let x = 0; x <= w; x += 4) {
        const nx = x / w;
        // Square wave clock pulses
        const clockVal = Math.sin(nx * 44 + t * 4) > 0 ? 1 : -1;
        const cy = clockCenterY + clockVal * clockAmp * 0.6;
        if (x === 0) ctx.moveTo(x, cy);
        else ctx.lineTo(x, cy);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, timebase, gain, waveMode]);

  return (
    <section id="instrument" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#232834]">
      {/* Editorial Headline - NO KICKER (Impeccable craft floor) */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F1F4F7] leading-[1.1] text-balance">
          Microsecond telemetry without sampling loss.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[#8D96A5] leading-relaxed max-w-2xl text-balance">
          Chronicle captures high-frequency event vectors across distributed infrastructure, streaming raw hardware waveforms into lockless ring buffers with sub-millisecond precision.
        </p>

        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <a
            href="#access"
            className="px-6 py-3 rounded text-xs font-mono font-semibold bg-[#E07A5F] hover:bg-[#d56b4f] text-[#0C0D10] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>PROVISION RUNTIME NODE</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#schematic"
            className="px-6 py-3 rounded text-xs font-mono font-semibold border border-[#2B3242] bg-[#14171C] hover:bg-[#1A1E27] text-[#E8ECEF] transition-colors cursor-pointer"
          >
            <span>INSPECT MEMORY BUS</span>
          </a>
        </div>
      </div>

      {/* Industrial Oscilloscope Hardware Interface */}
      <div className="rounded-lg border border-[#232834] bg-[#14171C] overflow-hidden shadow-2xl">
        {/* Chassis Top Bar */}
        <div className="px-4 py-2.5 border-b border-[#232834] bg-[#0E1015] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-[#E07A5F] font-bold">CH1: DC 50Ω [10X]</span>
            <span className="text-[#10B981] font-bold">CH2: CLOCK 10MHz</span>
          </div>

          <div className="flex items-center gap-3 tabular-nums text-[#8D96A5]">
            <span>Vpp: <strong className="text-[#F1F4F7]">{vpp}V</strong></span>
            <span>Freq: <strong className="text-[#F1F4F7]">{freqKHz} kHz</strong></span>
            <span>Scale: <strong className="text-[#F1F4F7]">{timebase}µs/div</strong></span>
          </div>
        </div>

        {/* Live Canvas Waveform Display */}
        <div className="relative w-full h-[360px] sm:h-[440px] bg-[#0E1015]">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="Real-time dual-trace signal oscilloscope canvas"
          />

          {/* Trigger indicator badge */}
          <div className="absolute top-3 right-3 pointer-events-none px-2.5 py-1 rounded border border-[#232834] bg-[#0C0D10]/80 text-[11px] font-mono text-[#10B981] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>TRIGGER: AUTO (EDGE)</span>
          </div>
        </div>

        {/* Hardware Control Deck */}
        <div className="p-4 sm:p-5 border-t border-[#232834] bg-[#111318] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          {/* Signal Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[#8D96A5]">SIGNAL:</span>
            {(['harmonic', 'transient', 'jitter'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setWaveMode(mode)}
                className={`px-3 py-1 rounded text-xs transition-colors uppercase cursor-pointer ${
                  waveMode === mode
                    ? 'bg-[#E07A5F] text-[#0C0D10] font-bold'
                    : 'bg-[#181B22] border border-[#2B3242] text-[#8D96A5] hover:text-[#F1F4F7]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Timebase and Gain Stepper */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-[#8D96A5]">TIMEBASE:</span>
              {[10, 50, 200].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimebase(t)}
                  className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                    timebase === t
                      ? 'border-[#E07A5F] text-[#E07A5F] font-bold'
                      : 'border-[#2B3242] bg-[#181B22] text-[#8D96A5]'
                  }`}
                >
                  {t}µs
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#8D96A5]">GAIN:</span>
              {[1, 2].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGain(g)}
                  className={`px-2 py-0.5 rounded border text-[11px] cursor-pointer ${
                    gain === g
                      ? 'border-[#E07A5F] text-[#E07A5F] font-bold'
                      : 'border-[#2B3242] bg-[#181B22] text-[#8D96A5]'
                  }`}
                >
                  {g}X
                </button>
              ))}
            </div>

            {/* Run / Stop Button */}
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#2B3242] bg-[#181B22] hover:bg-[#20252F] text-[#F1F4F7] transition-colors cursor-pointer"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5 text-[#E07A5F]" /> : <Play className="w-3.5 h-3.5 text-[#10B981]" />}
              <span>{isRunning ? 'FREEZE' : 'RUN'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
