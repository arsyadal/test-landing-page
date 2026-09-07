import React, { useState } from 'react';
import { Play, Copy, Check, Zap, ArrowRightLeft, FileCode2 } from 'lucide-react';

interface InteractiveSandboxProps {
  isDark: boolean;
}

type SandboxPreset = 'minify' | 'headers' | 'redact';

export const InteractiveSandbox: React.FC<InteractiveSandboxProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<SandboxPreset>('minify');
  const [copied, setCopied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const presetsContent: Record<SandboxPreset, { title: string; input: string; transform: (val: string) => string }> = {
    minify: {
      title: 'Payload Minifier & Structural Compactor',
      input: JSON.stringify({
        event: "telemetry.metric",
        timestamp: "2026-09-07T12:00:00Z",
        client: {
          ip: "203.0.113.195",
          user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
          session_id: "sess_982bca8190d",
          metrics: { cpu_usage: 0.28, memory_mb: 482, latency_ms: 3.8 }
        },
        payload_tags: ["production", "tokyo-edge", "v2-runtime"]
      }, null, 2),
      transform: (raw: string) => {
        try {
          const parsed = JSON.parse(raw);
          return JSON.stringify(parsed);
        } catch {
          return raw.replace(/\s+/g, '');
        }
      },
    },
    headers: {
      title: 'Edge Geolocation & Security Header Injector',
      input: JSON.stringify({
        request_headers: {
          "host": "api.auraedge.dev",
          "x-real-ip": "198.51.100.42",
          "accept": "application/json"
        },
        user_id: "usr_4402"
      }, null, 2),
      transform: (raw: string) => {
        try {
          const parsed = JSON.parse(raw);
          parsed.request_headers["x-auraedge-pop"] = "NRT-01 (Tokyo)";
          parsed.request_headers["x-edge-latency"] = "3.2ms";
          parsed.request_headers["x-data-sovereignty"] = "AP-NORTHEAST-1";
          return JSON.stringify(parsed, null, 2);
        } catch {
          return raw;
        }
      },
    },
    redact: {
      title: 'Data Loss Prevention & Token Redactor',
      input: JSON.stringify({
        account_id: "acc_89120",
        auth_token: "aura_live_99f8d7c6b5a4e3d2c1b0",
        contact_email: "lead_architect@corp.internal",
        payment_fingerprint: "tok_visa_4242424242424242"
      }, null, 2),
      transform: (raw: string) => {
        return raw
          .replace(/aura_live_[a-z0-9]+/g, 'aura_live_********************')
          .replace(/tok_visa_[0-9]+/g, 'tok_visa_************4242');
      },
    },
  };

  const [inputJson, setInputJson] = useState<string>(presetsContent.minify.input);
  const [outputResult, setOutputResult] = useState<string>(presetsContent.minify.transform(presetsContent.minify.input));
  const [metrics, setMetrics] = useState<{ originalBytes: number; finalBytes: number; savedPct: number; durationMs: number }>({
    originalBytes: new Blob([presetsContent.minify.input]).size,
    finalBytes: new Blob([presetsContent.minify.transform(presetsContent.minify.input)]).size,
    savedPct: Math.round((1 - new Blob([presetsContent.minify.transform(presetsContent.minify.input)]).size / new Blob([presetsContent.minify.input]).size) * 100),
    durationMs: 1.4,
  });

  const handleSelectPreset = (p: SandboxPreset) => {
    setActivePreset(p);
    const text = presetsContent[p].input;
    setInputJson(text);
    const out = presetsContent[p].transform(text);
    setOutputResult(out);
    const inSize = new Blob([text]).size;
    const outSize = new Blob([out]).size;
    setMetrics({
      originalBytes: inSize,
      finalBytes: outSize,
      savedPct: inSize > 0 ? Math.max(0, Math.round((1 - outSize / inSize) * 100)) : 0,
      durationMs: 1.2,
    });
  };

  const runTransformation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const transformer = presetsContent[activePreset].transform;
      const result = transformer(inputJson);
      setOutputResult(result);
      const inSize = new Blob([inputJson]).size;
      const outSize = new Blob([result]).size;
      setMetrics({
        originalBytes: inSize,
        finalBytes: outSize,
        savedPct: inSize > 0 ? Math.max(0, Math.round((1 - outSize / inSize) * 100)) : 0,
        durationMs: parseFloat((0.8 + Math.random() * 0.9).toFixed(1)),
      });
      setIsProcessing(false);
    }, 180);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sandbox" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/40">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              LIVE EDGE COMPUTE SANDBOX
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              WebAssembly Stream Filter
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Interactive Stream Transformer
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Edit payload text directly or pick a preset. Observe real-time byte compression and edge worker execution metrics.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg border self-start md:self-auto bg-slate-900/60 border-slate-800">
          {(
            [
              { id: 'minify', label: 'Minify' },
              { id: 'headers', label: 'Geo Headers' },
              { id: 'redact', label: 'DLP Redact' },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all cursor-pointer ${
                activePreset === p.id
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Payload Editor */}
        <div className={`lg:col-span-6 rounded-xl border flex flex-col justify-between overflow-hidden ${
          isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300'
        }`}>
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            isDark ? 'bg-[#0B0E17] border-[#1E2438]' : 'bg-slate-100 border-slate-200'
          }`}>
            <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-emerald-500" />
              INBOUND CLIENT PAYLOAD
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {metrics.originalBytes} Bytes
            </span>
          </div>

          <div className="p-4 flex-1">
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              className="w-full h-[320px] bg-transparent font-mono text-xs text-slate-300 focus:outline-none resize-none leading-relaxed select-text"
              aria-label="Editable input JSON payload"
              spellCheck={false}
            />
          </div>

          <div className={`px-4 py-3 border-t flex items-center justify-between ${
            isDark ? 'bg-[#0B0E17] border-[#1E2438]' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[11px] font-mono text-slate-400">
              Direct live string buffer input
            </span>
            <button
              type="button"
              onClick={runTransformation}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'EXECUTING...' : 'TRANSFORM'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Transformed Edge Stream Output */}
        <div className={`lg:col-span-6 rounded-xl border flex flex-col justify-between overflow-hidden ${
          isDark ? 'bg-[#10131E] border-[#1E2438]' : 'bg-white border-slate-300'
        }`}>
          <div className={`px-4 py-3 border-b flex items-center justify-between ${
            isDark ? 'bg-[#0B0E17] border-[#1E2438]' : 'bg-slate-100 border-slate-200'
          }`}>
            <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
              OUTPUT EDGE STREAM
            </span>
            <button
              type="button"
              onClick={handleCopyOutput}
              className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY OUTPUT'}</span>
            </button>
          </div>

          <div className="p-4 flex-1 bg-[#07090F] overflow-auto">
            <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre-wrap select-all">
              <code>{outputResult}</code>
            </pre>
          </div>

          {/* Telemetry Metrics Ribbon */}
          <div className={`px-4 py-3 border-t grid grid-cols-3 gap-2 text-center ${
            isDark ? 'bg-[#0B0E17] border-[#1E2438]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-500">{metrics.finalBytes} B</div>
              <div className="text-[10px] font-mono text-slate-400">Transformed Size</div>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-500">{metrics.savedPct}%</div>
              <div className="text-[10px] font-mono text-slate-400">Byte Reduction</div>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-500">{metrics.durationMs} ms</div>
              <div className="text-[10px] font-mono text-slate-400">Edge Exec Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
