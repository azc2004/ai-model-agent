import React, { useState, useEffect } from 'react';
import type { GPUSpec } from '../types';
import { fetchGPUSpecs } from '../api';
import { Cpu, Zap, HardDrive } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GPUListView: React.FC = () => {
  const { t } = useLanguage();
  const [gpus, setGpus] = useState<GPUSpec[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGPUs = async () => {
      try {
        const data = await fetchGPUSpecs();
        setGpus(data);
      } catch (err) {
        console.error('Failed to load GPUs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadGPUs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3 tracking-tight">
          <Cpu className="w-7 h-7 text-purple-600 dark:text-purple-400" />
          {t.gpu.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-3xl font-semibold">
          {t.gpu.subtitle}
        </p>
      </div>

      {/* GPU Specs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gpus.map((gpu) => (
          <div
            key={gpu.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-purple-500 transition-all shadow-md hover:shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                  NVIDIA AI Accelerator
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-mono font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  {gpu.power_watts}W
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">{gpu.name}</h3>

              {/* Memory Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-600 dark:text-slate-400 text-[10px] font-extrabold flex items-center gap-1 mb-1">
                    <HardDrive className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    {t.gpu.vram}
                  </div>
                  <div className="text-base font-black text-slate-900 dark:text-slate-100 font-mono">
                    {gpu.vram_gb} GB
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-600 dark:text-slate-400 text-[10px] font-extrabold flex items-center gap-1 mb-1">
                    <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    {t.gpu.bandwidth}
                  </div>
                  <div className="text-base font-black text-slate-900 dark:text-slate-100 font-mono">
                    {gpu.memory_bandwidth_gbps} GB/s
                  </div>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-bold">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>{t.gpu.purchasePrice}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">
                    ${gpu.purchase_price_usd.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>{t.gpu.cloudOnDemand}</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-black">
                    ${gpu.cloud_hourly_on_demand.toFixed(2)}/hr
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>{t.gpu.cloudSpot}</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black">
                    ${gpu.cloud_hourly_spot.toFixed(2)}/hr
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 font-bold text-center">
              Self-Hosting Hardware Reference Index
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
