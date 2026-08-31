// 익명 사용 로그. 개인 식별 정보는 보내지 않는다 — 세션 단위 UUID만 로컬에 저장.
import { API_BASE_URL } from './api';
export type AnalyticsEvent = 'page_view' | 'search' | 'compare_add' | 'compare_remove' | 'external_link_click' | 'news_open';

let cachedSessionId: string | null = null;

function getSessionId(): string {
  if (cachedSessionId) return cachedSessionId;
  try {
    const key = 'llmc_sid';
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    cachedSessionId = id;
    return id;
  } catch {
    // 프라이빗 브라우징 등 localStorage 차단 시에도 이번 페이지뷰 동안은 세션을 유지
    cachedSessionId = crypto.randomUUID();
    return cachedSessionId;
  }
}

export function track(eventType: AnalyticsEvent, options: { tab?: string; label?: string } = {}): void {
  try {
    const payload = JSON.stringify({
      session_id: getSessionId(),
      event_type: eventType,
      tab: options.tab,
      label: options.label,
      device: window.innerWidth < 768 ? 'mobile' : 'desktop',
    });
    fetch(`${API_BASE_URL}/analytics/track`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
  } catch {
    // 추적 실패가 실제 기능을 막으면 안 된다
  }
}
