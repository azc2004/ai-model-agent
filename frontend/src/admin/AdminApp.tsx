import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CountRow { label: string; count: number }
interface DailyRow { day: string; events: number; sessions: number }
interface Summary {
  days: number;
  totals: { events: number; sessions: number };
  daily: DailyRow[];
  top_tabs: CountRow[];
  top_searches: CountRow[];
  top_compared: CountRow[];
  device_breakdown: CountRow[];
  country_breakdown: CountRow[];
  top_external_links: CountRow[];
  top_news: CountRow[];
}

const RANGE_OPTIONS = [7, 14, 30] as const;

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-bold text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-black text-slate-900 numeric">{value}</div>
    </div>
  );
}

function RankedList({ title, rows, emptyLabel = '데이터 없음' }: { title: string; rows: CountRow[]; emptyLabel?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-black text-slate-900">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-xs text-slate-400">{emptyLabel}</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="truncate font-semibold text-slate-700">{row.label}</span>
              <span className="numeric shrink-0 font-black text-indigo-600">{row.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const AdminApp: React.FC = () => {
  const [days, setDays] = useState<number>(7);
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE_URL}/admin/analytics/summary?days=${days}`)
      .then((res) => {
        if (res.status === 401) throw new Error('인증이 필요합니다. 페이지를 새로고침해 로그인하세요.');
        if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
        return res.json();
      })
      .then((json) => { if (!cancelled) setData(json); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [days]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black">📊 이용현황 & 고객행동 모니터링</h1>
            <p className="text-xs text-slate-500">LLM COMPASS 내부 어드민 · 개인정보 없이 세션 단위로만 집계</p>
          </div>
          <div className="flex gap-1.5 rounded-xl border border-slate-200 bg-white p-1">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setDays(option)}
                className={`touch-target focus-ring rounded-lg px-3 py-1.5 text-xs font-black transition ${
                  days === option ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                최근 {option}일
              </button>
            ))}
          </div>
        </header>

        {loading && <p className="text-sm text-slate-500">불러오는 중…</p>}
        {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}

        {data && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <KpiCard label="총 이벤트" value={data.totals.events} />
              <KpiCard label="순 방문 세션" value={data.totals.sessions} />
              <KpiCard
                label="세션당 평균 이벤트"
                value={data.totals.sessions > 0 ? (data.totals.events / data.totals.sessions).toFixed(1) : '0'}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-black text-slate-900">일별 추이</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data.daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="events" name="이벤트" stroke="#4f46e5" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sessions" name="세션" stroke="#06b6d4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-sm font-black text-slate-900">메뉴별 조회수</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={data.top_tabs} layout="vertical" margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                    <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={90} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <RankedList title="🔍 인기 검색어" rows={data.top_searches} />
              <RankedList title="⚖️ 많이 비교한 모델" rows={data.top_compared} />
              <RankedList title="📰 많이 읽은 기사" rows={data.top_news} />
              <RankedList title="🔗 많이 클릭한 공식 문서" rows={data.top_external_links} />

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-3 text-sm font-black text-slate-900">디바이스 비중</h3>
                <ul className="space-y-2">
                  {data.device_breakdown.map((row) => (
                    <li key={row.label} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{row.label === 'mobile' ? '📱 모바일' : '🖥️ 데스크톱'}</span>
                      <span className="numeric font-black text-indigo-600">{row.count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <RankedList title="🌍 접속 국가" rows={data.country_breakdown} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
