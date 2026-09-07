import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const PricingLedger: React.FC = () => {
  const [nodes, setNodes] = useState<number>(4);

  const calculateCost = (nodeCount: number) => {
    return nodeCount * 120; // $120/mo per dedicated node
  };

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#232834]">
      <div className="max-w-3xl mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F4F7]">
          Predictable infrastructure ledger.
        </h2>
        <p className="mt-3 text-sm text-[#8D96A5] leading-relaxed text-balance">
          Single-node binaries are Apache 2.0 open-source. Managed clustered deployments scale strictly by dedicated hardware core instances.
        </p>
      </div>

      {/* Engineering Ledger Table */}
      <div className="border border-[#232834] bg-[#14171C] rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#232834]">
          {/* Column A: Open Source Bare Metal */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-mono text-sm font-bold text-[#F1F4F7]">COMMUNITY BARE-METAL</span>
                <span className="font-mono text-xl font-bold text-[#10B981]">$0</span>
              </div>
              <p className="text-xs text-[#8D96A5] leading-relaxed">
                Self-hosted single node executable for air-gapped test rigs, laboratory benches, and local development.
              </p>

              <div className="mt-6 space-y-2.5 text-xs font-mono text-[#8D96A5]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Apache 2.0 License / Full Source Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Up to 4M continuous events/sec per node</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Direct io_uring NVMe disk logging</span>
                </div>
              </div>
            </div>

            <a
              href="#access"
              className="w-full py-3 rounded text-center text-xs font-mono font-semibold border border-[#2B3242] bg-[#181B22] hover:bg-[#20252F] text-[#F1F4F7] transition-colors cursor-pointer"
            >
              DOWNLOAD LINUX/MACOS BINARY
            </a>
          </div>

          {/* Column B: Dedicated Managed Cluster */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#111318]">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-mono text-sm font-bold text-[#F1F4F7]">MANAGED CLUSTERED FLEET</span>
                <span className="font-mono text-xl font-bold text-[#E07A5F] tabular-nums">
                  ${calculateCost(nodes)}<span className="text-xs text-[#8D96A5] font-normal"> / mo</span>
                </span>
              </div>
              <p className="text-xs text-[#8D96A5] leading-relaxed">
                Automated Raft quorum replication, redundant multi-AZ failover, and hardware-managed NVMe tiering.
              </p>

              {/* Node Slider */}
              <div className="mt-6 pt-4 border-t border-[#232834]">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8D96A5]">CLUSTER SIZE</span>
                  <span className="text-[#E07A5F] font-bold">{nodes} Dedicated Nodes</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="16"
                  step="1"
                  value={nodes}
                  onChange={(e) => setNodes(parseInt(e.target.value))}
                  className="w-full accent-[#E07A5F] cursor-pointer h-1.5 bg-[#0C0D10] border border-[#2B3242] rounded-none appearance-none"
                  aria-label="Adjust cluster size node count"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#555E6D] mt-1">
                  <span>3 Nodes (Min Quorum)</span>
                  <span>16 Nodes (Enterprise Fleet)</span>
                </div>
              </div>
            </div>

            <a
              href="#access"
              className="w-full py-3 rounded text-center text-xs font-mono font-semibold bg-[#E07A5F] hover:bg-[#d56b4f] text-[#0C0D10] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>PROVISION FLEET QUORUM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
