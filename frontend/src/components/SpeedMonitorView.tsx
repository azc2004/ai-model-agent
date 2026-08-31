import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ProviderSpeedData {
  provider: string;
  hardware: string;
  ttft_ms: number; // Time to First Token (ms) - 낮을수록 좋음
  tps: number;     // Tokens Per Second - 높을수록 좋음
  price_per_1m: number; // $/1M Tokens
  uptime_percent: number;
  color: string;
}

const BENCHMARK_PROVIDERS: Record<string, ProviderSpeedData[]> = {
  "llama-3.3-70b": [
    { provider: "Cerebras", hardware: "CS-3 Wafer-Scale Engine", ttft_ms: 120, tps: 2100, price_per_1m: 0.60, uptime_percent: 99.9, color: "#ea580c" },
    { provider: "Groq", hardware: "LPU Inference Engine", ttft_ms: 180, tps: 1250, price_per_1m: 0.59, uptime_percent: 99.8, color: "#d97706" },
    { provider: "SambaNova", hardware: "SN40L Reconfigurable Dataflow", ttft_ms: 210, tps: 980, price_per_1m: 0.60, uptime_percent: 99.7, color: "#059669" },
    { provider: "Together AI", hardware: "NVIDIA H100 80GB Cluster", ttft_ms: 320, tps: 340, price_per_1m: 0.88, uptime_percent: 99.9, color: "#0284c7" },
    { provider: "Fireworks AI", hardware: "NVIDIA H100 SXM5", ttft_ms: 310, tps: 310, price_per_1m: 0.90, uptime_percent: 99.9, color: "#7c3aed" },
    { provider: "DeepInfra", hardware: "NVIDIA A100 80GB", ttft_ms: 450, tps: 180, price_per_1m: 0.70, uptime_percent: 99.5, color: "#db2777" }
  ],
  "deepseek-r1": [
    { provider: "Groq", hardware: "LPU Inference Engine", ttft_ms: 280, tps: 620, price_per_1m: 0.75, uptime_percent: 99.8, color: "#d97706" },
    { provider: "Together AI", hardware: "NVIDIA H100 SXM5", ttft_ms: 450, tps: 240, price_per_1m: 0.90, uptime_percent: 99.9, color: "#0284c7" },
    { provider: "DeepInfra", hardware: "NVIDIA H100 80GB", ttft_ms: 510, tps: 190, price_per_1m: 0.80, uptime_percent: 99.6, color: "#db2777" },
    { provider: "DeepSeek Official", hardware: "H800 Hybrid Cluster", ttft_ms: 850, tps: 110, price_per_1m: 0.55, uptime_percent: 99.1, color: "#2563eb" }
  ],
  "gpt-4o-mini": [
    { provider: "OpenAI Official", hardware: "Custom Azure Accelerator", ttft_ms: 220, tps: 140, price_per_1m: 0.15, uptime_percent: 99.95, color: "#059669" }
  ],
  "claude-3-5-sonnet": [
    { provider: "Anthropic Official", hardware: "AWS Trainium2 / TPU Cluster", ttft_ms: 340, tps: 85, price_per_1m: 3.00, uptime_percent: 99.9, color: "#d97706" }
  ]
};

export const SpeedMonitorView: React.FC = () => {
  const { t } = useLanguage();
  const [selectedModelKey, setSelectedModelKey] = useState<string>("llama-3.3-70b");
  const [metricMode, setMetricMode] = useState<"tps" | "ttft">("tps");

  const currentProviders = BENCHMARK_PROVIDERS[selectedModelKey] || BENCHMARK_PROVIDERS["llama-3.3-70b"];

  const sortedData = [...currentProviders].sort((a, b) => {
    return metricMode === "tps" ? b.tps - a.tps : a.ttft_ms - b.ttft_ms;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-black shadow-sm">
          ⚡ Real-time Latency & Throughput Speed Monitor
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.speed.subtitle}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-semibold max-w-3xl mx-auto leading-relaxed">
          {t.speed.description}
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md backdrop-blur-md">
        {/* Model Selector */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 mr-1">{t.speed.targetModel}</span>
          {[
            { key: "llama-3.3-70b", name: `Llama 3.3 70B (${t.speed.modelLlamaTag})` },
            { key: "deepseek-r1", name: `DeepSeek R1 (${t.speed.modelDeepseekTag})` },
            { key: "gpt-4o-mini", name: "GPT-4o mini" },
            { key: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" }
          ].map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedModelKey(m.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                selectedModelKey === m.key
                  ? 'bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-950 border-indigo-600 dark:border-cyan-500 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setMetricMode("tps")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition ${
              metricMode === "tps"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            {t.speed.tabTps}
          </button>
          <button
            onClick={() => setMetricMode("ttft")}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition ${
              metricMode === "ttft"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            {t.speed.tabTtft}
          </button>
        </div>
      </div>

      {/* Chart & Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recharts Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-md backdrop-blur-md">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center justify-between">
            <span>
              {t.speed.chartByProvider} {metricMode === "tps" ? t.speed.metricTps : t.speed.metricTtft}
            </span>
            <span className="text-xs font-bold text-slate-500">{t.speed.refreshed}</span>
          </h3>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fill: "#475569", fontSize: 11, fontWeight: "bold" }} />
                <YAxis dataKey="provider" type="category" stroke="#64748b" tick={{ fill: "#0f172a", fontSize: 12, fontWeight: "bold" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "12px", color: "#0f172a", fontWeight: "bold" }}
                  formatter={(value: any) => [
                    metricMode === "tps" ? `${value} tokens/sec` : `${value} ms`,
                    metricMode === "tps" ? t.speed.legendTps : t.speed.legendTtft
                  ]}
                />
                <Bar dataKey={metricMode === "tps" ? "tps" : "ttft_ms"} radius={[0, 8, 8, 0]}>
                  {sortedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Detailed Provider Ranking Cards */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-black text-slate-900 dark:text-white px-1">
            {t.speed.rankTitle}
          </h3>
          <div tabIndex={0} className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {sortedData.map((p, idx) => (
              <div
                key={p.provider}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 shadow-sm transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                    style={{ backgroundColor: `${p.color}15`, color: p.color, border: `1px solid ${p.color}40` }}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      {p.provider}
                      {idx === 0 && <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-1.5 py-0.5 rounded font-black border border-amber-300">FASTEST</span>}
                    </div>
                    <div className="text-[11px] text-slate-500 font-bold">{p.hardware}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black text-indigo-600 dark:text-cyan-400 font-mono">
                    {p.tps} <span className="text-[10px] text-slate-500 font-bold">TPS</span>
                  </div>
                  <div className="text-xs text-slate-500 font-bold font-mono">
                    TTFT {p.ttft_ms}ms
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
