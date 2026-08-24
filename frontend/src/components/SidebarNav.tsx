import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NAV_GROUPS, type AppTab } from '../navigation/navigationConfig';

interface SidebarNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  compareCount: number;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
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
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('button')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('button, a, input, select, [tabindex]:not([tabindex="-1"])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [mobileOpen, setMobileOpen]);

  const handleTabClick = (tab: AppTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

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
          aria-label="메뉴 닫기"
          className="md:hidden p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <nav aria-label="주요 메뉴" className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span>{group.label}</span>
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                const label = t.nav[item.labelKey];
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    title={isCollapsed ? label : undefined}
                    aria-current={isActive ? 'page' : undefined}
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
                      <Icon className="w-4 h-4" />
                    </span>
                    {!isCollapsed && (
                      <span className="truncate flex-1 text-left tracking-tight font-extrabold">{label}</span>
                    )}

                    {/* Badges */}
                    {!isCollapsed && item.badge === 'compare' && compareCount > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-100 text-indigo-700 dark:bg-cyan-500/20 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-500/30'
                      }`}>
                        {compareCount}
                      </span>
                    )}
                    {!isCollapsed && item.badge === 'new' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm">
                        NEW
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

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
          <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="전체 메뉴" className="relative w-64 max-w-[80vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
