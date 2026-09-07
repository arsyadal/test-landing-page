import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Code2, Sliders, Activity, MousePointer2 } from 'lucide-react';
import type { ShaderParams, RuntimeMetrics, PalettePreset } from '../types';

interface ShaderPlaygroundProps {
  onExportCode: (params: ShaderParams) => void;
  isDark: boolean;
}

export const ShaderPlayground: React.FC<ShaderPlaygroundProps> = ({ onExportCode, isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const framesCountRef = useRef<number>(0);
  const lastFpsUpdateRef = useRef<number>(performance.now());
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [params, setParams] = useState<ShaderParams>({
    mode: 'plasma',
    speed: 1.0,
    frequency: 3.2,
    density: 64,
    colorPreset: 'emerald',
    interactiveMouse: true,
    wireframe: false,
  });

  const [metrics, setMetrics] = useState<RuntimeMetrics>({
    fps: 60,
    frameTimeMs: 1.2,
    verticesRendered: 4096,
    activeCanvasWidth: 800,
    activeCanvasHeight: 500,
  });

  // Particles state for particles mode
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }>>([]);

  const initParticles = useCallback((width: number, height: number, count: number, preset: string) => {
    const colors = {
      emerald: ['#10B981', '#059669', '#34D399', '#6EE7B7'],
      amber: ['#F59E0B', '#D97706', '#FBBF24', '#FCD34D'],
      void: ['#818CF8', '#6366F1', '#4F46E5', '#A5B4FC'],
      arctic: ['#38BDF8', '#0284C7', '#7DD3FC', '#BAE6FD'],
    }[preset] || ['#10B981', '#34D399'];

    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = newParticles;
  }, []);

  // Handle Canvas Resize
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    setMetrics(prev => ({
      ...prev,
      activeCanvasWidth: Math.floor(rect.width),
      activeCanvasHeight: Math.floor(rect.height),
    }));

    if (params.mode === 'particles') {
      initParticles(canvas.width, canvas.height, params.density * 2, params.colorPreset);
    }
  }, [params.mode, params.density, params.colorPreset, initParticles]);

  useEffect(() => {
    updateCanvasDimensions();
    const handleResize = () => updateCanvasDimensions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCanvasDimensions]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      framesCountRef.current++;
      if (now - lastFpsUpdateRef.current >= 500) {
        const measuredFps = Math.round((framesCountRef.current * 1000) / (now - lastFpsUpdateRef.current));
        const avgFrameMs = parseFloat((1000 / Math.max(measuredFps, 1)).toFixed(2));
        setMetrics(prev => ({
          ...prev,
          fps: measuredFps,
          frameTimeMs: avgFrameMs,
        }));
        framesCountRef.current = 0;
        lastFpsUpdateRef.current = now;
      }

      if (isPlaying) {
        time += delta * params.speed;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Clear Canvas
      ctx.fillStyle = isDark ? '#0B0D13' : '#F8FAFC';
      ctx.fillRect(0, 0, w, h);

      const mouseX = mousePosRef.current.active ? mousePosRef.current.x * (w / (canvas.clientWidth || 1)) : w * 0.5;
      const mouseY = mousePosRef.current.active ? mousePosRef.current.y * (h / (canvas.clientHeight || 1)) : h * 0.5;

      if (params.mode === 'plasma') {
        const step = Math.max(8, Math.floor(128 - params.density));
        let count = 0;

        const cols = Math.ceil(w / step);
        const rows = Math.ceil(h / step);

        for (let y = 0; y <= rows; y++) {
          for (let x = 0; x <= cols; x++) {
            const px = x * step;
            const py = y * step;

            const nx = (px / w - 0.5) * params.frequency;
            const ny = (py / h - 0.5) * params.frequency;

            const dx = (px - mouseX) / w;
            const dy = (py - mouseY) / h;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const mouseInfluence = params.interactiveMouse ? Math.sin(dist * 8.0 - time * 2.0) * 0.4 : 0;

            const val = (
              Math.sin(nx + time) +
              Math.sin(ny * 1.5 - time * 0.8) +
              Math.sin((nx + ny + time) * 0.7) +
              Math.sin(Math.sqrt(nx * nx + ny * ny) * 2.0 + time) +
              mouseInfluence
            ) / 4.0;

            const normalized = (val + 1) / 2;

            let r = 0, g = 0, b = 0;
            if (params.colorPreset === 'emerald') {
              r = Math.floor(16 + normalized * 32);
              g = Math.floor(140 + normalized * 105);
              b = Math.floor(90 + normalized * 110);
            } else if (params.colorPreset === 'amber') {
              r = Math.floor(200 + normalized * 55);
              g = Math.floor(120 + normalized * 80);
              b = Math.floor(10 + normalized * 50);
            } else if (params.colorPreset === 'void') {
              r = Math.floor(90 + normalized * 100);
              g = Math.floor(80 + normalized * 90);
              b = Math.floor(200 + normalized * 55);
            } else {
              r = Math.floor(30 + normalized * 70);
              g = Math.floor(170 + normalized * 75);
              b = Math.floor(220 + normalized * 35);
            }

            const alpha = isDark ? (0.25 + normalized * 0.65) : (0.45 + normalized * 0.55);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

            const pointSize = params.wireframe ? 2 : step * 0.8 * (0.3 + normalized * 0.7);
            ctx.beginPath();
            ctx.arc(px, py, pointSize / 2, 0, Math.PI * 2);
            ctx.fill();
            count++;
          }
        }
        setMetrics(prev => ({ ...prev, verticesRendered: count }));

      } else if (params.mode === 'particles') {
        const particles = particlesRef.current;
        const maxDist = 90 * (w / 800);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (isPlaying) {
            p.x += p.vx * params.speed;
            p.y += p.vy * params.speed;

            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            if (params.interactiveMouse && mousePosRef.current.active) {
              const dx = mouseX - p.x;
              const dy = mouseY - p.y;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < 220 && d > 10) {
                p.vx += (dx / d) * 0.08 * params.speed;
                p.vy += (dy / d) * 0.08 * params.speed;
              }
            }

            p.vx *= 0.99;
            p.vy *= 0.99;
          }

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < maxDist) {
              const alpha = (1 - d / maxDist) * (isDark ? 0.35 : 0.5);
              ctx.strokeStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
        setMetrics(prev => ({ ...prev, verticesRendered: particles.length }));

      } else if (params.mode === 'voronoi') {
        const numCenters = Math.floor(params.density / 4) + 8;
        const centers: Array<{ x: number; y: number; seedX: number; seedY: number; color: string }> = [];

        for (let i = 0; i < numCenters; i++) {
          const angle = (i / numCenters) * Math.PI * 2 + time * 0.2;
          const cx = w * 0.5 + Math.cos(angle) * (w * 0.3) + Math.sin(time * 0.5 + i) * 40;
          const cy = h * 0.5 + Math.sin(angle) * (h * 0.3) + Math.cos(time * 0.5 + i) * 40;

          centers.push({
            x: cx,
            y: cy,
            seedX: cx,
            seedY: cy,
            color: params.colorPreset === 'emerald' ? '#10B981' : params.colorPreset === 'amber' ? '#F59E0B' : '#6366F1',
          });
        }

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(15, 23, 42, 0.25)';

        for (let i = 0; i < centers.length; i++) {
          for (let j = i + 1; j < centers.length; j++) {
            const d = Math.hypot(centers[i].x - centers[j].x, centers[i].y - centers[j].y);
            if (d < Math.min(w, h) * 0.4) {
              ctx.beginPath();
              ctx.moveTo(centers[i].x, centers[i].y);
              ctx.lineTo(centers[j].x, centers[j].y);
              ctx.stroke();
            }
          }
        }

        for (const c of centers) {
          ctx.fillStyle = c.color;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 4.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = c.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 10 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        setMetrics(prev => ({ ...prev, verticesRendered: centers.length }));
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [params, isPlaying, isDark, updateCanvasDimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current.active = false;
  };

  const resetDefaults = () => {
    setParams({
      mode: 'plasma',
      speed: 1.0,
      frequency: 3.2,
      density: 64,
      colorPreset: 'emerald',
      interactiveMouse: true,
      wireframe: false,
    });
  };

  const toolbarBtnClass = `inline-flex items-center gap-2 px-3 py-2 text-xs font-mono rounded border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 ${
    isDark
      ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
  }`;

  return (
    <section id="playground" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header bar of Playground */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              <Activity className="w-3.5 h-3.5" aria-hidden="true" />
              LIVE SHADER RUNTIME
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              WebGL2 / Canvas 2D Core
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Procedural Neural Shader Playground
          </h2>
          <p className={`text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Direct mathematical canvas rendering. Adjust frequency, velocity, and particle matrix in real-time with zero runtime latency.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={toolbarBtnClass}
            aria-label={isPlaying ? "Pause canvas animation" : "Resume canvas animation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
            {isPlaying ? "PAUSE" : "RESUME"}
          </button>

          <button
            type="button"
            onClick={resetDefaults}
            className={toolbarBtnClass}
            aria-label="Reset parameters to initial default values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RESET
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={toolbarBtnClass}
            aria-label={isFullscreen ? "Exit expanded viewport" : "Expand canvas viewport"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isFullscreen ? "COLLAPSE" : "EXPAND"}
          </button>

          <button
            type="button"
            onClick={() => onExportCode(params)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded transition-colors cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Export procedural canvas code"
          >
            <Code2 className="w-4 h-4" />
            EXPORT CODE
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className={`grid gap-6 transition-all duration-300 ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
        {/* Canvas Display Viewport */}
        <div
          ref={containerRef}
          className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
            isFullscreen ? 'lg:col-span-12 h-[75vh]' : 'lg:col-span-8 h-[460px] sm:h-[520px]'
          } ${isDark ? 'bg-[#0E121B] border-[#22293C]' : 'bg-slate-50 border-slate-300 shadow-xs'}`}
        >
          <div className="absolute inset-0 canvas-grid pointer-events-none opacity-40" />

          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-full h-full cursor-crosshair block"
            aria-label="Interactive procedural shader rendering canvas"
          />

          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 flex-wrap pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-slate-700 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{metrics.fps} FPS</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-slate-700 text-[11px] font-mono text-slate-200">
              <span>{metrics.frameTimeMs} ms/frame</span>
            </div>
            <div className="hidden sm:block px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-slate-700 text-[11px] font-mono text-slate-300">
              <span>{metrics.verticesRendered} nodes</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-slate-700 text-[11px] font-mono text-slate-300 pointer-events-none">
            <MousePointer2 className="w-3 h-3 text-emerald-400" />
            <span>Mouse React: {params.interactiveMouse ? 'ON' : 'OFF'}</span>
          </div>
        </div>

        {/* Tactile Control Panel (Right) */}
        {!isFullscreen && (
          <div className={`lg:col-span-4 rounded-xl border p-5 flex flex-col justify-between ${
            isDark ? 'bg-[#121622] border-[#22293C]' : 'bg-white border-slate-300 shadow-xs'
          }`}>
            <div>
              <div className={`flex items-center justify-between pb-3 mb-4 border-b ${
                isDark ? 'border-slate-800/40' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-500" />
                  <span className={`text-xs font-mono font-semibold tracking-wider uppercase ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    Shader Parameters
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                  REAL-TIME
                </span>
              </div>

              {/* Mode Switcher */}
              <div className="mb-4">
                <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                  ALGORITHM MODE
                </label>
                <div className={`grid grid-cols-3 gap-1.5 p-1 rounded-lg border ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  {(['plasma', 'particles', 'voronoi'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setParams(p => ({ ...p, mode: m }))}
                      className={`px-2 py-1.5 text-xs font-mono rounded capitalize transition-all cursor-pointer ${
                        params.mode === m
                          ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                          : isDark
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette Preset Switcher */}
              <div className="mb-5">
                <label className={`block text-xs font-mono mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700 font-medium'}`}>
                  CHROMATIC PRESET
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'emerald', label: 'Emerald', dot: '#10B981' },
                      { id: 'amber', label: 'Amber', dot: '#F59E0B' },
                      { id: 'void', label: 'Indigo', dot: '#6366F1' },
                      { id: 'arctic', label: 'Arctic', dot: '#38BDF8' },
                    ] as const
                  ).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setParams(p => ({ ...p, colorPreset: preset.id as PalettePreset }))}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                        params.colorPreset === preset.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 font-semibold'
                          : isDark
                          ? 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.dot }} />
                      <span className="text-[11px]">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-700'}>Velocity (Speed)</span>
                    <span className="text-emerald-500 font-semibold">{params.speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={params.speed}
                    onChange={(e) => setParams(p => ({ ...p, speed: parseFloat(e.target.value) }))}
                    className={`w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg appearance-none ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                    aria-label="Adjust velocity speed"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-700'}>Turbulence Frequency</span>
                    <span className="text-emerald-500 font-semibold">{params.frequency.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="8.0"
                    step="0.2"
                    value={params.frequency}
                    onChange={(e) => setParams(p => ({ ...p, frequency: parseFloat(e.target.value) }))}
                    className={`w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg appearance-none ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                    aria-label="Adjust turbulence frequency"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-700'}>Matrix Density</span>
                    <span className="text-emerald-500 font-semibold">{params.density}</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="112"
                    step="4"
                    value={params.density}
                    onChange={(e) => setParams(p => ({ ...p, density: parseInt(e.target.value) }))}
                    className={`w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg appearance-none ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                    aria-label="Adjust matrix density"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className={`mt-5 pt-4 border-t space-y-2.5 ${isDark ? 'border-slate-800/40' : 'border-slate-200'}`}>
                <label className={`flex items-center justify-between text-xs font-mono cursor-pointer ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <span>Interactive Mouse Gravitation</span>
                  <input
                    type="checkbox"
                    checked={params.interactiveMouse}
                    onChange={(e) => setParams(p => ({ ...p, interactiveMouse: e.target.checked }))}
                    className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                  />
                </label>

                <label className={`flex items-center justify-between text-xs font-mono cursor-pointer ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <span>Point Wireframe Matrix</span>
                  <input
                    type="checkbox"
                    checked={params.wireframe}
                    onChange={(e) => setParams(p => ({ ...p, wireframe: e.target.checked }))}
                    className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Quick Diagnostic Footnote */}
            <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
              isDark ? 'border-slate-800/40 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <span>Resolution</span>
              <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {metrics.activeCanvasWidth} x {metrics.activeCanvasHeight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
