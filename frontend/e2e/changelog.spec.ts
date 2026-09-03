import { expect, test } from '@playwright/test';
import { stubCatalog } from './fixtures';

// 라벨은 언어에 따라 달라진다. 브라우저 기본값(en)에 기대면 한국어 검사가 실패하므로
// 검사할 언어를 항상 명시한다.
const useLang = (page: import('@playwright/test').Page, lang: string) =>
  page.addInitScript((l) => localStorage.setItem('llm_compass_lang', l), lang);

const entry = (periodEnd: string) => ([{
  id: 'changelog-2026-09-02', period_start: '2026-08-26', period_end: periodEnd,
  title: '화면 표시 오류 수정 및 주간 리포트 기능 추가',
  summary: '요약문', items: [{ category: '개선', text: '빨라졌습니다' }],
  created_at: periodEnd,
}]);

const emptyNews = { articles: [], total_count: 0, last_updated: '' };

test('푸터에서 업데이트 노트로 갈 수 있다', async ({ page }) => {
  test.setTimeout(120_000);
  await useLang(page, 'ko');
  await stubCatalog(page);
  await page.goto('/?tab=dashboard');
  const link = page.getByRole('link', { name: '업데이트 노트' });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', /\/changelog\?lang=ko/);
});

test('최근 업데이트가 있으면 뉴스 탭에 배너가 뜬다', async ({ page }) => {
  test.setTimeout(120_000);
  await useLang(page, 'ko');
  await stubCatalog(page);
  const recent = new Date(Date.now() - 2 * 86_400_000).toISOString().slice(0, 10);
  await page.route('**/api/v1/changelog*', (r) => r.fulfill({ json: entry(recent) }));
  await page.route('**/api/v1/news/pulse*', (r) => r.fulfill({ json: emptyNews }));
  await page.goto('/?tab=news');
  const banner = page.getByRole('link', { name: /화면 표시 오류 수정/ });
  await expect(banner).toBeVisible({ timeout: 15_000 });
  await expect(banner).toHaveAttribute('href', /\/changelog\/changelog-2026-09-02/);
});

// 오래된 소식을 '새로워진 점' 으로 띄우면 관리되고 있다는 인상이 아니라 그 반대를 준다.
test('2주 지난 업데이트는 배너를 띄우지 않는다', async ({ page }) => {
  test.setTimeout(120_000);
  await useLang(page, 'ko');
  await stubCatalog(page);
  await page.route('**/api/v1/changelog*', (r) => r.fulfill({ json: entry('2026-01-01') }));
  await page.route('**/api/v1/news/pulse*', (r) => r.fulfill({ json: emptyNews }));
  await page.goto('/?tab=news');
  await page.waitForTimeout(2500);
  await expect(page.getByRole('link', { name: /화면 표시 오류 수정/ })).toHaveCount(0);
});
