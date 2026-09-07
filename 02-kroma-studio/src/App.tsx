import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ShaderPlayground } from './components/ShaderPlayground';
import { ComponentDeck } from './components/ComponentDeck';
import { StateSimulator } from './components/StateSimulator';
import { CodeExportModal } from './components/CodeExportModal';
import { Footer } from './components/Footer';
import type { ShaderParams, UIStateType } from './types';
import { Cpu, Zap } from 'lucide-react';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('kroma_theme');
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  const [modalParams, setModalParams] = useState<ShaderParams | null>(null);
  const [currentState, setCurrentState] = useState<UIStateType>('active');

  // Synchronize document classes and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('kroma_theme', 'dark');
      document.body.style.backgroundColor = '#0B0D13';
      document.body.style.color = '#F8FAFC';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('kroma_theme', 'light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleExportCode = (params: ShaderParams) => {
    setModalParams(params);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-[#0B0D13] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      {/* Top Navbar */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Hero Intro Ribbon */}
      <div className="w-full border-b border-slate-800/40 bg-slate-900/20 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">STABLE</span>
            <span className="text-slate-500">|</span>
            <span>GPU Frame Pipeline: Ready</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              0ms Bundle Overhead
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Canvas 2D Math Engine
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 1. Procedural Shader Playground */}
        <ShaderPlayground onExportCode={handleExportCode} isDark={isDark} />

        {/* 2. Tactile 21st.dev Component Deck */}
        <ComponentDeck isDark={isDark} />

        {/* 3. Tri-State UI Simulator (Anti-Slop R-27) */}
        <StateSimulator
          currentState={currentState}
          onChangeState={setCurrentState}
          isDark={isDark}
        />
      </main>

      {/* Export Code Modal Dialog */}
      {modalParams && (
        <CodeExportModal
          isOpen={!!modalParams}
          onClose={() => setModalParams(null)}
          params={modalParams}
        />
      )}

      {/* Site Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
