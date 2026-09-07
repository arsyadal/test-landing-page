import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { ArchitectureShowcase } from './components/ArchitectureShowcase';
import { DynamicPricingCalculator } from './components/DynamicPricingCalculator';
import { TechnicalFAQ } from './components/TechnicalFAQ';
import { WaitlistOnboarding } from './components/WaitlistOnboarding';
import { Footer } from './components/Footer';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auraedge_theme');
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('auraedge_theme', 'dark');
      document.body.style.backgroundColor = '#090A0F';
      document.body.style.color = '#F8FAFC';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('auraedge_theme', 'light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-[#090A0F] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      {/* Navigation */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero with Edge Simulator */}
        <HeroSection isDark={isDark} />

        {/* 2. Interactive Stream Sandbox */}
        <InteractiveSandbox isDark={isDark} />

        {/* 3. Architecture & 21st.dev Spotlight Cards */}
        <ArchitectureShowcase isDark={isDark} />

        {/* 4. Dynamic Pricing Calculator */}
        <DynamicPricingCalculator isDark={isDark} />

        {/* 5. Technical FAQ Accordion */}
        <TechnicalFAQ isDark={isDark} />

        {/* 6. Waitlist Onboarding Form */}
        <WaitlistOnboarding isDark={isDark} />
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
