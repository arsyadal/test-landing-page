import { EditorialMasthead } from './components/EditorialMasthead';
import { HeroInstrument } from './components/HeroInstrument';
import { TelemetryScrubber } from './components/TelemetryScrubber';
import { SystemSchematics } from './components/SystemSchematics';
import { PricingLedger } from './components/PricingLedger';
import { RegistrationTerminal } from './components/RegistrationTerminal';
import { ColophonFooter } from './components/ColophonFooter';

export function App() {
  return (
    <div className="min-h-screen bg-[#0C0D10] text-[#F1F4F7] flex flex-col font-sans selection:bg-[#E07A5F]/25 selection:text-[#F1F4F7]">
      {/* Editorial Masthead */}
      <EditorialMasthead />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Interactive Oscilloscope Instrument */}
        <HeroInstrument />

        {/* 2. Interactive Time-Series Anomaly Scrubber */}
        <TelemetryScrubber />

        {/* 3. Horizontal Hardware Bus Schematics */}
        <SystemSchematics />

        {/* 4. Engineering Ledger & Cluster Calculator */}
        <PricingLedger />

        {/* 5. Production Node Access Terminal */}
        <RegistrationTerminal />
      </main>

      {/* Architectural Colophon Footer */}
      <ColophonFooter />
    </div>
  );
}

export default App;
