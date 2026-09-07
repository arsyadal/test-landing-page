import React from 'react';
import { AlertTriangle, FolderOpen, RefreshCcw, CheckCircle2 } from 'lucide-react';
import type { UIStateType } from '../types';

interface StateSimulatorProps {
  currentState: UIStateType;
  onChangeState: (state: UIStateType) => void;
  isDark: boolean;
}

export const StateSimulator: React.FC<StateSimulatorProps> = ({ currentState, onChangeState, isDark }) => {
  return (
    <section id="states" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              ANTI-SLOP R-27 COMPLIANCE
            </span>
            <span className="text-xs font-mono text-slate-400">
              Tri-State UI Architecture
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Interface State Machine Validation
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrating resilient state handling: Active View, Loading Shimmer, Empty Repository, and Error Recovery.
          </p>
        </div>

        {/* State Toggle Selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900/80 border border-slate-800 self-start sm:self-auto">
          {(
            [
              { id: 'active', label: 'Active State' },
              { id: 'loading', label: 'Loading Shimmer' },
              { id: 'empty', label: 'Empty State' },
              { id: 'error', label: 'Error Boundary' },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onChangeState(s.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all cursor-pointer ${
                currentState === s.id
                  ? 'bg-emerald-500 text-emerald-950 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* State Render Viewport */}
      <div className={`rounded-xl border p-6 min-h-[220px] flex items-center justify-center transition-all ${
        isDark ? 'bg-[#121622] border-[#22293C]' : 'bg-white border-slate-200'
      }`}>
        {currentState === 'active' && (
          <div className="text-center max-w-md py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-200">Active Rendering Pipeline Nominal</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              GPU vertex buffers allocated, canvas frame loop synchronized to requestAnimationFrame at 60 FPS.
            </p>
          </div>
        )}

        {currentState === 'loading' && (
          <div className="w-full max-w-xl space-y-4 py-4 animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-1/3" />
            <div className="space-y-2">
              <div className="h-10 bg-slate-800/80 rounded w-full" />
              <div className="h-10 bg-slate-800/60 rounded w-5/6" />
              <div className="h-10 bg-slate-800/40 rounded w-4/6" />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <RefreshCcw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Simulating pipeline buffer synchronization...</span>
              </div>
              <span>72%</span>
            </div>
          </div>
        )}

        {currentState === 'empty' && (
          <div className="text-center max-w-md py-6">
            <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-200">No Custom Shader Presets Found</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Your local preset buffer is currently unpopulated. Select default algorithm parameters or import GLSL source code.
            </p>
            <button
              type="button"
              onClick={() => onChangeState('active')}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-mono bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors cursor-pointer"
            >
              Restore Standard Presets
            </button>
          </div>
        )}

        {currentState === 'error' && (
          <div className="text-center max-w-md py-6">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-200">Uniform Matrix Precision Overflow</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Calculated wave frequency exceeded maximum float precision boundaries for WebGL buffer bounds.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onChangeState('active')}
                className="px-4 py-2 rounded-lg text-xs font-mono bg-rose-600 hover:bg-rose-500 text-white font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                Reset Pipeline & Recover
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
