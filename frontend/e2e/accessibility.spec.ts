import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { stubCatalog } from './fixtures';

// 예전에는 dashboard 한 탭만, 그것도 API 를 빈 배열로 스텁해 카드가 0개인 화면을
// 검사해서 아무것도 잡히지 않았다. 실제로 렌더된 10개 탭을 전부 훑는다.
const TABS = [
  'dashboard', 'compare', 'tco', 'advisor', 'tutorial',
  'leaderboard', 'gpus', 'news', 'sandbox', 'speed',
];

// 대비는 테마마다 다르게 깨진다 — 같은 의미역이 흰 배경과 어두운 배경 양쪽에
// 놓이기 때문이다. 한 테마만 검사하면 절반을 놓친다.
const THEMES = ['light', 'dark'] as const;

for (const theme of THEMES) for (const tab of TABS) {
  test(`${theme} · ${tab} 탭에 serious/critical 접근성 위반이 없다`, async ({ page }) => {
    test.setTimeout(180_000);
    await page.addInitScript((t) => localStorage.setItem('llm_compass_theme', t), theme);
    await stubCatalog(page);
    await page.goto(`/?tab=${tab}`);
    await page.locator('main, #root > div').first().waitFor();
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
    expect(blocking.map((v) => `${v.id}(${v.impact}) ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}
