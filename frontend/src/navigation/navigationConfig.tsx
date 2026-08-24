import {
  ArrowLeftRight,
  BookOpen,
  Braces,
  Calculator,
  Cpu,
  Gauge,
  LayoutGrid,
  Newspaper,
  Sparkles,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

export type AppTab =
  | 'dashboard'
  | 'compare'
  | 'tco'
  | 'advisor'
  | 'tutorial'
  | 'leaderboard'
  | 'gpus'
  | 'news'
  | 'sandbox'
  | 'speed';

export type NavLabelKey =
  | 'catalog'
  | 'compare'
  | 'tco'
  | 'advisor'
  | 'tutorial'
  | 'leaderboard'
  | 'gpus'
  | 'news'
  | 'sandbox'
  | 'speed';

export interface NavItem {
  id: AppTab;
  labelKey: NavLabelKey;
  icon: LucideIcon;
  badge?: 'compare' | 'new';
}

export interface NavGroup {
  id: 'catalog' | 'tools' | 'insights';
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'catalog',
    label: '메인 카탈로그',
    items: [
      { id: 'dashboard', labelKey: 'catalog', icon: LayoutGrid },
      { id: 'compare', labelKey: 'compare', icon: ArrowLeftRight, badge: 'compare' },
      { id: 'leaderboard', labelKey: 'leaderboard', icon: Trophy },
    ],
  },
  {
    id: 'tools',
    label: '샌드박스 & 시뮬레이터',
    items: [
      { id: 'sandbox', labelKey: 'sandbox', icon: Braces },
      { id: 'tco', labelKey: 'tco', icon: Calculator },
      { id: 'speed', labelKey: 'speed', icon: Gauge },
      { id: 'gpus', labelKey: 'gpus', icon: Cpu },
    ],
  },
  {
    id: 'insights',
    label: 'AI 솔루션 & 리포트',
    items: [
      { id: 'advisor', labelKey: 'advisor', icon: Sparkles },
      { id: 'news', labelKey: 'news', icon: Newspaper, badge: 'new' },
      { id: 'tutorial', labelKey: 'tutorial', icon: BookOpen },
    ],
  },
];

export const MOBILE_PRIMARY_TABS: AppTab[] = ['dashboard', 'compare', 'news', 'tco'];

export const isAppTab = (value: string | null): value is AppTab =>
  NAV_GROUPS.some((group) => group.items.some((item) => item.id === value));
