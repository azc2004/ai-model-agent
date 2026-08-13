import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import type { ModelSpec } from '../types';

interface ModelRadarChartProps {
  models: ModelSpec[];
}

const RADAR_COLORS = [
  '#6366f1', // Indigo
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#a855f7', // Purple
  '#f59e0b', // Amber
  '#ec4899', // Pink
];

export const ModelRadarChart: React.FC<ModelRadarChartProps> = ({ models }) => {
  if (!models || models.length === 0) return null;

  // 정규화 헬퍼 함수 (0 ~ 100 점수 변환)
  const normalizeElo = (elo?: number) => {
    if (!elo) return 50;
    return Math.min(100, Math.max(10, ((elo - 1000) / 400) * 100));
  };

  const normalizeContext = (ctx?: number) => {
    if (!ctx) return 40;
    const logCtx = Math.log2(ctx);
    return Math.min(100, Math.max(10, ((logCtx - 13) / 7) * 100));
  };

  const normalizeMmluPro = (mmlu?: number) => {
    if (!mmlu) return 50;
    return Math.min(100, Math.max(10, mmlu));
  };

  const normalizeSweBench = (swe?: number) => {
    if (!swe) return 50;
    return Math.min(100, Math.max(10, swe * 1.2));
  };

  const normalizeCostEfficiency = (inputPricePer1M: number) => {
    if (inputPricePer1M === 0) return 100;
    const score = 100 - (inputPricePer1M / 15) * 90;
    return Math.min(100, Math.max(10, score));
  };

  const radarData = [
    {
      subject: '추론 지능 (Arena Elo)',
      fullMark: 100,
      ...models.reduce((acc, m) => {
        acc[m.name] = Math.round(normalizeElo(m.benchmarks?.arena_elo));
        return acc;
      }, {} as Record<string, number>)
    },
    {
      subject: '컨텍스트 윈도우',
      fullMark: 100,
      ...models.reduce((acc, m) => {
        acc[m.name] = Math.round(normalizeContext(m.context_window));
        return acc;
      }, {} as Record<string, number>)
    },
    {
      subject: '복합 학술 지식 (MMLU-Pro)',
      fullMark: 100,
      ...models.reduce((acc, m) => {
        acc[m.name] = Math.round(normalizeMmluPro(m.benchmarks?.mmlu_pro));
        return acc;
      }, {} as Record<string, number>)
    },
    {
      subject: '에이전틱 코딩 (SWE-bench)',
      fullMark: 100,
      ...models.reduce((acc, m) => {
        acc[m.name] = Math.round(normalizeSweBench(m.benchmarks?.swe_bench));
        return acc;
      }, {} as Record<string, number>)
    },
    {
      subject: '비용 효율성 ($/1M)',
      fullMark: 100,
      ...models.reduce((acc, m) => {
        acc[m.name] = Math.round(normalizeCostEfficiency(m.api_pricing?.input_price_per_1m ?? 0));
        return acc;
      }, {} as Record<string, number>)
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          🕸️ 모델 육각형 다차원 역량 비교 (Multi-Dimensional Radar Chart)
        </h3>
        <span className="text-xs text-slate-500 font-bold">정규화 100점 만점 기준</span>
      </div>

      <div className="h-80 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#cbd5e1" />
            <PolarAngleAxis dataKey="subject" stroke="#64748b" tick={{ fill: '#0f172a', fontSize: 12, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 'bold' }} />
            {models.map((m, idx) => (
              <Radar
                key={m.id}
                name={m.name}
                dataKey={m.name}
                stroke={RADAR_COLORS[idx % RADAR_COLORS.length]}
                fill={RADAR_COLORS[idx % RADAR_COLORS.length]}
                fillOpacity={0.25}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
