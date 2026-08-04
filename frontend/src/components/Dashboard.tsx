import React, { useState, useEffect } from 'react';
import type { ModelSpec, Provider } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../api';
import { CodeSnippetModal } from './CodeSnippetModal';

interface DashboardProps {
  onCompareSelect?: (modelId: string) => void;
  selectedCompareIds?: string[];
  models?: ModelSpec[];
  providers?: Provider[];
  selectedModelIds?: string[];
  onToggleCompare?: (modelId: string) => void;
  onClearCompare?: () => void;
  onGoToCompare?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onCompareSelect,
  selectedCompareIds = [],
  selectedModelIds = [],
  onToggleCompare,
  models: propModels = [],
  providers: propProviders = []
}) => {
  const { t } = useLanguage();
  const [models, setModels] = useState<ModelSpec[]>(propModels);
  const [providers, setProviders] = useState<Provider[]>(propProviders);
  const [loading, setLoading] = useState<boolean>(propModels.length === 0);

  // Filter states
  const [codeModalModel, setCodeModalModel] = useState<ModelSpec | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [reasoningOnly, setReasoningOnly] = useState<boolean>(false);
  const [webSearchOnly, setWebSearchOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  // View Mode: 'grid' | 'table' | 'compact'
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'compact'>('grid');

  // Sort state: 기본값 최신 인기 대표 모델(Arena Elo high) 우선 정렬
  type SortKey = 'name' | 'provider' | 'tier' | 'context' | 'input_price' | 'output_price' | 'arena_elo' | 'rpm';
  const [sortKey, setSortKey] = useState<SortKey>('arena_elo');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const TIER_ORDER: Record<string, number> = { Frontier: 4, Mid: 3, Small: 2, Micro: 1 };

  const effectiveCompareIds = selectedCompareIds.length > 0 ? selectedCompareIds : selectedModelIds;
  const handleToggle = (id: string) => {
    if (onToggleCompare) {
      onToggleCompare(id);
    } else if (onCompareSelect) {
      onCompareSelect(id);
    }
  };

  useEffect(() => {
    if (propModels.length > 0) {
      setModels(propModels);
      setProviders(propProviders);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [modelsRes, providersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/models`),
          fetch(`${API_BASE_URL}/providers`)
        ]);
        const modelsData = await modelsRes.json();
        const providersData = await providersRes.json();

        setModels(modelsData);
        setProviders(providersData);
      } catch (err) {
        console.error('Failed to fetch catalog data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propModels, propProviders]);

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.provider_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.license_type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvider = selectedProvider === 'all' || model.provider_id === selectedProvider;
    const matchesTier = selectedTier === 'all' || model.tier === selectedTier;
    const matchesLicense =
      selectedLicense === 'all' ||
      (selectedLicense === 'open' ? model.is_open_weight : !model.is_open_weight);

    const matchesReasoning = !reasoningOnly || model.supports_reasoning;
    const matchesWebSearch = !webSearchOnly || model.supports_web_search;
    const matchesVerified = !verifiedOnly || model.is_verified;

    return matchesSearch && matchesProvider && matchesTier && matchesLicense && matchesReasoning && matchesWebSearch && matchesVerified;
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    let av: number | string = 0;
    let bv: number | string = 0;
    switch (sortKey) {
      case 'name':      av = a.name; bv = b.name; break;
      case 'provider':  av = a.provider_name; bv = b.provider_name; break;
      case 'tier':      av = TIER_ORDER[a.tier] ?? 0; bv = TIER_ORDER[b.tier] ?? 0; break;
      case 'context':   av = a.context_window; bv = b.context_window; break;
      case 'input_price': av = a.api_pricing.input_price_per_1m; bv = b.api_pricing.input_price_per_1m; break;
      case 'output_price': av = a.api_pricing.output_price_per_1m; bv = b.api_pricing.output_price_per_1m; break;
      case 'arena_elo': av = a.benchmarks.arena_elo ?? -1; bv = b.benchmarks.arena_elo ?? -1; break;
      case 'rpm':       av = a.quota?.rpm ?? 0; bv = b.quota?.rpm ?? 0; break;
    }
    if (typeof av === 'string' && typeof bv === 'string') {
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  // Sort indicator icon
  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="ml-1 text-slate-600">⇅</span>;
    return <span className="ml-1 text-cyan-400">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Frontier':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Mid':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Small':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Micro':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Title Header */}
      <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
          {t.dashboard.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-semibold">
          {t.dashboard.subtitle}
        </p>
      </div>

      {/* Filter & View Mode Controls Bar */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-5 space-y-4 rounded-2xl shadow-md">
        {/* Upper Row: Search, Dropdown Selectors, View Mode Switcher */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <input
              type="text"
              placeholder={t.dashboard.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 font-bold rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
            />
            <svg
              className="w-4 h-4 text-cyan-500 dark:text-cyan-400 absolute left-3.5 top-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Dropdowns & Quick Sort Chips */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs font-extrabold cursor-pointer shadow-sm"
            >
              <option value="all">{t.dashboard.allProviders}</option>
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs font-extrabold cursor-pointer shadow-sm"
            >
              <option value="all">{t.dashboard.allTiers}</option>
              <option value="Frontier">Frontier</option>
              <option value="Mid">Mid</option>
              <option value="Small">Small</option>
              <option value="Micro">Micro</option>
            </select>

            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs font-extrabold cursor-pointer shadow-sm"
            >
              <option value="all">{t.dashboard.allLicenses}</option>
              <option value="open">{t.dashboard.openWeight}</option>
              <option value="proprietary">{t.dashboard.proprietary}</option>
            </select>

            {/* Quick Sort Chips */}
            <div className="inline-flex items-center gap-2 border-l border-slate-200 dark:border-slate-700/80 pl-2.5 shrink-0">
              <button
                onClick={() => { setSortKey('arena_elo'); setSortDir('desc'); }}
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all inline-flex items-center gap-1.5 border whitespace-nowrap shrink-0 ${
                  sortKey === 'arena_elo'
                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md font-black ring-1 ring-amber-400'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                🏆 Elo 랭킹순
              </button>
              <button
                onClick={() => { setSortKey('input_price'); setSortDir('asc'); }}
                className={`px-3 py-2 rounded-xl text-xs font-black transition-all inline-flex items-center gap-1.5 border whitespace-nowrap shrink-0 ${
                  sortKey === 'input_price'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-black ring-1 ring-cyan-400'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-cyan-400'
                }`}
              >
                💰 최저 비용순
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 rounded-xl ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {t.viewMode.grid}
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  viewMode === 'table'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t.viewMode.table}
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  viewMode === 'compact'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {t.viewMode.compact}
              </button>
            </div>
          </div>
        </div>

        {/* Lower Row: Quick Feature Filter Chips */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2.5 text-xs font-medium">
          <span className="text-slate-600 dark:text-slate-400 font-extrabold mr-1 shrink-0">⚡ 특수 기능 필터:</span>

          <button
            onClick={() => setReasoningOnly(!reasoningOnly)}
            className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 font-extrabold shadow-sm whitespace-nowrap ${
              reasoningOnly
                ? 'bg-purple-600 text-white border-purple-500 shadow-purple-500/20'
                : 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-600 hover:bg-purple-200'
            }`}
          >
            <span>🧠</span> Reasoning (추론/CoT) 지원만
          </button>

          <button
            onClick={() => setWebSearchOnly(!webSearchOnly)}
            className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 font-extrabold shadow-sm whitespace-nowrap ${
              webSearchOnly
                ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/20'
                : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-600 hover:bg-blue-200'
            }`}
          >
            <span>🌐</span> 실시간 Web Search 지원만
          </button>

          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 font-extrabold shadow-sm whitespace-nowrap ${
              verifiedOnly
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20'
                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600 hover:bg-emerald-200'
            }`}
          >
            <span>🛡️</span> LiteLLM 검증 모델만
          </button>
          {(reasoningOnly || webSearchOnly || verifiedOnly) && (
            <button
              onClick={() => { setReasoningOnly(false); setWebSearchOnly(false); setVerifiedOnly(false); }}
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 underline ml-2 text-xs font-bold"
            >
              필터 초기화
            </button>
          )}
        </div>
      </div>

      {/* Model Count info + Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 px-2 font-bold">
        <div>
          <span className="font-black text-cyan-600 dark:text-cyan-400 text-base">{sortedModels.length}</span> {t.dashboard.modelsFound}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-700 dark:text-slate-300 text-xs font-black">정렬 기준:</span>
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value as SortKey)}
            className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:border-cyan-500 rounded-xl px-3 py-1.5 text-xs font-extrabold shadow-sm cursor-pointer"
          >
            <option value="arena_elo">🏆 LMSYS Arena Elo 랭킹</option>
            <option value="name">🔤 모델명</option>
            <option value="provider">🏢 프로바이더</option>
            <option value="tier">🎯 티어 (Tier)</option>
            <option value="context">📚 컨텍스트 윈도우</option>
            <option value="input_price">💰 입력 비용 (1M Token)</option>
            <option value="output_price">💸 출력 비용 (1M Token)</option>
          </select>
          <button
            onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-900 dark:text-cyan-300 font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1"
            title={sortDir === 'asc' ? '오름차순' : '내림차순'}
          >
            {sortDir === 'asc' ? '▲ 오름차순' : '▼ 내림차순'}
          </button>
        </div>
      </div>

      {/* VIEW 1: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedModels.map((model) => {
            const isSelected = effectiveCompareIds.includes(model.id);
            return (
              <div
                key={model.id}
                className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-md hover:shadow-xl group"
              >
                <div>
                  {/* Top Bar: Provider & Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {model.provider_name}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {model.supports_reasoning && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40 font-bold" title="Reasoning / CoT 지원">
                          🧠 Reasoning
                        </span>
                      )}
                      {model.supports_web_search && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-500/40 font-bold" title="실시간 웹 검색 통합">
                          🌐 Web Search
                        </span>
                      )}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getTierBadge(
                          model.tier
                        )}`}
                      >
                        {model.tier}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          model.is_open_weight
                            ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30'
                            : 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-500/30'
                        }`}
                      >
                        {model.is_open_weight ? t.dashboard.openWeight : t.dashboard.proprietary}
                      </span>
                    </div>
                  </div>

                  {/* Model Title */}
                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2 tracking-tight">
                    {model.name}
                  </h3>

                  <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-2 mb-4 leading-relaxed font-bold">
                    {model.description}
                  </p>

                  {/* Quota Information Box */}
                  {model.quota && (
                    <div className="bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/40 rounded-xl p-3 mb-4 text-xs shadow-inner">
                      <div className="text-[11px] font-black text-cyan-800 dark:text-cyan-300 mb-1 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        API Rate Limits & Quotas
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-900 dark:text-slate-100 font-extrabold">
                        <div>
                          <span className="text-slate-600 dark:text-slate-400 font-bold">RPM:</span> <span className="text-slate-900 dark:text-white font-black">{model.quota.rpm.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-600 dark:text-slate-400 font-bold">TPM:</span> <span className="text-slate-900 dark:text-white font-black">{(model.quota.tpm / 1000).toLocaleString()}k</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5 bg-slate-100 dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 mb-4 text-xs shadow-inner">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400 block text-[10px] font-bold mb-0.5">{t.dashboard.contextWindow}</span>
                      <span className="font-black text-slate-900 dark:text-white text-sm">
                        {(model.context_window / 1000).toLocaleString()}k tokens
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400 block text-[10px] font-bold mb-0.5">Arena ELO 랭킹</span>
                      <span className="font-black text-amber-600 dark:text-amber-300 text-sm flex items-center gap-1">
                        🏆 {model.benchmarks.arena_elo ? model.benchmarks.arena_elo.toFixed(0) : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Pricing Info */}
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200 dark:border-slate-800 mb-4">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400 text-[10px] block font-bold">{t.dashboard.inputPrice}</span>
                      <span className="font-black text-slate-900 dark:text-slate-100">${model.api_pricing.input_price_per_1m.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-600 dark:text-slate-400 text-[10px] block font-bold">{t.dashboard.outputPrice}</span>
                      <span className="font-black text-slate-900 dark:text-slate-100">${model.api_pricing.output_price_per_1m.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons: Code Snippets, Official Docs & Compare */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setCodeModalModel(model)}
                    className="flex-1 py-2 px-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md flex items-center justify-center gap-1"
                    title="API 연동 코드 스니펫 보기"
                  >
                    <span>⚡</span> API 코드
                  </button>
                  <a
                    href={model.source_docs_url || model.official_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 px-2.5 rounded-xl text-xs font-black bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all border border-slate-300 dark:border-slate-700 shadow-sm"
                  >
                    {t.dashboard.officialDocs}
                  </a>
                  <button
                    onClick={() => handleToggle(model.id)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-black transition-all shadow-md ${
                      isSelected
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 shadow-emerald-600/30'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
                    }`}
                  >
                    {isSelected ? t.dashboard.compared : t.dashboard.compareButton}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: Table Mode */}
      {viewMode === 'table' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('name')}
                  >Model<SortIcon col="name" /></th>
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('provider')}
                  >Provider<SortIcon col="provider" /></th>
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('tier')}
                  >Tier<SortIcon col="tier" /></th>
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('context')}
                  >Context<SortIcon col="context" /></th>
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('input_price')}
                  >Input Price<SortIcon col="input_price" /></th>
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('output_price')}
                  >Output Price<SortIcon col="output_price" /></th>
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('rpm')}
                  >Quota RPM<SortIcon col="rpm" /></th>
                  <th
                    className="py-3.5 px-4 font-semibold cursor-pointer hover:text-cyan-400 select-none transition-colors"
                    onClick={() => handleSort('arena_elo')}
                  >ELO<SortIcon col="arena_elo" /></th>
                  <th className="py-3.5 px-4 font-semibold">Docs</th>
                  <th className="py-3.5 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {sortedModels.map((model) => {
                  const isSelected = effectiveCompareIds.includes(model.id);
                  return (
                    <tr key={model.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-100">
                        {model.name}
                      </td>
                      <td className="py-3 px-4 text-slate-400">{model.provider_name}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${getTierBadge(model.tier)}`}>
                          {model.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-300">
                        {model.context_window > 0 ? `${(model.context_window / 1000).toLocaleString()}k` : '-'}
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400">
                        ${model.api_pricing.input_price_per_1m.toFixed(3)}
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-300">
                        ${model.api_pricing.output_price_per_1m.toFixed(3)}
                      </td>
                      <td className="py-3 px-4 font-mono text-cyan-300 text-xs">
                        {model.quota ? `${model.quota.rpm.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3 px-4 font-mono text-amber-400 text-xs">
                        {model.benchmarks.arena_elo ?? '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCodeModalModel(model)}
                            className="px-2 py-1 bg-purple-900/50 hover:bg-purple-800 text-purple-200 border border-purple-500/40 rounded text-xs font-bold transition-colors whitespace-nowrap"
                            title="API 연동 코드 스니펫 보기"
                          >
                            ⚡ API 코드
                          </button>
                          <a
                            href={model.source_docs_url || model.official_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap"
                          >
                            Docs ↗
                          </a>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggle(model.id)}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {isSelected ? 'Added' : '+ Compare'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: Compact Mode */}
      {viewMode === 'compact' && (
        <div className="space-y-2">
          {sortedModels.map((model) => {
            const isSelected = effectiveCompareIds.includes(model.id);
            return (
              <div
                key={model.id}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-lg p-3 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-slate-500 font-medium w-24 shrink-0 truncate">
                    {model.provider_name}
                  </span>
                  <span className="font-bold text-sm text-slate-100 truncate w-48 sm:w-64">
                    {model.name}
                  </span>
                  <span className={`hidden sm:inline-block text-[10px] px-2 py-0.5 rounded border ${getTierBadge(model.tier)}`}>
                    {model.tier}
                  </span>
                  <span className="hidden md:inline-block text-xs font-mono text-slate-400">
                    Ctx: {(model.context_window / 1000).toLocaleString()}k
                  </span>
                  {model.quota && (
                    <span className="hidden lg:inline-block text-xs font-mono text-cyan-400">
                      Quota: {model.quota.rpm.toLocaleString()} RPM
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setCodeModalModel(model)}
                    className="text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors"
                  >
                    ⚡ API 코드
                  </button>
                  <a
                    href={model.source_docs_url || model.official_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    Docs ↗
                  </a>
                  <span className="font-mono text-xs font-semibold text-emerald-400">
                    ${model.api_pricing.input_price_per_1m.toFixed(2)} <span className="text-slate-500">/ 1M</span>
                  </span>
                  <button
                    onClick={() => handleToggle(model.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isSelected ? 'Added' : '+ Compare'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Code Snippet Modal */}
      <CodeSnippetModal
        model={codeModalModel}
        onClose={() => setCodeModalModel(null)}
      />
    </div>
  );
};
