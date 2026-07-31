import React from 'react';
import { Compass, LayoutGrid, ArrowLeftRight, Calculator, Trophy, Cpu, Globe, Sparkles, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import type { Language } from '../i18n/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  compareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, compareCount }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div className="shrink-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-100 tracking-wide whitespace-nowrap">
                LLM COMPASS
              </h1>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono whitespace-nowrap">
                2026 i18n
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden lg:block whitespace-nowrap">
              {t.nav.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0 text-cyan-400" />
            <span className="whitespace-nowrap">{t.nav.catalog}</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all relative whitespace-nowrap shrink-0 ${
              activeTab === 'compare'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4 shrink-0 text-cyan-400" />
            <span className="whitespace-nowrap">{t.nav.compare}</span>
            {compareCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center shadow-sm">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tco')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'tco'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0 text-cyan-400" />
            <span className="whitespace-nowrap">{t.nav.tco}</span>
          </button>

          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'advisor'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-indigo-400" />
            <span className="whitespace-nowrap">{t.nav.advisor}</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'leaderboard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Trophy className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="whitespace-nowrap">{t.nav.leaderboard}</span>
          </button>

          <button
            onClick={() => setActiveTab('gpus')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'gpus'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0 text-purple-400" />
            <span className="whitespace-nowrap">{t.nav.gpus}</span>
          </button>
        </nav>

        {/* Language Selector Dropdown & Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-indigo-500/50 transition-all shadow-sm flex items-center justify-center shrink-0"
            title={theme === 'dark' ? '화사한 라이트 모드로 변경' : '다크 모드로 변경'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          <div className="relative flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-xs text-slate-200 shrink-0">
            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-slate-100 text-xs font-bold focus:outline-none cursor-pointer pr-1"
            >
              <option value="ko" className="bg-slate-900 text-slate-100">🇰🇷 한국어</option>
              <option value="en" className="bg-slate-900 text-slate-100">🇺🇸 English</option>
              <option value="ja" className="bg-slate-900 text-slate-100">🇯🇵 日本語</option>
              <option value="zh" className="bg-slate-900 text-slate-100">🇨🇳 中文</option>
              <option value="es" className="bg-slate-900 text-slate-100">🇪🇸 Español</option>
              <option value="de" className="bg-slate-900 text-slate-100">🇩🇪 Deutsch</option>
              <option value="fr" className="bg-slate-900 text-slate-100">🇫🇷 Français</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
