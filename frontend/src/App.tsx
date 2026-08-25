// 🚀 Cloudflare Workers CI/CD Pipeline Active
import React, { lazy, Suspense, useState, useEffect } from 'react';
import type { ModelSpec, Provider } from './types';
import { fetchModels, fetchProviders } from './api';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppShell } from './components/AppShell';
import { isAppTab, type AppTab } from './navigation/navigationConfig';

const Dashboard = lazy(() => import('./components/Dashboard').then((module) => ({ default: module.Dashboard })));
const CompareView = lazy(() => import('./components/CompareView').then((module) => ({ default: module.CompareView })));
const TCOSimulatorView = lazy(() => import('./components/TCOSimulatorView').then((module) => ({ default: module.TCOSimulatorView })));
const ArchitectureAdvisor = lazy(() => import('./components/ArchitectureAdvisor').then((module) => ({ default: module.ArchitectureAdvisor })));
const TutorialView = lazy(() => import('./components/TutorialView').then((module) => ({ default: module.TutorialView })));
const LeaderboardView = lazy(() => import('./components/LeaderboardView').then((module) => ({ default: module.LeaderboardView })));
const GPUListView = lazy(() => import('./components/GPUListView').then((module) => ({ default: module.GPUListView })));
const NewsPulseView = lazy(() => import('./components/NewsPulseView'));
const TokenizerSandboxView = lazy(() => import('./components/TokenizerSandboxView').then((module) => ({ default: module.TokenizerSandboxView })));
const SpeedMonitorView = lazy(() => import('./components/SpeedMonitorView').then((module) => ({ default: module.SpeedMonitorView })));

export const AppContent: React.FC = () => {
  // URL query parameter ?tab= 및 ?article= 파싱으로 북마크/즐겨찾기 라우팅 초기화
  const getInitialTab = (): AppTab => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const articleParam = params.get('article');
    if (articleParam) return 'news';
    if (isAppTab(tabParam)) {
      return tabParam;
    }
    return 'dashboard';
  };

  const [activeTab, setActiveTabState] = useState<AppTab>(getInitialTab);
  const [models, setModels] = useState<ModelSpec[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Global Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  const handleGlobalSearch = (query: string) => {
    setGlobalSearchQuery(query);
    if (activeTab !== 'dashboard') {
      setActiveTab('dashboard');
    }
  };

  // 탭 변경 시 URL 파라미터 주소창 자동 동기화 (즐겨찾기/링크 공유 가능)
  const setActiveTab = (tab: AppTab) => {
    setActiveTabState(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // 브라우저 뒤로가기/앞으로가기 (popstate) 감지
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      setActiveTabState(isAppTab(tabParam) ? tabParam : 'dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [modelsData, providersData] = await Promise.all([
          fetchModels(),
          fetchProviders(),
        ]);
        setModels(modelsData);
        setProviders(providersData);
      } catch (err: any) {
        setError(err.message || '데이터를 로드하는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleToggleCompare = (modelId: string) => {
    setSelectedModelIds((prev) =>
      prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId]
    );
  };

  const handleClearCompare = () => {
    setSelectedModelIds([]);
  };

  return (
    <AppShell activeTab={activeTab} onNavigate={setActiveTab} compareCount={selectedModelIds.length} globalSearchQuery={globalSearchQuery} onGlobalSearch={handleGlobalSearch}>
        <main className="flex-1 max-w-[var(--content-max)] w-full mx-auto px-2.5 sm:px-6 py-4 sm:py-8 mobile-safe-bottom" aria-busy={loading || undefined}>
          {loading && models.length === 0 ? (
            <div>
              <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[0, 1, 2].map((item) => <div key={item} className="h-48 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 animate-pulse" />)}
              </div>
              <p className="sr-only">LLM COMPASS Loading...</p>
            </div>
          ) : error ? (
            <div className="glass-card max-w-md mx-auto p-8 text-center rounded-2xl border border-red-500/30">
              <h2 className="text-xl font-bold text-red-500 mb-2">Error Occurred</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="touch-target focus-ring px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold text-white">Retry</button>
            </div>
          ) : <Suspense fallback={<div role="status" className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="화면 불러오는 중"><div className="h-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-900" /><div className="h-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-900" /></div>}>
          {activeTab === 'dashboard' && (
            <Dashboard
              models={models}
              providers={providers}
              selectedModelIds={selectedModelIds}
              onToggleCompare={handleToggleCompare}
              onClearCompare={handleClearCompare}
              onGoToCompare={() => setActiveTab('compare')}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {activeTab === 'compare' && (
            <CompareView
              models={models}
              selectedModelIds={selectedModelIds}
              onToggleCompare={handleToggleCompare}
              onGoToDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'tco' && <TCOSimulatorView models={models} />}

          {activeTab === 'advisor' && <ArchitectureAdvisor />}

          {activeTab === 'tutorial' && <TutorialView />}

          {activeTab === 'leaderboard' && <LeaderboardView models={models} />}

          {activeTab === 'gpus' && <GPUListView />}
          
          {activeTab === 'news' && <NewsPulseView />}

          {activeTab === 'sandbox' && (
            <TokenizerSandboxView
              models={models}
              onToggleCompare={handleToggleCompare}
              selectedModelIds={selectedModelIds}
            />
          )}

          {activeTab === 'speed' && <SpeedMonitorView />}
          </Suspense>}
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© 2026 LLM COMPASS - Global AI Model Spec & TCO Analytics Platform</p>
            <p className="text-slate-600">Supported Languages: 🇰🇷 한국어 | 🇺🇸 English | 🇯🇵 日本語 | 🇨🇳 中文</p>
          </div>
        </footer>
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
