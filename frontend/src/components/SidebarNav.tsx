import React from 'react';
import {
  LayoutGrid,
  ArrowLeftRight,
  Calculator,
  Trophy,
  Cpu,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  compareCount: number;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | null;
  badgeText?: string;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { t } = useLanguage();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const navCategories: NavCategory[] = [
    {
      title: "📌 메인 카탈로그",
      items: [
        { id: "dashboard", label: t.nav.catalog, icon: <LayoutGrid className="w-4 h-4" /> },
        { id: "compare", label: t.nav.compare, icon: <ArrowLeftRight className="w-4 h-4" />, badge: compareCount > 0 ? compareCount : null },
        { id: "leaderboard", label: t.nav.leaderboard, icon: <Trophy className="w-4 h-4 text-amber-500" /> },
      ]
    },
    {
      title: "🧮 샌드박스 & 시뮬레이터",
      items: [
        { id: "sandbox", label: t.nav.sandbox, icon: <span className="text-sm">🧮</span> },
        { id: "tco", label: t.nav.tco, icon: <Calculator className="w-4 h-4" /> },
        { id: "speed", label: t.nav.speed, icon: <span className="text-sm">⚡</span> },
        { id: "gpus", label: t.nav.gpus, icon: <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" /> },
      ]
    },
    {
      title: "🔮 AI 솔루션 & 리포트",
      items: [
        { id: "advisor", label: t.nav.advisor, icon: <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> },
        { id: "news", label: t.nav.news, icon: <span className="text-sm">📰</span>, badgeText: "NEW" },
        { id: "tutorial", label: t.nav.tutorial, icon: <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" /> },
      ]
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-r border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-lg">
      {/* Top Header inside Sidebar */}
      <div className="p-4 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => handleTabClick('dashboard')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-xs">
                LC
              </div>
            </div>
            <div>
              <span className="font-black text-sm text-slate-900 dark:text-white tracking-wide block">LLM COMPASS</span>
              <span className="text-[10px] text-indigo-600 dark:text-cyan-400 font-extrabold font-mono">2026 BRIGHT V3</span>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-0.5 mx-auto cursor-pointer" onClick={() => handleTabClick('dashboard')}>
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-xs">
              LC
            </div>
          </div>
        )}

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
        {navCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span>{cat.title}</span>
              </h3>
            )}
            <div className="space-y-1">
              {cat.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 relative group ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-cyan-500/20 text-indigo-600 dark:text-cyan-300 border border-indigo-200 dark:border-cyan-500/40 shadow-sm font-black'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 border border-transparent'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-600 dark:bg-cyan-400 rounded-r-full shadow-sm" />
                    )}

                    <span className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="truncate flex-1 text-left tracking-tight font-extrabold">{item.label}</span>
                    )}

                    {/* Badges */}
                    {!isCollapsed && item.badge !== undefined && item.badge !== null && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-100 text-indigo-700 dark:bg-cyan-500/20 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {!isCollapsed && item.badgeText && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm">
                        {item.badgeText}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Collapse Toggle (Desktop only) */}
      <div className="hidden md:block p-3 border-t border-slate-200/80 dark:border-white/10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all font-bold"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
              <span>메뉴 접기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 h-screen z-40 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
