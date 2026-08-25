import React, { useState } from 'react';

interface AnalysisWorkspaceProps {
  input: React.ReactNode;
  summary: React.ReactNode;
  details?: React.ReactNode;
  action?: { label: string; busyLabel?: string; onClick: () => void };
  busy?: boolean;
}

export const AnalysisWorkspace: React.FC<AnalysisWorkspaceProps> = ({ input, summary, details, action, busy = false }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900" aria-label="분석 조건">{input}</section>
    <section className="space-y-4 lg:sticky lg:top-20" aria-label="분석 결과">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">{summary}</div>
      {details && <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><button type="button" aria-expanded={detailsOpen} className="touch-target focus-ring flex w-full items-center font-black" onClick={() => setDetailsOpen((value) => !value)}>{detailsOpen ? '계산 근거 접기' : '계산 근거 펼치기'}</button>{detailsOpen && <div className="pt-4">{details}</div>}</div>}
    </section>
    {action && <button type="button" disabled={busy} onClick={action.onClick} className="touch-target focus-ring fixed bottom-24 left-4 right-4 z-30 rounded-xl bg-indigo-600 font-black text-white shadow-xl disabled:cursor-wait disabled:opacity-60 lg:static lg:col-start-1">{busy ? action.busyLabel ?? '처리 중' : action.label}</button>}
  </div>
  );
};
