import React, { useState } from 'react';
import { Terminal, Check, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegistrationTerminal: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'error' | 'success'>('idle');
  const [errorText, setErrorText] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const generatedToken = 'chr_live_99a8b7c6d5e4f3a2b109';

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      setStatus('error');
      setErrorText('Identifier empty: Enter a valid developer or infrastructure email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorText('Format error: Expected user@domain.tld syntax.');
      return;
    }

    setStatus('processing');
    setErrorText('');

    setTimeout(() => {
      setStatus('success');
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#E07A5F', '#F4A261', '#10B981'],
        });
      } catch {
        // Safe fallback
      }
    }, 500);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(`chronicle auth login --key ${generatedToken}`);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section id="access" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-[#232834]">
      <div className="max-w-3xl mx-auto border border-[#232834] bg-[#14171C] rounded-lg overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 border-b border-[#232834] bg-[#0E1015] flex items-center justify-between text-xs font-mono text-[#8D96A5]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>SESSION_INIT // REGISTRATION_GATE</span>
          </div>
          <span className="text-[10px] text-[#10B981]">TLS_ESTABLISHED</span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#F1F4F7]">
            Provision Node Access Token
          </h2>
          <p className="mt-2 text-xs font-mono text-[#8D96A5] leading-relaxed">
            Enter your root identity to generate an initialization token for Chronicle telemetry clusters.
          </p>

          {status === 'success' ? (
            <div className="mt-6 p-5 rounded border border-[#10B981]/30 bg-[#10B981]/10 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-[#10B981] font-bold">
                <Check className="w-4 h-4" />
                <span>AUTHENTICATION TOKEN GENERATED</span>
              </div>
              <p className="text-[#8D96A5]">
                Account established for <strong className="text-[#F1F4F7]">{email}</strong>. Copy CLI authentication string:
              </p>
              <div className="p-3 bg-[#0C0D10] border border-[#232834] flex items-center justify-between gap-3 text-[#E07A5F] overflow-x-auto">
                <code>chronicle auth login --key {generatedToken}</code>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="px-2 py-1 rounded bg-[#181B22] border border-[#2B3242] text-xs text-[#F1F4F7] hover:border-[#E07A5F] transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="mt-6 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 font-mono text-xs">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="engineer@infrastructure.org"
                  disabled={status === 'processing'}
                  className="flex-1 px-4 py-3 bg-[#0C0D10] border border-[#232834] rounded text-[#F1F4F7] placeholder-[#555E6D] focus:outline-none focus:border-[#E07A5F] transition-colors"
                  aria-label="Email address for Chronicle token generation"
                />

                <button
                  type="submit"
                  disabled={status === 'processing'}
                  className="px-6 py-3 rounded font-bold bg-[#E07A5F] hover:bg-[#d56b4f] text-[#0C0D10] transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <span>{status === 'processing' ? 'ALLOCATING...' : 'GENERATE KEY'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
