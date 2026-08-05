import React, { useState, useEffect } from 'react';
import type { ModelSpec, Provider } from './types';
import { fetchModels, fetchProviders } from './api';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { TCOSimulatorView } from './components/TCOSimulatorView';
import { CompareView } from './components/CompareView';
import { LeaderboardView } from './components/LeaderboardView';
import { GPUListView } from './components/GPUListView';
import { ArchitectureAdvisor } from './components/ArchitectureAdvisor';
import { TutorialView } from './components/TutorialView';
import NewsPulseView from './components/NewsPulseView';

export const AppContent: React.FC = () => {
  // URL query parameter ?tab= 파싱으로 북마크/즐겨찾기 라우팅 초기화
  const getInitialTab = () => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['dashboard', 'compare', 'tco', 'advisor', 'tutorial', 'leaderboard', 'gpus', 'news'].includes(tabParam)) {
      return tabParam;
    }
    return 'dashboard';
  };

  const [activeTab, setActiveTabState] = useState<string>(getInitialTab);
  const [models, setModels] = useState<ModelSpec[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 탭 변경 시 URL 파라미터 주소창 자동 동기화 (즐겨찾기/링크 공유 가능)
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());
  };

  // 브라우저 뒤로가기/앞으로가기 (popstate) 감지
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') || 'dashboard';
      setActiveTabState(tabParam);
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

  // non-blocking non-freeze 렌더링: loading 상태여도 메인 UI 화면을 0초만에 노출
  if (loading && models.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">LLM COMPASS Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="glass-card max-w-md p-8 text-center rounded-2xl border border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Occurred</h2>
          <p className="text-slate-300 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={selectedModelIds.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            models={models}
            providers={providers}
            selectedModelIds={selectedModelIds}
            onToggleCompare={handleToggleCompare}
            onClearCompare={handleClearCompare}
            onGoToCompare={() => setActiveTab('compare')}
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

        {activeTab === 'gpus' && (
          <GPUListView />
        )}
        
        {activeTab === 'news' && <NewsPulseView />}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 LLM COMPASS - Global AI Model Spec & TCO Analytics Platform</p>
          <p className="text-slate-600">Supported Languages: 🇰🇷 한국어 | 🇺🇸 English | 🇯🇵 日本語 | 🇨🇳 中文</p>
        </div>
      </footer>
    </div>
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
