import React, { useState, useMemo } from 'react';
import type { ModelSpec } from '../types';

interface TokenizerSandboxViewProps {
  models: ModelSpec[];
  onToggleCompare?: (modelId: string) => void;
  selectedModelIds?: string[];
}

const SAMPLE_PROMPTS = [
  {
    title: "🔍 RAG 지식 기반 질의응답 (RAG Prompt)",
    text: `You are an expert AI Solution Architect. Based on the provided company document below, answer the user's technical query in structured Markdown format.

[Document Context]
LLM COMPASS is an enterprise AI model spec analytics platform. It supports 580+ AI models including OpenAI GPT-4o, Claude 3.7 Sonnet, Gemini 2.5 Flash, and DeepSeek R1. The architecture uses FastAPI, React, and Cloudflare Workers Edge CDN for sub-5ms caching.

[User Query]
How do I select between SaaS API calling vs Cloud GPU self-hosting for 10 million monthly tokens?`
  },
  {
    title: "💻 코드 리팩토링 & 버그 검수 (Code Refactor)",
    text: `Given the following Python FastAPI code snippet, analyze memory usage, connection pool limits, and potential race conditions. Provide an optimized non-blocking async implementation:

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`
  },
  {
    title: "📊 비즈니스 요약 & TCO 분석 (Executive Summary)",
    text: `다음은 포춘 500대 기업의 2026년 Enterprise AI 인프라 도입 조사 보고서 데이터입니다. 아래 핵심 요약을 작성하고 SaaS API 대안으로 온프레미스 서빙 호스팅 수율을 분석해 주세요.`
  }
];

