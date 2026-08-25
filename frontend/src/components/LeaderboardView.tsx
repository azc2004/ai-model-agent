import React, { useState, useMemo } from 'react';
import type { ModelSpec } from '../types';
import { Trophy, Award, Code, BookOpen, BrainCircuit } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ResponsiveDataTable, type ResponsiveColumn } from './ResponsiveDataTable';

type RankedRow = { model: ModelSpec; rank: number; score: string };

interface LeaderboardViewProps {
  models: ModelSpec[];
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ models }) => {
  const { t } = useLanguage();
  const [activeBenchmark, setActiveBenchmark] = useState<'arena' | 'swe' | 'mmlu' | 'gpqa'>('arena');

  const rankedModels = useMemo(() => {
    return [...models]
      .filter((m) => {
        if (activeBenchmark === 'arena') return m.benchmarks.arena_elo !== null;
        if (activeBenchmark === 'swe') return m.benchmarks.swe_bench !== null;
        if (activeBenchmark === 'mmlu') return m.benchmarks.mmlu_pro !== null;
        if (activeBenchmark === 'gpqa') return m.benchmarks.gpqa !== null;
        return true;
      })
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        if (activeBenchmark === 'arena') {
          scoreA = a.benchmarks.arena_elo || 0;
          scoreB = b.benchmarks.arena_elo || 0;
        } else if (activeBenchmark === 'swe') {
          scoreA = a.benchmarks.swe_bench || 0;
          scoreB = b.benchmarks.swe_bench || 0;
        } else if (activeBenchmark === 'mmlu') {
          scoreA = a.benchmarks.mmlu_pro || 0;
          scoreB = b.benchmarks.mmlu_pro || 0;
        } else if (activeBenchmark === 'gpqa') {
          scoreA = a.benchmarks.gpqa || 0;
          scoreB = b.benchmarks.gpqa || 0;
        }
        return scoreB - scoreA;
      });
  }, [models, activeBenchmark]);

  const rankedRows: RankedRow[] = rankedModels.map((model, index) => {
    const raw = activeBenchmark === 'arena' ? model.benchmarks.arena_elo : activeBenchmark === 'swe' ? model.benchmarks.swe_bench : activeBenchmark === 'mmlu' ? model.benchmarks.mmlu_pro : model.benchmarks.gpqa;
    return { model, rank: index + 1, score: raw == null ? '-' : activeBenchmark === 'arena' ? String(raw) : `${raw}%` };
  });
  const columns: ResponsiveColumn<RankedRow>[] = [
    { key: 'rank', header: t.leaderboard.rank, priority: 'primary', numeric: true, render: (row) => row.rank <= 3 ? ['🥇', '🥈', '🥉'][row.rank - 1] : `#${row.rank}` },
    { key: 'model', header: t.leaderboard.model, priority: 'primary', render: (row) => <strong>{row.model.name}</strong> },
    { key: 'provider', header: t.leaderboard.provider, priority: 'secondary', render: (row) => row.model.provider_name },
    { key: 'tier', header: t.leaderboard.tier, priority: 'secondary', render: (row) => row.model.tier },
    { key: 'score', header: t.leaderboard.score, priority: 'secondary', numeric: true, render: (row) => <strong className="text-cyan-600 dark:text-cyan-400">{row.score}</strong> },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3 tracking-tight">
          <Trophy className="w-8 h-8 text-amber-500 shrink-0" />
          {t.leaderboard.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-3xl font-semibold">
          {t.leaderboard.subtitle}
        </p>
      </div>

      {/* Benchmark Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => setActiveBenchmark('arena')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-sm ${
            activeBenchmark === 'arena'
              ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-400 font-black'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          {t.leaderboard.tabArenaElo}
        </button>

        <button
          onClick={() => setActiveBenchmark('swe')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-sm ${
            activeBenchmark === 'swe'
              ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400 font-black'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
          }`}
        >
          <Code className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          {t.leaderboard.tabSweBench}
        </button>

        <button
          onClick={() => setActiveBenchmark('mmlu')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-sm ${
            activeBenchmark === 'mmlu'
              ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400 font-black'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          {t.leaderboard.tabMmluPro}
        </button>

        <button
          onClick={() => setActiveBenchmark('gpqa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs transition-all shadow-sm ${
            activeBenchmark === 'gpqa'
              ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400 font-black'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          {t.leaderboard.tabGpqa}
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-800/90 text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              <th className="p-4 w-20 text-center">{t.leaderboard.rank}</th>
              <th className="p-4">{t.leaderboard.model}</th>
              <th className="p-4">{t.leaderboard.provider}</th>
              <th className="p-4">{t.leaderboard.tier}</th>
              <th className="p-4 text-right">{t.leaderboard.score}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-sm font-semibold">
            {rankedModels.map((model, index) => {
              let scoreDisplay = '-';
              let scoreRatio = 0; // 0 to 100%

              if (activeBenchmark === 'arena' && model.benchmarks.arena_elo) {
                scoreDisplay = `${model.benchmarks.arena_elo}`;
                scoreRatio = Math.min(100, Math.max(10, ((model.benchmarks.arena_elo - 1100) / 300) * 100));
              } else if (activeBenchmark === 'swe' && model.benchmarks.swe_bench) {
                scoreDisplay = `${model.benchmarks.swe_bench}%`;
                scoreRatio = model.benchmarks.swe_bench;
              } else if (activeBenchmark === 'mmlu' && model.benchmarks.mmlu_pro) {
                scoreDisplay = `${model.benchmarks.mmlu_pro}%`;
                scoreRatio = model.benchmarks.mmlu_pro;
              } else if (activeBenchmark === 'gpqa' && model.benchmarks.gpqa) {
                scoreDisplay = `${model.benchmarks.gpqa}%`;
                scoreRatio = model.benchmarks.gpqa;
              }

              return (
                <tr
                  key={model.id}
                  className={`transition-colors ${
                    index === 0 
                      ? 'bg-amber-50 dark:bg-amber-950/30 font-extrabold' 
                      : index === 1 
                      ? 'bg-slate-100 dark:bg-slate-800/40 font-extrabold' 
                      : index === 2 
                      ? 'bg-amber-50/50 dark:bg-amber-900/20 font-extrabold' 
                      : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/30'
                  }`}
                >
                  <td className="p-4 text-center font-black font-mono">
                    {index === 0 && <span className="text-2xl">🥇</span>}
                    {index === 1 && <span className="text-2xl">🥈</span>}
                    {index === 2 && <span className="text-2xl">🥉</span>}
                    {index > 2 && <span className="text-slate-500 dark:text-slate-400 font-bold">#{index + 1}</span>}
                  </td>
                  <td className="p-4 font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-base">{model.name}</span>
                    {model.supports_reasoning && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40 font-extrabold">
                        🧠 Reasoning
                      </span>
                    )}
                    {model.is_open_weight && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 font-extrabold">
                        Open
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-bold">{model.provider_name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                      {model.tier}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono font-black text-cyan-600 dark:text-cyan-400 text-lg">
                        {scoreDisplay}
                      </span>
                      {scoreRatio > 0 && (
                        <div className="w-24 bg-slate-300 dark:bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full rounded-full ${
                              index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-amber-600' : 'bg-cyan-500'
                            }`}
                            style={{ width: `${scoreRatio}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ResponsiveDataTable rows={rankedRows} columns={columns} getRowId={(row) => row.model.id} caption={t.leaderboard.title} />
    </div>
  );
};
