import React from 'react';


export const SystemSchematics: React.FC = () => {
  const pipelineStages = [
    {
      step: '01',
      title: 'Zero-Copy Socket Ring',
      throughput: '100 Gbps Interface',
      latency: '0.4µs',
      description: 'Kernel bypass via AF_XDP queues streams directly from the network interface card into user-space memory.',
    },
    {
      step: '02',
      title: 'Lockless Concurrent Buffer',
      throughput: '16.4 GB/s Memory Bus',
      latency: '0.1µs',
      description: 'Multi-producer single-consumer circular arrays using atomic compare-and-swap sequences without OS mutexes.',
    },
    {
      step: '03',
      title: 'SIMD Columnar Compression',
      throughput: '4.8M Events/Sec',
      latency: '0.8µs',
      description: 'AVX-512 bit-packing compresses floating-point vectors by 74% before disk serialization.',
    },
    {
      step: '04',
      title: 'Direct NVMe Persistence',
      throughput: '6,400 MB/s Write',
      latency: '1.2µs',
      description: 'Asynchronous io_uring dispatches blocks straight to PCIe Gen5 solid-state arrays, bypassing Linux page cache.',
    },
  ];

  return (
    <section id="schematic" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#232834]">
      <div className="max-w-3xl mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F4F7]">
          Deterministic hardware pipelines.
        </h2>
        <p className="mt-3 text-sm text-[#8D96A5] leading-relaxed text-balance">
          Chronicle bypasses operating system context switches. Data moves from the network card to non-volatile storage without memory reallocation.
        </p>
      </div>

      {/* Horizontal Data Bus Layout (Zero Card-in-Card Repetition) */}
      <div className="border border-[#232834] bg-[#14171C] rounded-lg divide-y divide-[#232834]">
        {pipelineStages.map((stage) => (
          <div key={stage.step} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#181C23] transition-colors">
            {/* Step and Title */}
            <div className="md:w-1/3 flex items-start gap-4">
              <span className="font-mono text-sm font-bold text-[#E07A5F]">{stage.step}</span>
              <div>
                <h3 className="text-base font-bold text-[#F1F4F7] font-mono">{stage.title}</h3>
                <p className="text-xs text-[#8D96A5] mt-1 leading-relaxed">{stage.description}</p>
              </div>
            </div>

            {/* Performance Readouts */}
            <div className="md:w-1/3 flex items-center gap-6 font-mono text-xs text-[#8D96A5] md:justify-end">
              <div>
                <span className="text-[10px] text-[#555E6D] block">THROUGHPUT</span>
                <span className="text-[#F1F4F7] font-semibold">{stage.throughput}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#555E6D] block">PASS-THROUGH</span>
                <span className="text-[#10B981] font-bold">{stage.latency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
