import React, { useState } from 'react';
import { Mail, Check, AlertCircle, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WaitlistOnboardingProps {
  isDark: boolean;
}

export const WaitlistOnboarding: React.FC<WaitlistOnboardingProps> = ({ isDark }) => {
  const [email, setEmail] = useState<string>('');
  const [region, setRegion] = useState<string>('ap-northeast');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client Validation
    if (!email || !email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your professional or developer email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid format email address (example: dev@company.com).');
      return;
    }

    // Processing state
    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#10B981', '#34D399', '#6EE7B7'],
        });
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setErrorMessage('');
  };

  return (
    <section id="waitlist" className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/40">
      <div className={`rounded-2xl border p-8 sm:p-12 text-center transition-colors relative overflow-hidden ${
        isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300 shadow-xl'
      }`}>
        <div className="max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DEVELOPER BETA ONBOARDING</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Deploy on AuraEdge Distributed Mesh
          </h2>

          <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Gain instant access to our global Anycast routing mesh and 1,000,000 free monthly isolate invocations.
          </p>

          {status === 'success' ? (
            <div className="mt-8 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-3 font-bold">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-emerald-400 font-mono">
                Early Access Slot Confirmed
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                We dispatched an authentication token and CLI quickstart guide to <span className="text-white font-semibold">{email}</span>.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-4 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                Register Another Email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="developer@company.com"
                    disabled={status === 'loading'}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      status === 'error'
                        ? 'border-rose-500 bg-rose-500/10 text-rose-200'
                        : isDark
                        ? 'border-slate-700 bg-slate-900/80 text-slate-200 placeholder-slate-500'
                        : 'border-slate-300 bg-slate-50 text-slate-800 placeholder-slate-400'
                    }`}
                    aria-label="Email address for AuraEdge beta invitation"
                  />
                </div>

                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className={`py-3 px-3 rounded-lg border text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer ${
                    isDark ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-300 bg-slate-50 text-slate-800'
                  }`}
                  aria-label="Select default deployment region"
                >
                  <option value="ap-northeast">Tokyo (AP-NE-1)</option>
                  <option value="eu-central">Frankfurt (EU-CENTRAL)</option>
                  <option value="us-west">Silicon Valley (US-WEST)</option>
                  <option value="ap-southeast">Singapore (AP-SE-1)</option>
                </select>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-xs"
                >
                  {status === 'loading' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>ALLOCATING...</span>
                    </>
                  ) : (
                    <>
                      <span>REQUEST ACCESS</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono justify-center animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="text-[11px] font-mono text-slate-400 pt-1">
                No credit card required. Production SLA available upon request.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
