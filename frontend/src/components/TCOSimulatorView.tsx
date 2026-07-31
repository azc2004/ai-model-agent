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
  const [selectedModelId, setSelectedModelId] = useState<string>('deepseek-v4-pro');
  const [inputTokensMillions, setInputTokensMillions] = useState<number>(100);
  const [outputTokensMillions, setOutputTokensMillions] = useState<number>(20);
  const [quantization, setQuantization] = useState<string>('Q4_K_M');
  const [result, setResult] = useState<TCOComparisonResult | null>(null);

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
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
          <Calculator className="w-7 h-7 text-cyan-400" />
          {t.tco.title}
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl">
          {t.tco.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5 bg-slate-900/60">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            {t.tco.title}
          </h3>

          {/* Model Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {t.tco.selectModel}
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider_name})
                </option>
              ))}
            </select>
          </div>

          {/* Input Tokens Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">{t.tco.inputTokens}</span>
              <span className="font-mono text-cyan-400 font-bold">{inputTokensMillions}M</span>
            </div>
            <input
              type="range"
              min="5"
              max="2000"
              step="5"
              value={inputTokensMillions}
              onChange={(e) => setInputTokensMillions(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Output Tokens Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-medium">{t.tco.outputTokens}</span>
              <span className="font-mono text-cyan-400 font-bold">{outputTokensMillions}M</span>
            </div>
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              value={outputTokensMillions}
              onChange={(e) => setOutputTokensMillions(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Quantization Level Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {t.tco.quantization}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Q4_K_M', 'FP8', 'FP16'].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantization(q)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    quantization === q
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Analytics & Bar Chart */}
        <div className="lg:col-span-2 space-y-6">
          {result && (
            <>
              {/* Cost Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* API Cost Card */}
                <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                    <Cloud className="w-4 h-4 text-cyan-400" />
                    <span>{t.tco.apiCostMonthly}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    ${apiCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    SaaS API Pay-as-you-go
                  </div>
                </div>

                {/* Cloud GPU Cost Card */}
                <div className="glass-card p-5 rounded-2xl border border-purple-900/40 bg-purple-950/10">
                  <div className="flex items-center gap-2 text-purple-300 text-xs mb-2">
                    <Server className="w-4 h-4 text-purple-400" />
                    <span>{t.tco.cloudGpuCostMonthly}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-purple-300 font-mono">
                    ${cloudGpuCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[11px] text-purple-400/70 mt-1">
                    {result.self_hosted.recommended_gpu} x {result.self_hosted.gpu_count}
                  </div>
                </div>

                {/* On-Prem Cost Card */}
                <div className="glass-card p-5 rounded-2xl border border-emerald-900/40 bg-emerald-950/10">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs mb-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>{t.tco.onPremCostMonthly}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-300 font-mono">
                    ${onPremCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-[11px] text-emerald-400/70 mt-1">
                    {t.tco.powerCostEst}: ${result.self_hosted.on_prem_monthly_power.toFixed(0)}
                  </div>
                </div>
              </div>

              {/* Recommendation Banner */}
              <div className="p-4 rounded-xl glass-card border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">{t.tco.recommendedOption}</div>
                    <div className="text-base font-bold text-white">
                      {result.recommendation}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {t.tco.cheapest}
                  </span>
                </div>
              </div>

              {/* Recharts Bar Chart */}
              <div className="glass-card p-6 rounded-2xl border border-slate-800 bg-slate-900/60">
                <h4 className="text-sm font-bold text-white mb-4">
                  {t.tco.chartTitle}
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} unit="$" />
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
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  {t.tco.breakEvenPoint}: ~{result.self_hosted.breakeven_months_vs_api ?? 12} Months Amortization Break-Even
                </div>
                <p>{t.tco.breakEvenDesc}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
