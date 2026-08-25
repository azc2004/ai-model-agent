import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export interface CatalogFilters {
  provider: string;
  tier: string;
  license: string;
  reasoningOnly: boolean;
  webSearchOnly: boolean;
  verifiedOnly: boolean;
  onlyNew: boolean;
}

export const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  provider: 'all', tier: 'all', license: 'all', reasoningOnly: false,
  webSearchOnly: false, verifiedOnly: false, onlyNew: false,
};

interface FilterSheetProps {
  open: boolean;
  filters: CatalogFilters;
  providers: Array<{ id: string; name: string }>;
  onApply: (filters: CatalogFilters) => void;
  onClear: () => void;
  onClose: () => void;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({ open, filters, providers, onApply, onClear, onClose }) => {
  const [draft, setDraft] = useState(filters);
  useEffect(() => { if (open) setDraft(filters); }, [open, filters]);
  if (!open) return null;

  const set = <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => setDraft((current) => ({ ...current, [key]: value }));
  return <div className="md:hidden fixed inset-0 z-50 flex items-end" role="dialog" aria-modal="true" aria-label="모델 필터">
    <button className="absolute inset-0 bg-slate-950/50" aria-label="필터 닫기" onClick={onClose} />
    <section className="relative w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white dark:bg-slate-950 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl">
      <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-black">모델 필터</h2><button className="touch-target focus-ring grid place-items-center" aria-label="필터 닫기" onClick={onClose}><X /></button></div>
      <div className="grid gap-4">
        <label className="grid gap-1 text-sm font-bold">프로바이더<select className="touch-target rounded-xl border p-2 dark:bg-slate-900" value={draft.provider} onChange={(e) => set('provider', e.target.value)}><option value="all">전체</option>{providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}</select></label>
        <label className="grid gap-1 text-sm font-bold">모델 등급<select className="touch-target rounded-xl border p-2 dark:bg-slate-900" value={draft.tier} onChange={(e) => set('tier', e.target.value)}><option value="all">전체</option>{['Frontier', 'Mid', 'Small', 'Micro'].map((tier) => <option key={tier}>{tier}</option>)}</select></label>
        <label className="grid gap-1 text-sm font-bold">라이선스<select className="touch-target rounded-xl border p-2 dark:bg-slate-900" value={draft.license} onChange={(e) => set('license', e.target.value)}><option value="all">전체</option><option value="open">오픈 웨이트</option><option value="proprietary">상용</option></select></label>
        {([['onlyNew', '신규 모델'], ['reasoningOnly', '추론 지원'], ['webSearchOnly', '웹 검색 지원'], ['verifiedOnly', '검증된 모델']] as const).map(([key, label]) => <label key={key} className="touch-target flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={draft[key]} onChange={(e) => set(key, e.target.checked)} />{label}</label>)}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3"><button className="touch-target rounded-xl border font-bold" onClick={() => { setDraft(EMPTY_CATALOG_FILTERS); onClear(); }}>초기화</button><button className="touch-target rounded-xl bg-indigo-600 font-black text-white" onClick={() => onApply(draft)}>필터 적용</button></div>
    </section>
  </div>;
};
