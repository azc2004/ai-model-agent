import React from 'react';

import { useLanguage } from '../context/LanguageContext';
import { MOBILE_PRIMARY_TABS, NAV_GROUPS, type AppTab } from '../navigation/navigationConfig';

interface MobileBottomNavProps {
  activeTab: AppTab;
  onNavigate: (tab: AppTab) => void;
  compareCount: number;
}

const primaryItems = MOBILE_PRIMARY_TABS.map((id) =>
  NAV_GROUPS.flatMap((group) => group.items).find((item) => item.id === id)!,
);

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onNavigate, compareCount }) => {
  const { t } = useLanguage();

  return (
    <nav aria-label="모바일 주요 메뉴" className="pb-safe md:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
      {primaryItems.map((item) => {
        const Icon = item.icon;
        const label = t.nav[item.labelKey];
        const active = activeTab === item.id;
        return (
          <a
            key={item.id}
            href={`?tab=${item.id}`}
            aria-current={active ? 'page' : undefined}
            onClick={(event) => { event.preventDefault(); onNavigate(item.id); }}
            className={`touch-target focus-ring relative flex flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-bold ${active ? 'text-indigo-600 dark:text-cyan-400' : 'text-muted'}`}
          >
            <Icon className="h-5 w-5" />
            <span className="w-full truncate px-0.5 text-center leading-tight">{label}</span>
            {item.id === 'compare' && compareCount > 0 && <span aria-label={`${compareCount}개 선택`} className="absolute top-1 right-1/4 rounded-full bg-indigo-600 px-1 text-[9px] text-white">{compareCount}</span>}
          </a>
        );
      })}
    </nav>
  );
};
