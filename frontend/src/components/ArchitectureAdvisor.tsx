import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Code, Database, Headset, Globe, Cpu, Check, Copy, Download, 
  Server, Zap, CheckCircle2, ChevronRight, Layers, FileText, X
} from 'lucide-react';
import type { RecommendationRequest, ArchitectureRecommendationResult, TrendingTemplate } from '../types';

export const ArchitectureAdvisor: React.FC = () => {
  const [trending, setTrending] = useState<TrendingTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>("code_agent");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ArchitectureRecommendationResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form State
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('code_agent');
  const [monthlyRequests, setMonthlyRequests] = useState<number>(100000);
  const [avgInputTokens, setAvgInputTokens] = useState<number>(2000);
  const [avgOutputTokens, setAvgOutputTokens] = useState<number>(1000);
  const [requiresMultimodal, setRequiresMultimodal] = useState<boolean>(false);
  const [requiresCoding, setRequiresCoding] = useState<boolean>(true);

  // 1. Fetch Trending Templates
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/recommend/trending')
      .then(res => res.json())
      .then((data: TrendingTemplate[]) => {
        setTrending(data);
        if (data.length > 0) {
          applyTemplate(data[0]);
        }
      })
      .catch(err => console.error("Failed to load trending templates", err));
  }, []);

  const applyTemplate = (tpl: TrendingTemplate) => {
    setSelectedTemplateId(tpl.id);
    setServiceType(tpl.request.service_type);
    setMonthlyRequests(tpl.request.monthly_requests);
    setAvgInputTokens(tpl.request.avg_input_tokens);
    setAvgOutputTokens(tpl.request.avg_output_tokens);
    setRequiresMultimodal(tpl.request.requires_multimodal);
    setRequiresCoding(tpl.request.requires_coding);
    fetchRecommendation(tpl.request);
  };

  const fetchRecommendation = (req?: RecommendationRequest) => {
    setLoading(true);
    const payload: RecommendationRequest = req || {
      service_type: serviceType,
      monthly_requests: monthlyRequests,
      avg_input_tokens: avgInputTokens,
      avg_output_tokens: avgOutputTokens,
      requires_multimodal: requiresMultimodal,
      requires_coding: requiresCoding,
      custom_prompt: customPrompt
    };

    fetch('http://localhost:8000/api/v1/recommend/architecture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then((data: ArchitectureRecommendationResult) => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to calculate recommendation", err);
        setLoading(false);
      });
  };

  const handleCopyMarkdown = () => {
    if (!result?.markdown_spec) return;
    navigator.clipboard.writeText(result.markdown_spec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    if (!result?.markdown_spec) return;
    const blob = new Blob([result.markdown_spec], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architecture_spec_${result.service_name.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return <Code className="w-5 h-5 text-emerald-400" />;
      case 'database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'headset': return <Headset className="w-5 h-5 text-purple-400" />;
      case 'globe': return <Globe className="w-5 h-5 text-amber-400" />;
      case 'sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      default: return <Cpu className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> AI Architecture Advisor
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            맞춤형 AI 서비스 <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">모델 조합 & 호스팅 시뮤레이터</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            구현하려는 서비스의 트래픽과 요구사항을 입력하세요. <strong className="text-white">최고 성능, 스마트 최적 라우팅, 극가성비</strong> 3가지 조합과 <strong className="text-indigo-300">개발명세서 Markdown(.md)</strong>을 원클릭으로 자동 생성해 드립니다.
          </p>
        </div>
      </div>

      {/* Top 5 Trending Templates Ranking */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-black">🏆</span>
            요즘 가장 많이 구현하는 AI 서비스 TOP 5 (인기 랭킹)
          </h2>
          <span className="text-xs text-slate-400 font-medium">원클릭 시나리오 자동적용</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {trending.map((tpl) => {
            const isSelected = selectedTemplateId === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => applyTemplate(tpl)}
                className={`relative group text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      tpl.rank === 1 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      tpl.rank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-400/30' :
                      'bg-amber-700/20 text-amber-400 border border-amber-700/30'
                    }`}>
                      #{tpl.rank}위
                    </span>
                    {getTemplateIcon(tpl.icon)}
                  </div>
                  <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-indigo-300 transition-colors">
                    {tpl.title.split('(')[0]}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{tpl.typical_monthly_requests.toLocaleString()} req/mo</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-indigo-400' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Form & Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Customizer */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl h-fit">
          <div className="flex items-center gap-2 text-white font-bold text-lg border-b border-slate-800 pb-3">
            <Layers className="w-5 h-5 text-indigo-400" />
            서비스 요구사항 직접 입력
          </div>

          <div className="space-y-4 text-sm">
            {/* Natural Language Prompt Input */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                <span>💬 요구사항 자유 묘사 (자연어)</span>
                <span className="text-[11px] text-indigo-400 font-normal">AI 자동 의도분석</span>
              </label>
              <textarea
                rows={3}
                placeholder="예: 사내 PDF 문서를 RAG로 검색하여 보안 답변을 주는 챗봇을 만들려고 합니다. 월 10만 건 정도 사용 예상됩니다."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-600"
              />
              {/* Sample Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => setCustomPrompt("사내 Confluence/PDF 문서를 RAG로 답변하는 보안 챗봇 구축")}
                  className="text-[10px] bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-300 px-2 py-1 rounded-lg transition-colors text-left"
                >
                  💡 사내 문서 RAG 챗봇
                </button>
                <button
                  type="button"
                  onClick={() => setCustomPrompt("Python/JS 버그 자동 수정 및 리팩토링 에이전트")}
                  className="text-[10px] bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-300 px-2 py-1 rounded-lg transition-colors text-left"
                >
                  💡 코드 수정 에이전트
                </button>
              </div>
            </div>
            {/* Service Type */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">서비스 유형</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="code_agent">👨‍💻 자율 코딩 에이전트 (Code Agent)</option>
                <option value="rag">📚 기업용 사내 RAG 챗봇 (Enterprise RAG)</option>
                <option value="multimodal">🎧 멀티모달 고객지원 봇 (Multimodal CS)</option>
                <option value="translation">🌐 글로벌 실시간 번역 API (Translation)</option>
                <option value="content_creation">✍️ 마케팅 콘텐츠 코파일럿 (Content Copilot)</option>
              </select>
            </div>

            {/* Monthly Requests */}
            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1.5">
                <span>월간 예상 요청 수</span>
                <span className="text-indigo-400 font-bold">{monthlyRequests.toLocaleString()} 회</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={monthlyRequests}
                onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>1만</span>
                <span>50만</span>
                <span>100만 회</span>
              </div>
            </div>

            {/* Avg Tokens */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">평균 입력 토큰</label>
                <input
                  type="number"
                  value={avgInputTokens}
                  onChange={(e) => setAvgInputTokens(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">평균 출력 토큰</label>
                <input
                  type="number"
                  value={avgOutputTokens}
                  onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Capability Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={requiresMultimodal}
                  onChange={(e) => setRequiresMultimodal(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 rounded"
                />
                <span>🖼️ 멀티모달 (비전/이미지 이해) 필요</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={requiresCoding}
                  onChange={(e) => setRequiresCoding(e.target.checked)}
                  className="w-4 h-4 accent-indigo-500 rounded"
                />
                <span>⚡ 복잡 추론 & 코드 생성 필요</span>
              </label>
            </div>

            <button
              onClick={() => { setSelectedTemplateId(null); fetchRecommendation(); }}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              추천 아키텍처 recalculate
            </button>
          </div>
        </div>

        {/* Right Results: Combos & Hosting & Markdown Spec */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <Sparkles className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
              <p className="text-white font-bold text-lg">최적의 모델 조합 및 비용을 계산 중입니다...</p>
            </div>
          ) : result ? (
            <>
              {/* Service Summary Banner */}
              <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                <div>
                  <h3 className="text-xl font-bold text-white">{result.service_name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>월간 요청: <strong className="text-indigo-300">{result.monthly_requests.toLocaleString()}회</strong></span>
                    <span>•</span>
                    <span>월 토큰: <strong className="text-slate-200">in {result.total_monthly_input_tokens_m}M / out {result.total_monthly_output_tokens_m}M</strong></span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm shadow-md whitespace-nowrap"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Markdown 명세서 보기 & 다운로드
                </button>
              </div>

              {/* 3 Model Combos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.combos.map((combo) => {
                  const isRecommended = combo.id === 'smart_balanced';
                  return (
                    <div
                      key={combo.id}
                      className={`relative rounded-3xl p-5 border flex flex-col justify-between transition-all ${
                        isRecommended
                          ? 'bg-gradient-to-b from-indigo-950/90 via-slate-900/90 to-slate-900 border-indigo-500 shadow-xl ring-2 ring-indigo-500/30'
                          : 'bg-slate-900/70 border-slate-800'
                      }`}
                    >
                      {isRecommended && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-[11px] px-3 py-0.5 rounded-full shadow-md">
                          ⭐ 추천 아키텍처 (Best ROI)
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{combo.tag}</span>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                            {combo.avg_arena_elo.toFixed(0)} ELO
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">{combo.name}</h4>
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-3">{combo.description}</p>

                        {/* Cost Display */}
                        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 mb-4">
                          <span className="text-[11px] text-slate-400">월간 예상 API 비용</span>
                          <div className="text-2xl font-black text-white mt-0.5">
                            ${combo.total_monthly_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <span className="text-xs font-normal text-slate-400"> /월</span>
                          </div>
                        </div>

                        {/* Pipeline Items */}
                        <div className="space-y-2 mb-4">
                          <span className="text-[11px] font-bold text-slate-300 block">라우팅 파이프라인 구성:</span>
                          {combo.items.map((item, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs">
                              <div className="flex justify-between text-slate-300 font-medium">
                                <span className="text-indigo-300 font-semibold">{item.role}</span>
                                <span>{item.allocation_percent}%</span>
                              </div>
                              <div className="text-slate-400 text-[11px] mt-0.5 line-clamp-1">
                                {item.model_name} <span className="text-slate-600">(${item.monthly_estimated_cost.toFixed(2)})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Advantages */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs">
                        {combo.key_advantages.map((adv, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="line-clamp-1">{adv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hosting Recommendations */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-400" />
                    추천 호스팅 & 클라우드 인프라 (Hosting Options)
                  </h4>
                  <span className="text-xs text-slate-400">서버 인프라 가이드</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.hosting_options.map((h, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {h.category}
                        </span>
                        <span className="text-sm font-bold text-white">${h.estimated_monthly_cost}/월</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">{h.provider}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
                      <div className="text-[11px] text-indigo-400 font-medium pt-1">
                        👉 추천 대상: {h.recommended_for}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Markdown Spec Modal */}
      {showModal && result && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  AI 시스템 개발 명세서 (architecture_spec.md)
                </h3>
                <p className="text-xs text-slate-400 mt-1">Cursor IDE, Claude, 개발팀에 전달 가능한 마크다운 명세서입니다.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Code Preview */}
            <div className="p-6 overflow-y-auto bg-slate-950/90 font-mono text-xs text-slate-300 space-y-4">
              <pre className="whitespace-pre-wrap leading-relaxed select-all">
                {result.markdown_spec}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-3">
              <button
                onClick={handleCopyMarkdown}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? '클립보드 복사 완료!' : '복사하기 (Copy)'}
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                명세서 파일 다운로드 (.md)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