export const TokenizerSandboxView: React.FC<TokenizerSandboxViewProps> = ({
  models,
  onToggleCompare,
  selectedModelIds = []
}) => {
  const [promptText, setPromptText] = useState<string>(SAMPLE_PROMPTS[0].text);
  const [outputTokenEstimate, setOutputTokenEstimate] = useState<number>(500);
  const [callBatchCount, setCallBatchCount] = useState<number>(10000);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterTier, setFilterTier] = useState<string>('all');

  // 토큰 계산 로직
  const tokenStats = useMemo(() => {
    const text = promptText || '';
    const totalChars = text.length;
    let estimatedTokens = 0;

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code > 0x07ff) {
        estimatedTokens += 0.75;
      } else {
        estimatedTokens += 0.25;
      }
    }

    const inputTokens = Math.max(1, Math.ceil(estimatedTokens));
    const outputTokens = Math.max(1, outputTokenEstimate);

    return {
      totalChars,
      inputTokens,
      outputTokens,
      totalTokensPerCall: inputTokens + outputTokens
    };
  }, [promptText, outputTokenEstimate]);

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.provider_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTier = filterTier === 'all' || m.tier === filterTier;
      return matchSearch && matchTier;
    });
  }, [models, searchTerm, filterTier]);

  const calculateCost = (m: ModelSpec) => {
    const inputPricePerM = m.api_pricing?.input_price_per_1m ?? 0;
    const outputPricePerM = m.api_pricing?.output_price_per_1m ?? 0;

    const singleInputCost = (tokenStats.inputTokens / 1_000_000) * inputPricePerM;
    const singleOutputCost = (tokenStats.outputTokens / 1_000_000) * outputPricePerM;
    const singleTotalCost = singleInputCost + singleOutputCost;

    const batchTotalCost = singleTotalCost * callBatchCount;

    return {
      singleTotalCost,
      batchTotalCost
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-cyan-500/10 border border-indigo-200 dark:border-cyan-500/30 text-indigo-700 dark:text-cyan-300 text-xs font-black shadow-sm">
          🧮 Interactive Tokenizer & Prompt Cost Sandbox
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          실시간 프롬프트 토크나이저 & 모델별 API 비용 계산기
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-semibold max-w-3xl mx-auto leading-relaxed">
          프롬프트를 입력하면 실시간으로 예상 토큰 수와 1회 호출 비용 및 월간 배치 호출 시의 정밀 산출 금액을 580+ AI 모델 전체와 비교합니다.
        </p>
      </div>

      {/* Main Grid: Prompt Sandbox Left, Stats & Batch Config Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Textarea */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 shadow-md backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              📝 프롬프트 입력 (Prompt Input)
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>{tokenStats.totalChars.toLocaleString()} 글자</span>
              <span>•</span>
              <span className="text-indigo-600 dark:text-cyan-400 font-extrabold">약 {tokenStats.inputTokens.toLocaleString()} 입력 토큰</span>
            </div>
          </div>

          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={8}
            placeholder="비용을 계산할 프롬프트를 자유롭게 입력하세요..."
            className="w-full bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500 transition font-mono leading-relaxed resize-y shadow-inner"
          />

          {/* Sample Prompts */}
          <div className="space-y-2">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">샘플 프롬프트 원클릭 로드:</span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((sp, idx) => (
                <button
                  key={idx}
                  onClick={() => setPromptText(sp.text)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs transition border border-slate-300 dark:border-slate-700 font-extrabold shadow-sm"
                >
                  {sp.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Simulation Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-5 shadow-md backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              ⚙️ 배치 및 응답 토큰 설정 (Simulation Setup)
            </h3>

            {/* Expected Output Tokens Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">예상 출력 토큰 (Output Tokens)</span>
                <span className="text-indigo-600 dark:text-cyan-400 font-extrabold">{outputTokenEstimate.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min={50}
                max={4096}
                step={50}
                value={outputTokenEstimate}
                onChange={(e) => setOutputTokenEstimate(Number(e.target.value))}
                className="w-full accent-indigo-600 dark:accent-cyan-500 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                <span>50 (짧은 응답)</span>
                <span>1,000 (일반적)</span>
                <span>4,096 (긴 리포트)</span>
              </div>
            </div>

            {/* Batch Call Count */}
            <div className="space-y-2">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">월간 총 API 호출 횟수 (Batch Requests)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1, 1000, 10000, 100000].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setCallBatchCount(cnt)}
                    className={`py-2 rounded-xl text-xs font-black border transition ${
                      callBatchCount === cnt
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cnt === 1 ? '1회' : `${(cnt / 1000).toLocaleString()}k회`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Summary Card */}
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-cyan-950/40 border border-indigo-200 dark:border-cyan-500/30 text-xs space-y-1.5 shadow-inner">
            <div className="flex justify-between text-slate-800 dark:text-slate-200 font-bold">
              <span>총 처리 토큰 (1회 호출 기준):</span>
              <span className="font-extrabold text-indigo-600 dark:text-cyan-300">{tokenStats.totalTokensPerCall.toLocaleString()} tokens</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400 font-semibold">
              <span>- 입력 (Input):</span>
              <span>{tokenStats.inputTokens.toLocaleString()} tokens</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400 font-semibold">
              <span>- 출력 (Output):</span>
              <span>{tokenStats.outputTokens.toLocaleString()} tokens</span>
            </div>
            <div className="flex justify-between text-slate-800 dark:text-slate-200 pt-1.5 border-t border-indigo-200 dark:border-cyan-500/20 font-bold">
              <span>월간 총 트래픽 토큰:</span>
              <span className="font-black text-indigo-700 dark:text-cyan-400">
                {((tokenStats.totalTokensPerCall * callBatchCount) / 1_000_000).toFixed(2)} Million Tokens
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Comparison Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              📊 580+ AI 모델별 정밀 비용 산출표
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
              입력 및 예상 출력 토큰에 기반한 1회 호출 단위 비용 및 설정한 월간 트래픽 비용 비교
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="모델명, 프로바이더 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:border-indigo-500 shadow-sm"
            />
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
            >
              <option value="all">모든 티어</option>
              <option value="Frontier">Frontier</option>
              <option value="Mid">Mid</option>
              <option value="Small">Small</option>
              <option value="Micro">Micro</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 bg-slate-100 dark:bg-slate-950 font-black">
                <th className="p-3.5">모델명 & 프로바이더</th>
                <th className="p-3.5">티어 / 라이선스</th>
                <th className="p-3.5 text-right">입력 1M 토큰 ($)</th>
                <th className="p-3.5 text-right">출력 1M 토큰 ($)</th>
                <th className="p-3.5 text-right">1회 추정 비용 ($)</th>
                <th className="p-3.5 text-right">월간 총 예상 비용 ($)</th>
                <th className="p-3.5 text-center">비교</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-100 font-bold">
              {filteredModels.slice(0, 30).map((m) => {
                const costs = calculateCost(m);
                const isCompared = selectedModelIds.includes(m.id);

                return (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-bold">
                      <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-white font-black">{m.name}</span>
                        <span className="text-[11px] text-slate-500 font-semibold">{m.provider_name}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-[10px] font-black">
                          {m.tier}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${m.is_open_weight ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30' : 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30'}`}>
                          {m.is_open_weight ? '오픈' : '상용'}
                        </span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right font-mono text-slate-700 dark:text-slate-300 font-bold">
                      ${m.api_pricing?.input_price_per_1m?.toFixed(2) ?? '0.00'}
                    </td>
                    <td className="p-3.5 text-right font-mono text-slate-700 dark:text-slate-300 font-bold">
                      ${m.api_pricing?.output_price_per_1m?.toFixed(2) ?? '0.00'}
                    </td>
                    <td className="p-3.5 text-right font-mono text-indigo-600 dark:text-cyan-400 font-black">
                      ${costs.singleTotalCost < 0.0001 ? '<$0.0001' : costs.singleTotalCost.toFixed(5)}
                    </td>
                    <td className="p-3.5 text-right font-mono text-emerald-600 dark:text-emerald-400 font-black">
                      ${costs.batchTotalCost < 0.01 ? '<$0.01' : costs.batchTotalCost.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-center">
                      {onToggleCompare && (
                        <button
                          onClick={() => onToggleCompare(m.id)}
                          className={`px-3 py-1 rounded-xl text-[11px] font-black transition shadow-sm ${
                            isCompared
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {isCompared ? '비교 중' : '+ 비교'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
