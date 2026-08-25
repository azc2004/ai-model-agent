import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface ResponsiveColumn<T> {
  key: string;
  header: React.ReactNode;
  render: (row: T, index: number) => React.ReactNode;
  numeric?: boolean;
  priority: 'primary' | 'secondary';
}

interface ResponsiveDataTableProps<T> {
  rows: T[];
  columns: ResponsiveColumn<T>[];
  getRowId: (row: T) => React.Key;
  caption?: string;
}

export function ResponsiveDataTable<T>({ rows, columns, getRowId, caption = '분석 데이터' }: ResponsiveDataTableProps<T>) {
  const [expanded, setExpanded] = useState<Set<React.Key>>(new Set());
  const primary = columns.filter((column) => column.priority === 'primary');
  const secondary = columns.filter((column) => column.priority === 'secondary');
  const toggle = (id: React.Key) => setExpanded((current) => {
    const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next;
  });

  return <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <p className="sr-only" id="table-scroll-hint">표는 좌우로 스크롤할 수 있습니다.</p>
    <div className="overflow-x-auto" aria-describedby="table-scroll-hint" tabIndex={0}>
      <table className="w-full min-w-[680px] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800"><tr>{columns.map((column, index) => <th key={column.key} scope="col" className={`${index === 0 ? 'sticky left-0 z-20 bg-slate-100 dark:bg-slate-800' : ''} ${column.numeric ? 'text-right' : ''} p-4 text-xs font-black`}>{column.header}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">{rows.map((row, rowIndex) => <tr key={getRowId(row)}>{columns.map((column, columnIndex) => <td key={column.key} className={`${columnIndex === 0 ? 'sticky left-0 bg-white dark:bg-slate-900' : ''} ${column.numeric ? 'numeric text-right' : ''} p-4 text-sm`}>{column.render(row, rowIndex)}</td>)}</tr>)}</tbody>
      </table>
    </div>
    {secondary.length > 0 && <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">{rows.map((row, index) => {
      const id = getRowId(row); const open = expanded.has(id);
      return <article key={id} className="p-4">
        <div className="flex items-center justify-between gap-3"><div>{primary.map((column) => <div key={column.key}>{column.render(row, index)}</div>)}</div><button className="touch-target focus-ring flex items-center gap-1 text-xs font-bold" aria-expanded={open} onClick={() => toggle(id)}>{open ? '상세 지표 닫기' : '상세 지표 보기'}{open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button></div>
        {open && <dl className="mt-3 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-950">{secondary.map((column) => <div key={column.key}><dt className="text-xs text-slate-500">{column.header}</dt><dd className={column.numeric ? 'numeric text-right font-bold' : 'font-bold'}>{column.render(row, index)}</dd></div>)}</dl>}
      </article>;
    })}</div>}
  </div>;
}
