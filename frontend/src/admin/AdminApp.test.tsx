import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { AdminApp } from './AdminApp';

afterEach(cleanup);

const SUMMARY = {
  days: 7,
  totals: { events: 12, sessions: 4 },
  daily: [{ day: '2026-08-28', events: 12, sessions: 4 }],
  top_tabs: [{ label: 'dashboard', count: 8 }],
  top_searches: [{ label: 'gpt-4', count: 2 }],
  top_compared: [{ label: 'gpt-4o', count: 3 }],
  device_breakdown: [{ label: 'desktop', count: 9 }, { label: 'mobile', count: 3 }],
  country_breakdown: [{ label: 'KR', count: 12 }],
  top_external_links: [],
  top_news: [],
};

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(JSON.stringify(SUMMARY), { status: 200 }))));
});

test('renders KPI totals from the summary endpoint', async () => {
  render(<AdminApp />);
  await waitFor(() => expect(screen.getByText('총 이벤트')).toBeInTheDocument());
  expect(screen.getByText('순 방문 세션')).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith('/api/v1/admin/analytics/summary?days=7');
});

test('re-fetches when the date range changes', async () => {
  render(<AdminApp />);
  await waitFor(() => expect(screen.getByText('총 이벤트')).toBeInTheDocument());
  await userEvent.click(screen.getByRole('button', { name: '최근 30일' }));
  await waitFor(() => expect(fetch).toHaveBeenLastCalledWith('/api/v1/admin/analytics/summary?days=30'));
});

test('shows a readable message on 401', async () => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(null, { status: 401 }))));
  render(<AdminApp />);
  await waitFor(() => expect(screen.getByText(/인증이 필요합니다/)).toBeInTheDocument());
});
