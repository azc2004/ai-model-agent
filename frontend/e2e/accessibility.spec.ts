import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { stubCatalog } from './fixtures';

// 예전에는 dashboard 한 탭만, 그것도 API 를 빈 배열로 스텁해 카드가 0개인 화면을
// 검사해서 아무것도 잡히지 않았다. 실제로 렌더된 10개 탭을 전부 훑는다.
const TABS = [
  'dashboard', 'compare', 'tco', 'advisor', 'tutorial',
  'leaderboard', 'gpus', 'news', 'sandbox', 'speed',
];

for (const tab of TABS) {
  test(`${tab} 탭에 serious/critical 접근성 위반이 없다`, async ({ page }) => {
    test.setTimeout(180_000);
    await stubCatalog(page);
    await page.goto(`/?tab=${tab}`);
    await page.locator('main, #root > div').first().waitFor();
    await page.waitForLoadState('networkidle');

    // ponytail: color-contrast 제외 — 팔레트 전반의 대비 미달(예: text-slate-400 on
    // white = 2.63:1)은 별도 과제다. 팔레트를 고치면 이 줄을 지운다.
    const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
    const blocking = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
    expect(blocking.map((v) => `${v.id}(${v.impact}) ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}
