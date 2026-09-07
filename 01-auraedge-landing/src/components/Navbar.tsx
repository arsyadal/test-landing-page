import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Cpu, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const navItems = [
    { label: 'Simulator', href: '#simulator' },
    { label: 'Sandbox', href: '#sandbox' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Pricing Calculator', href: '#pricing' },
    { label: 'Technical FAQ', href: '#faq' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors ${
      isDark ? 'bg-[#090A0F]/90 border-[#1E2438]' : 'bg-[#F8FAFC]/90 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 rounded focus-visible:ring-2 focus-visible:ring-emerald-500">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-emerald-950 shadow-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              AURAEDGE
              <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                EDGE RUNTIME
              </span>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-mono transition-colors ${
                isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
              } rounded px-1.5 py-1 focus-visible:ring-2 focus-visible:ring-emerald-500`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-900/80 text-amber-400 hover:bg-slate-800'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            } focus-visible:ring-2 focus-visible:ring-emerald-500`}
            aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>DEPLOY FREE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden border-b px-4 py-4 space-y-3 ${
          isDark ? 'bg-[#0E121B] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-mono text-slate-300 hover:text-emerald-400"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMobileOpen(false)}
            className="inline-block w-full text-center py-2.5 rounded-lg text-xs font-mono font-medium bg-emerald-600 text-white"
          >
            DEPLOY FREE
          </a>
        </div>
      )}
    </header>
  );
};
