import React from 'react';
import type { ModelSpec } from '../types';
import { ArrowLeftRight, X, Gauge } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CompareViewProps {
  models: ModelSpec[];
  selectedModelIds: string[];
  onToggleCompare: (id: string) => void;
  onGoToDashboard?: () => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  models,
  selectedModelIds,
  onToggleCompare,
}) => {
  const { t } = useLanguage();

  const comparedModels = models.filter((m) => selectedModelIds.includes(m.id));

  if (comparedModels.length === 0) {
    return (
      <div className="glass-card p-12 rounded-2xl border border-slate-800 text-center space-y-4">
        <ArrowLeftRight className="w-12 h-12 text-slate-500 mx-auto" />
        <h3 className="text-xl font-bold text-white">비교할 모델이 선택되지 않았습니다.</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          모델 카탈로그 대시보드에서 비교하고 싶은 LLM 모델 카드의 '+ 비교하기' 버튼을 눌러 추가해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
            <ArrowLeftRight className="w-7 h-7 text-cyan-400" />
            {t.nav.compare} ({comparedModels.length})
          </h2>
          <p className="text-slate-400 text-sm">
            선택한 {comparedModels.length}개 모델의 상세 스펙, API 비용, Quota 및 벤치마크 나란히 대조
          </p>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80">
              <th className="p-4 w-48 text-xs font-bold text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-950 z-10">
                Spec Property
              </th>
              {comparedModels.map((model) => (
                <th key={model.id} className="p-4 min-w-[240px] text-center border-l border-slate-800/60 relative">
                  <button
                    onClick={() => onToggleCompare(model.id)}
                    className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-xs text-slate-400 font-semibold mb-1">{model.provider_name}</div>
                  <div className="text-lg font-bold text-white mb-2">{model.name}</div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-300">
                    {model.tier}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {/* Input Pricing */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-900/90 z-10">
                {t.dashboard.inputPrice}
              </td>
              {comparedModels.map((m) => (
                <td key={m.id} className="p-4 text-center font-mono font-bold text-emerald-400 border-l border-slate-800/60">
                  {m.api_pricing ? `$${m.api_pricing.input_price_per_1m.toFixed(2)}` : '-'}
                </td>
              ))}
            </tr>

            {/* Output Pricing */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-900/90 z-10">
                {t.dashboard.outputPrice}
              </td>
              {comparedModels.map((m) => (
                <td key={m.id} className="p-4 text-center font-mono font-bold text-cyan-400 border-l border-slate-800/60">
                  {m.api_pricing ? `$${m.api_pricing.output_price_per_1m.toFixed(2)}` : '-'}
                </td>
              ))}
            </tr>

            {/* API Quota Rate Limits */}
            <tr className="bg-cyan-950/10">
              <td className="p-4 font-semibold text-cyan-400 sticky left-0 bg-slate-900/90 z-10 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-cyan-400" />
                {t.quota.title}
              </td>
              {comparedModels.map((m) => (
                <td key={m.id} className="p-4 text-center font-mono text-xs border-l border-slate-800/60">
                  {m.quota ? (
                    <div className="space-y-1">
                      <div className="text-cyan-300 font-bold">{m.quota.rpm.toLocaleString()} RPM</div>
                      <div className="text-slate-400">{(m.quota.tpm / 1000).toFixed(0)}k TPM</div>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              ))}
            </tr>

            {/* Context Window */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-900/90 z-10">
                {t.dashboard.contextWindow}
              </td>
              {comparedModels.map((m) => (
                <td key={m.id} className="p-4 text-center font-mono text-slate-200 border-l border-slate-800/60">
                  {(m.context_window / 1000).toLocaleString()}k
                </td>
              ))}
            </tr>

            {/* License & Open-weight */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-900/90 z-10">
                License / Weight
              </td>
              {comparedModels.map((m) => (
                <td key={m.id} className="p-4 text-center border-l border-slate-800/60">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      m.is_open_weight
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {m.is_open_weight ? t.dashboard.openWeight : t.dashboard.proprietary}
                  </span>
                </td>
              ))}
            </tr>

            {/* Benchmarks Arena Elo */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-900/90 z-10">
                LMSYS Arena Elo
              </td>
              {comparedModels.map((m) => (
                <td key={m.id} className="p-4 text-center font-mono font-bold text-amber-400 text-base border-l border-slate-800/60">
                  {m.benchmarks.arena_elo || '-'}
                </td>
              ))}
            </tr>

            {/* SWE-bench */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-900/90 z-10">
                SWE-bench (Coding)
              </td>
              {comparedModels.map((m) => (
                <td key={m.id} className="p-4 text-center font-mono text-cyan-400 font-bold border-l border-slate-800/60">
                  {m.benchmarks.swe_bench ? `${m.benchmarks.swe_bench}%` : '-'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
