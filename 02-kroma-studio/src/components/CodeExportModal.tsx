import React, { useEffect, useState } from 'react';
import { X, Copy, Check, Terminal } from 'lucide-react';
import type { ShaderParams } from '../types';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: ShaderParams;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose, params }) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Close on Escape key (Anti-Slop R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const generatedSnippet = `// Kroma Lab Procedural Shader Canvas Engine
// Mode: ${params.mode} | Speed: ${params.speed}x | Frequency: ${params.frequency} | Preset: ${params.colorPreset}

import React, { useEffect, useRef } from 'react';

export const NeuralShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.016 * ${params.speed};
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = canvas.clientHeight);

      // Render Procedural Wave Math
      ctx.fillStyle = '#0B0D13';
      ctx.fillRect(0, 0, w, h);

      const step = ${Math.max(8, Math.floor(128 - params.density))};
      for (let y = 0; y <= h; y += step) {
        for (let x = 0; x <= w; x += step) {
          const nx = (x / w - 0.5) * ${params.frequency};
          const ny = (y / h - 0.5) * ${params.frequency};
          const v = (Math.sin(nx + time) + Math.sin(ny * 1.5 - time * 0.8)) / 2;
          const alpha = 0.3 + (v + 1) * 0.35;
          ctx.fillStyle = '${params.colorPreset === 'emerald' ? 'rgba(16, 185, 129,' : params.colorPreset === 'amber' ? 'rgba(245, 158, 11,' : 'rgba(99, 102, 241,'} ' + alpha + ')';
          ctx.beginPath();
          ctx.arc(x, y, step * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl border border-slate-800 bg-[#0B0D13]"
    />
  );
};
export default NeuralShaderCanvas;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl border border-slate-800 bg-[#121622] p-6 shadow-2xl text-slate-100 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 id="modal-title" className="text-base font-semibold font-mono">
              Export Production Component Code
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Code Display */}
        <div className="mt-4 flex-1 overflow-auto rounded-lg bg-[#0A0C12] border border-slate-800/80 p-4 font-mono text-xs text-emerald-300 leading-relaxed select-text">
          <pre>
            <code>{generatedSnippet}</code>
          </pre>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Self-contained React TypeScript component
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-mono rounded border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
            >
              DISMISS
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
              aria-label="Copy React shader code to clipboard"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'COPIED TO CLIPBOARD' : 'COPY SNIPPET'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
