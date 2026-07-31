import React, { useState, useEffect } from 'react';
import type { ModelSpec, Provider } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');

  // View Mode: 'grid' | 'table' | 'compact'
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'compact'>('grid');

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
          fetch('http://localhost:8000/api/v1/models'),
          fetch('http://localhost:8000/api/v1/providers')
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

    return matchesSearch && matchesProvider && matchesTier && matchesLicense;
  });

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
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-3">
          {t.dashboard.title}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          {t.dashboard.subtitle}
        </p>
      </div>

      {/* Filter & View Mode Controls Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={t.dashboard.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
          <svg
            className="w-4 h-4 text-slate-500 absolute left-3 top-3"
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

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
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
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
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
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">{t.dashboard.allLicenses}</option>
            <option value="open">{t.dashboard.openWeight}</option>
            <option value="proprietary">{t.dashboard.proprietary}</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 border border-slate-800 rounded-lg ml-auto md:ml-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              {t.viewMode.grid}
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t.viewMode.table}
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'compact'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
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

      {/* Model Count info */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 px-2">
        <div>
          <span className="font-bold text-cyan-400">{filteredModels.length}</span> {t.dashboard.modelsFound}
        </div>
        <div className="text-slate-500 italic">
          Showing Official API Specs, Rate Limit Quotas & Official Docs Source Links
        </div>
      </div>

      {/* VIEW 1: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => {
            const isSelected = effectiveCompareIds.includes(model.id);
            return (
              <div
                key={model.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-cyan-950/30 group"
              >
                <div>
                  {/* Top Bar: Provider & Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {model.provider_name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${getTierBadge(
                          model.tier
                        )}`}
                      >
                        {model.tier}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          model.is_open_weight
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                        }`}
                      >
                        {model.is_open_weight ? t.dashboard.openWeight : t.dashboard.proprietary}
                      </span>
                    </div>
                  </div>

                  {/* Model Title */}
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                    {model.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {model.description}
                  </p>

                  {/* Quota Information Box */}
                  {model.quota && (
                    <div className="bg-slate-950/70 border border-cyan-900/30 rounded-lg p-2.5 mb-4 text-xs">
                      <div className="text-[11px] font-semibold text-cyan-400 mb-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        API Rate Limits & Quotas
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                        <div>
                          <span className="text-slate-500">RPM:</span> {model.quota.rpm.toLocaleString()}
                        </div>
                        <div>
                          <span className="text-slate-500">TPM:</span> {(model.quota.tpm / 1000).toLocaleString()}k
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80 mb-4 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">{t.dashboard.contextWindow}</span>
                      <span className="font-semibold text-slate-200">
                        {(model.context_window / 1000).toLocaleString()}k tokens
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Arena ELO</span>
                      <span className="font-semibold text-amber-400">
                        {model.benchmarks.arena_elo || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">{t.dashboard.inputPrice}</span>
                      <span className="font-semibold text-emerald-400">
                        ${model.api_pricing.input_price_per_1m.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">{t.dashboard.outputPrice}</span>
                      <span className="font-semibold text-emerald-400">
                        ${model.api_pricing.output_price_per_1m.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons: Official Docs & Compare */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  <a
                    href={model.source_docs_url || model.official_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60"
                  >
                    {t.dashboard.officialDocs}
                  </a>
                  <button
                    onClick={() => handleToggle(model.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-900/20'
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
                  <th className="py-3.5 px-4 font-semibold">Model</th>
                  <th className="py-3.5 px-4 font-semibold">Provider</th>
                  <th className="py-3.5 px-4 font-semibold">Tier</th>
                  <th className="py-3.5 px-4 font-semibold">Context</th>
                  <th className="py-3.5 px-4 font-semibold">API Input / Output</th>
                  <th className="py-3.5 px-4 font-semibold">Quota (RPM / TPM)</th>
                  <th className="py-3.5 px-4 font-semibold">Official Source</th>
                  <th className="py-3.5 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredModels.map((model) => {
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
                        {(model.context_window / 1000).toLocaleString()}k
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400">
                        ${model.api_pricing.input_price_per_1m.toFixed(2)} / ${model.api_pricing.output_price_per_1m.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-mono text-cyan-300 text-xs">
                        {model.quota ? `${model.quota.rpm.toLocaleString()} RPM | ${(model.quota.tpm / 1000).toLocaleString()}k TPM` : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={model.source_docs_url || model.official_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          Docs ↗
                        </a>
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
          {filteredModels.map((model) => {
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
    </div>
  );
};
