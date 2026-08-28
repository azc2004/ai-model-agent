import { describe, it, expect, vi, beforeEach } from 'vitest';
import { track } from './analytics';

describe('analytics.track', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(null, { status: 204 }))));
  });

  it('persists a session id across calls', () => {
    track('page_view', { tab: 'dashboard' });
    const first = localStorage.getItem('llmc_sid');
    expect(first).toBeTruthy();
    track('page_view', { tab: 'compare' });
    expect(localStorage.getItem('llmc_sid')).toBe(first);
  });

  it('posts to the tracking endpoint with the session id and event type', () => {
    track('search', { label: 'gpt-4' });
    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/analytics/track',
      expect.objectContaining({ method: 'POST', keepalive: true })
    );
    const body = JSON.parse((fetch as any).mock.calls[0][1].body);
    expect(body).toMatchObject({ event_type: 'search', label: 'gpt-4' });
    expect(body.session_id).toBeTruthy();
  });

  it('never throws even if fetch is unavailable', () => {
    vi.stubGlobal('fetch', undefined);
    expect(() => track('news_open', { label: 'x' })).not.toThrow();
  });
});
