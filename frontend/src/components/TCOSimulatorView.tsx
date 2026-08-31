import React, { useState, useEffect } from 'react';
import type { ModelSpec, TCOComparisonResult } from '../types';
import { simulateTCO } from '../api';
import { Calculator, TrendingUp, CheckCircle, Server, Cloud, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

interface TCOSimulatorViewProps {
  models: ModelSpec[];
}

export const TCOSimulatorView: React.FC<TCOSimulatorViewProps> = ({ models }) => {
  const { t } = useLanguage();
  const [selectedProvider, setSelectedProvider] = useState<string>('ALL');
  const [selectedModelId, setSelectedModelId] = useState<string>('deepseek-chat');
  const [inputTokensMillions, setInputTokensMillions] = useState<number>(100);
  const [outputTokensMillions, setOutputTokensMillions] = useState<number>(20);
  const [quantization, setQuantization] = useState<string>('Q4_K_M');
  const [result, setResult] = useState<TCOComparisonResult | null>(null);

  // 프로바이더 목록 (중복 제거 및 정렬)
  const providersList = Array.from(new Set(models.map((m) => m.provider_name))).sort();

  // 선택된 프로바이더에 속한 모델만 필터링
  const filteredModels = selectedProvider === 'ALL'
    ? models
    : models.filter((m) => m.provider_name === selectedProvider);

  const handleProviderChange = (prov: string) => {
    setSelectedProvider(prov);
    const matched = prov === 'ALL' ? models : models.filter((m) => m.provider_name === prov);
    if (matched.length > 0) {
      setSelectedModelId(matched[0].id);
    }
  };

  useEffect(() => {
    const runSimulation = async () => {
      if (!selectedModelId) return;
      try {
        const data = await simulateTCO({
          target_model_id: selectedModelId,
          monthly_input_tokens_m: inputTokensMillions,
          monthly_output_tokens_m: outputTokensMillions,
          target_quantization: quantization,
        });
        setResult(data);
      } catch (err) {
        console.error('TCO calculation error:', err);
      }
    };
    runSimulation();
  }, [selectedModelId, inputTokensMillions, outputTokensMillions, quantization]);

  const apiCost = result?.api_cost.total_monthly_cost ?? 0;
  const cloudGpuCost = result?.self_hosted.cloud_on_demand_monthly ?? 0;
  const onPremCost = result?.self_hosted.on_prem_total_monthly ?? 0;

  const chartData = result
    ? [
        {
          name: t.tco.apiCostMonthly,
          Cost: apiCost,
          fill: '#38bdf8',
        },
        {
          name: t.tco.cloudGpuCostMonthly,
          Cost: cloudGpuCost,
          fill: '#a855f7',
        },
        {
          name: t.tco.onPremCostMonthly,
          Cost: onPremCost,
          fill: '#10b981',
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3 tracking-tight">
          <Calculator className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
          {t.tco.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-3xl font-semibold">
          {t.tco.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-md">

          {/* 1단계: 프로바이더 (공급자) 선택 */}
          <div>
            <label htmlFor="tco-provider" className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1.5">
              {t.tco.step1Provider}
            </label>
            <select
              id="tco-provider"
              value={selectedProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white font-extrabold focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
            >
              <option value="ALL">🌐 전체 프로바이더 ({providersList.length}개)</option>
              {providersList.map((p) => (
                <option key={p} value={p}>
                  {p} ({models.filter((m) => m.provider_name === p).length}개 모델)
                </option>
              ))}
            </select>
          </div>

          {/* 2단계: AI 모델 선택 */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="tco-model" className="block text-xs font-black text-slate-700 dark:text-slate-300">
                {t.tco.step2Model}
              </label>
              <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-extrabold">
                {filteredModels.length} {t.tco.modelsFound}
              </span>
            </div>
            <select
              id="tco-model"
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-cyan-700 dark:text-cyan-300 font-black focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
            >
              {filteredModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.tier})
                </option>
              ))}
            </select>
          </div>

          {/* Input Tokens Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-bold">{t.tco.inputTokens}</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black text-sm">{inputTokensMillions}M</span>
            </div>
            <input
              aria-label={t.tco.inputTokens}
              type="range"
              min="5"
              max="2000"
              step="5"
              value={inputTokensMillions}
              onChange={(e) => setInputTokensMillions(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Output Tokens Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-700 dark:text-slate-300 font-bold">{t.tco.outputTokens}</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black text-sm">{outputTokensMillions}M</span>
            </div>
            <input
              aria-label={t.tco.outputTokens}
              type="range"
              min="1"
              max="500"
              step="1"
              value={outputTokensMillions}
              onChange={(e) => setOutputTokensMillions(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-200 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Quantization Level Selector */}
          <div>
            <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2">
              {t.tco.quantization}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Q4_K_M', 'FP8', 'FP16'].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantization(q)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-black border transition-all ${
                    quantization === q
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-400'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* VRAM Footprint & Hardware Calculator Card */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 flex items-center justify-between">
              <span>💾 VRAM Footprint & Hardware Estimator</span>
              <span className="text-[10px] text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800">vLLM / Ollama</span>
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>{t.tco.vramNeeded}</span>
                <span className="font-bold text-cyan-400">
                  {((result?.self_hosted.total_vram_gb ?? 32)).toFixed(1)} GB
                </span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>{t.tco.modelWeights}</span>
                <span>{(((result?.self_hosted.total_vram_gb ?? 32) * 0.75)).toFixed(1)} GB</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>- KV Cache & Context:</span>
                <span>{(((result?.self_hosted.total_vram_gb ?? 32) * 0.25)).toFixed(1)} GB</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400">
                <span>{t.tco.recommendedGpu}</span>
                <span>{result?.self_hosted.recommended_gpu ?? 'NVIDIA H100 80GB'} x {result?.self_hosted.gpu_count ?? 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Analytics & Bar Chart */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-20 self-start">
          {result && (
            <>
              {/* Cost Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* API Cost Card */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-bold mb-2">
                    <Cloud className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>{t.tco.apiCostMonthly}</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                    ${apiCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-1">
                    SaaS API Pay-as-you-go
                  </div>
                </div>

                {/* Cloud GPU Cost Card */}
                <div className="bg-purple-50 dark:bg-purple-950/40 p-5 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-md">
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
                    <Server className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>{t.tco.cloudGpuCostMonthly}</span>
                  </div>
                  <div className="text-2xl font-black text-purple-900 dark:text-purple-200 font-mono">
                    ${cloudGpuCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-1">
                    {result.self_hosted.recommended_gpu} x {result.self_hosted.gpu_count}
                  </div>
                </div>

                {/* On-Prem Cost Card */}
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-md">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
                    <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.tco.onPremCostMonthly}</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-900 dark:text-emerald-200 font-mono">
                    ${onPremCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    {t.tco.powerCostEst}: ${result.self_hosted.on_prem_monthly_power.toFixed(0)}
                  </div>
                </div>
              </div>

              {/* Recommendation Banner */}
              <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-extrabold">{t.tco.recommendedOption}</div>
                    <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-relaxed">
                      {result.recommendation}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  <span className="px-4 py-1.5 rounded-full text-xs font-black bg-cyan-500 text-slate-950 shadow-sm whitespace-nowrap inline-block">
                    {t.tco.cheapest}
                  </span>
                </div>
              </div>

              {/* Recharts Bar Chart */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
                <h4 className="text-sm font-black text-slate-900 dark:text-white mb-4">
                  {t.tco.chartTitle}
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} unit="$" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '0.75rem',
                          color: '#f8fafc',
                        }}
                        formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Cost']}
                      />
                      <Bar dataKey="Cost" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Break-even Insight */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 shadow-sm">
                <div className="font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-sm">
                  <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  {t.tco.breakEvenPoint}: ~{result.self_hosted.breakeven_months_vs_api ?? 12} Months Amortization Break-Even
                </div>
                <p className="font-semibold">{t.tco.breakEvenDesc}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
