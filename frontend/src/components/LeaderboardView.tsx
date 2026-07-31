import React, { useState, useMemo } from 'react';
import type { ModelSpec } from '../types';
import { Trophy, Award, Code, BookOpen, BrainCircuit } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
          <Trophy className="w-7 h-7 text-amber-400" />
          {t.leaderboard.title}
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl">
          {t.leaderboard.subtitle}
        </p>
      </div>

      {/* Benchmark Selector Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setActiveBenchmark('arena')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeBenchmark === 'arena'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          {t.leaderboard.tabArenaElo}
        </button>

        <button
          onClick={() => setActiveBenchmark('swe')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeBenchmark === 'swe'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Code className="w-4 h-4 text-cyan-400" />
          {t.leaderboard.tabSweBench}
        </button>

        <button
          onClick={() => setActiveBenchmark('mmlu')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeBenchmark === 'mmlu'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-400" />
          {t.leaderboard.tabMmluPro}
        </button>

        <button
          onClick={() => setActiveBenchmark('gpqa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeBenchmark === 'gpqa'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-purple-400" />
          {t.leaderboard.tabGpqa}
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4 w-20 text-center">{t.leaderboard.rank}</th>
              <th className="p-4">{t.leaderboard.model}</th>
              <th className="p-4">{t.leaderboard.provider}</th>
              <th className="p-4">{t.leaderboard.tier}</th>
              <th className="p-4 text-right">{t.leaderboard.score}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {rankedModels.map((model, index) => {
              let scoreDisplay = '-';
              if (activeBenchmark === 'arena') scoreDisplay = `${model.benchmarks.arena_elo}`;
              if (activeBenchmark === 'swe') scoreDisplay = `${model.benchmarks.swe_bench}%`;
              if (activeBenchmark === 'mmlu') scoreDisplay = `${model.benchmarks.mmlu_pro}%`;
              if (activeBenchmark === 'gpqa') scoreDisplay = `${model.benchmarks.gpqa}%`;

              return (
                <tr
                  key={model.id}
                  className={`hover:bg-slate-800/30 transition-colors ${
                    index === 0 ? 'bg-amber-950/10' : index === 1 ? 'bg-slate-800/20' : index === 2 ? 'bg-amber-900/5' : ''
                  }`}
                >
                  <td className="p-4 text-center font-bold font-mono">
                    {index === 0 && <span className="text-xl">🥇</span>}
                    {index === 1 && <span className="text-xl">🥈</span>}
                    {index === 2 && <span className="text-xl">🥉</span>}
                    {index > 2 && <span className="text-slate-400">#{index + 1}</span>}
                  </td>
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    {model.name}
                    {model.is_open_weight && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-normal">
                        Open
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{model.provider_name}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300">
                      {model.tier}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-extrabold text-cyan-400 text-base">
                    {scoreDisplay}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
