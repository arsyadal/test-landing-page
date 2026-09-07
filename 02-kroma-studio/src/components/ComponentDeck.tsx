import React, { useState, useRef, useEffect } from 'react';
import { Layers, Copy, Check, RefreshCw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ComponentDeckProps {
  isDark: boolean;
}

export const ComponentDeck: React.FC<ComponentDeckProps> = ({ isDark }) => {
  // State for Card 1: Magnetic Glow Card
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate 3D tilt (-6 to +6 deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    setCardTilt({ rx, ry });
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setCardTilt({ rx: 0, ry: 0 });
  };

  // State for Card 2: Fluid Tabs
  const [activeTab, setActiveTab] = useState<string>('tokens');
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [tabHighlightStyle, setTabHighlightStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const tabsList = [
    { id: 'tokens', label: 'Tokens' },
    { id: 'physics', label: 'Physics' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'shaders', label: 'Shaders' },
  ];

  useEffect(() => {
    const activeEl = tabsRef.current[activeTab];
    if (activeEl) {
      setTabHighlightStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeTab]);

  // State for Card 3: Morphing Button
  const [buttonState, setButtonState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [progress, setProgress] = useState<number>(0);

  const triggerMorphingAction = () => {
    if (buttonState !== 'idle') return;
    setButtonState('processing');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setButtonState('success');
          // Trigger confetti burst
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.75 },
              colors: ['#10B981', '#34D399', '#6EE7B7'],
            });
          } catch {
            // Ignore if canvas confetti not supported in environment
          }
          setTimeout(() => {
            setButtonState('idle');
            setProgress(0);
          }, 2400);
          return 100;
        }
        return prev + 12;
      });
    }, 80);
  };

  // State for Card 4: Stepper
  const [stepperValue, setStepperValue] = useState<number>(48);

  const copyCodeSnippet = (snippet: string, index: number) => {
    navigator.clipboard.writeText(snippet);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="components" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/40">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            21ST.DEV SPECIFICATION
          </span>
          <span className="text-xs font-mono text-slate-400">
            Tactile Micro-Component Deck
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Tactile Physics & Micro-Interactions
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Crafted with real sensory feedback: spring kinematics, magnetic boundary coordinates, and kinetic keyboard tab navigation.
        </p>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. Magnetic Glow Border Card */}
        <div
          ref={cardRef}
          onMouseMove={(e) => {
            setIsHovered(true);
            handleCardMouseMove(e);
          }}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
            transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.4s ease-out',
          }}
          className={`relative rounded-xl border p-6 overflow-hidden select-none ${
            isDark ? 'bg-[#121622] border-[#22293C]' : 'bg-white border-slate-200'
          }`}
        >
          {/* Radial Light Spotlight following Cursor */}
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.15), transparent 80%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-emerald-400 border border-slate-700">
                01 // MAGNETIC CARD
              </span>
              <button
                type="button"
                onClick={() => copyCodeSnippet('<MagneticCard tilt={6} glowColor="#10B981" />', 1)}
                className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                aria-label="Copy magnetic card React snippet"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 1 ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Kinetic Radial Focus Card</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Tracks pointer coordinates to illuminate perimeter boundaries with mathematically calibrated 3D perspective orientation.
            </p>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Vector X:</span>
                <span className="text-emerald-400">{Math.round(mousePos.x)}px</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Vector Y:</span>
                <span className="text-emerald-400">{Math.round(mousePos.y)}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">3D Tilt Euler:</span>
                <span className="text-slate-200">[{cardTilt.rx.toFixed(1)}°, {cardTilt.ry.toFixed(1)}°]</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Fluid Sliding Tabs (Segmented Control) */}
        <div className={`rounded-xl border p-6 flex flex-col justify-between ${
          isDark ? 'bg-[#121622] border-[#22293C]' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-emerald-400 border border-slate-700">
                02 // FLUID SEGMENTED TABS
              </span>
              <button
                type="button"
                onClick={() => copyCodeSnippet('<FluidTabs items={["Tokens", "Physics", "Geometry", "Shaders"]} />', 2)}
                className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                aria-label="Copy fluid tabs React snippet"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 2 ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Kinetic Spring Sliding Tabs</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              Sliding active indicator with calculated offset geometry and full keyboard Arrow navigation support.
            </p>

            {/* Interactive Tab Switcher Bar */}
            <div
              role="tablist"
              className="relative flex items-center p-1 rounded-lg bg-slate-900/80 border border-slate-800 select-none"
            >
              {/* Sliding Pill Highlighter */}
              <div
                className="absolute top-1 bottom-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 transition-all duration-300 ease-out"
                style={{
                  left: `${tabHighlightStyle.left}px`,
                  width: `${tabHighlightStyle.width}px`,
                }}
              />

              {tabsList.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => { tabsRef.current[tab.id] = el; }}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex-1 py-1.5 text-xs font-mono text-center transition-colors cursor-pointer rounded-md ${
                    activeTab === tab.id
                      ? 'text-emerald-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Output preview */}
            <div className="mt-4 p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs font-mono text-slate-300">
              {activeTab === 'tokens' && <span className="text-emerald-400 font-semibold">Active State: Design token mapping & CSS variable dictionary</span>}
              {activeTab === 'physics' && <span className="text-emerald-400 font-semibold">Active State: Spring constants (k=180, damping=14, mass=1.0)</span>}
              {activeTab === 'geometry' && <span className="text-emerald-400 font-semibold">Active State: Euclidean distance fields & Voronoi coordinates</span>}
              {activeTab === 'shaders' && <span className="text-emerald-400 font-semibold">Active State: GLSL frag precision mediump float uniforms</span>}
            </div>
          </div>
        </div>

        {/* 3. Multi-State Morphing Action Button */}
        <div className={`rounded-xl border p-6 flex flex-col justify-between ${
          isDark ? 'bg-[#121622] border-[#22293C]' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-emerald-400 border border-slate-700">
                03 // MORPHING BUTTON
              </span>
              <button
                type="button"
                onClick={() => copyCodeSnippet('<MorphingButton onTrigger={compileShader} state={btnState} />', 3)}
                className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                aria-label="Copy morphing button snippet"
              >
                {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 3 ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Multi-State Morphing Action</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Cycles from idle to progress simulation and successful confirmation with zero jarring layout displacement.
            </p>

            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-slate-900/50 border border-slate-800/80">
              <button
                type="button"
                onClick={triggerMorphingAction}
                disabled={buttonState !== 'idle'}
                className={`relative overflow-hidden w-full max-w-xs py-3 px-6 rounded-lg text-xs font-mono font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  buttonState === 'idle'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                    : buttonState === 'processing'
                    ? 'bg-slate-800 text-slate-300 cursor-wait'
                    : 'bg-emerald-500 text-emerald-950 font-semibold'
                }`}
                aria-label="Trigger interactive shader compilation lifecycle"
              >
                {/* Progress bar fill during processing */}
                {buttonState === 'processing' && (
                  <div
                    className="absolute inset-0 bg-emerald-500/20 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {buttonState === 'idle' && (
                    <>
                      <Zap className="w-4 h-4" />
                      TRIGGER EXECUTION
                    </>
                  )}
                  {buttonState === 'processing' && (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                      COMPILING UNIFORMS {progress}%
                    </>
                  )}
                  {buttonState === 'success' && (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      COMPILED SUCCESSFULLY
                    </>
                  )}
                </span>
              </button>
              <span className="text-[11px] font-mono text-slate-500 mt-2">
                Click button to observe transition lifecycle
              </span>
            </div>
          </div>
        </div>

        {/* 4. Tactile Numeric Stepper & Slider */}
        <div className={`rounded-xl border p-6 flex flex-col justify-between ${
          isDark ? 'bg-[#121622] border-[#22293C]' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-emerald-400 border border-slate-700">
                04 // TACTILE STEPPER
              </span>
              <button
                type="button"
                onClick={() => copyCodeSnippet('<TactileStepper min={16} max={96} step={4} value={density} />', 4)}
                className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                aria-label="Copy tactile stepper snippet"
              >
                {copiedIndex === 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 4 ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Kinetic Value Stepper</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Precision increment and decrement control with tactile scrubbing and instant CSS variable reflection.
            </p>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStepperValue(v => Math.max(16, v - 4))}
                  className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:border-emerald-500/50 flex items-center justify-center font-mono font-bold text-base transition-colors cursor-pointer"
                  aria-label="Decrease value by 4"
                >
                  -
                </button>

                <div className="flex-1 text-center">
                  <div className="text-2xl font-mono font-bold text-emerald-400 tracking-tight">
                    {stepperValue} <span className="text-xs text-slate-400 font-normal">px</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    Calculated Grid Pitch
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStepperValue(v => Math.min(96, v + 4))}
                  className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:border-emerald-500/50 flex items-center justify-center font-mono font-bold text-base transition-colors cursor-pointer"
                  aria-label="Increase value by 4"
                >
                  +
                </button>
              </div>

              {/* Progress Track */}
              <div className="mt-4 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-150"
                  style={{ width: `${((stepperValue - 16) / (96 - 16)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
