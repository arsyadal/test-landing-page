import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Cpu, ExternalLink } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'Shader Studio', href: '#playground' },
    { label: 'Tactile Components', href: '#components' },
    { label: 'State Machine', href: '#states' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
      isDark ? 'bg-[#0B0D13]/90 border-[#23293D]' : 'bg-[#F8FAFC]/90 border-slate-200'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <a href="#playground" className="flex items-center gap-2.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 rounded p-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-emerald-950 font-mono font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              KROMA LAB
              <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v2.4
              </span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Neural Shader & UI Playground
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-mono transition-colors duration-150 ${
                isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
              } focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1.5 py-1`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Theme Switcher & GitHub reference */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle (Anti-Slop R-21, R-34) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:text-amber-300'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            } focus-visible:ring-2 focus-visible:ring-emerald-500`}
            aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Inspiration Link to 21st.dev */}
          <a
            href="https://21st.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Inspect 21st.dev Component Catalog"
          >
            <span>21st.dev</span>
            <ExternalLink className="w-3 h-3 text-emerald-400" />
          </a>

          {/* Mobile Menu Hamburger (min 44x44 tap target via p-2.5) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-4 space-y-3 ${
          isDark ? 'bg-[#0E121B] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-mono text-slate-300 hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://21st.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-2 text-sm font-mono text-emerald-400"
          >
            <span>21st.dev Catalog</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
