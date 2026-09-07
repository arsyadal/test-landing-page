import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface TechnicalFAQProps {
  isDark: boolean;
}

export const TechnicalFAQ: React.FC<TechnicalFAQProps> = ({ isDark }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqItems = [
    {
      q: 'How does AuraEdge achieve sub-5ms cold starts without pre-warming instances?',
      a: 'Unlike traditional containers that load an entire Linux kernel and Node.js environment on cold invocations, AuraEdge executes tasks within pre-initialized V8 isolates. Creating a new isolate context takes less than 3 milliseconds of memory allocation, completely avoiding container boot delays.'
    },
    {
      q: 'Which programming languages compile directly into AuraEdge isolates?',
      a: 'AuraEdge natively supports TypeScript, JavaScript, Rust (compiled to WebAssembly), and Go (via TinyGo). Any language capable of compiling to a standard WASI / WebAssembly binary module can run on our distributed runtime.'
    },
    {
      q: 'How is data sovereignty and GDPR geofencing handled across edge PoPs?',
      a: 'You can define execution boundaries in your routing configuration (for example, geofence: "EU-ONLY"). Requests originated by or destined for European users are processed exclusively within our Frankfurt, London, Amsterdam, and Paris points of presence.'
    },
    {
      q: 'What happens if traffic spikes exceed typical monthly invocation volume?',
      a: 'AuraEdge distributes traffic across 310 Anycast locations automatically. Our architecture dynamically scales without rate limiting or artificial throttling up to 100,000 requests per second by default.'
    },
    {
      q: 'Can we run private npm dependencies and external database connections?',
      a: 'Yes. AuraEdge supports standard Web standard fetch API, TCP sockets, and secure TLS connections to serverless Postgres, Redis, and PlanetScale endpoints with sub-millisecond connection pooling.'
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/40">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/30 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>TECHNICAL CLARIFICATIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Frequently Answered Inquiries
        </h2>
        <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Concrete answers regarding isolation architecture, runtime compatibility, and data governance.
        </p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.q}
              className={`rounded-xl border transition-colors ${
                isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
              >
                <span className={`text-xs sm:text-sm font-medium ${
                  isOpen
                    ? 'text-emerald-500 font-semibold'
                    : isDark
                    ? 'text-slate-200 hover:text-white'
                    : 'text-slate-800 hover:text-slate-950'
                }`}>
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-500' : 'text-slate-400'
                  }`}
                />
              </button>

              {isOpen && (
                <div className={`px-4 sm:px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                  isDark ? 'border-slate-800/60 text-slate-400' : 'border-slate-100 text-slate-600'
                }`}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
