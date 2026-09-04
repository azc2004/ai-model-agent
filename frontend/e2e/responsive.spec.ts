import { expect, test } from '@playwright/test';
import { stubCatalog } from './fixtures';

const viewports = [
  { width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 },
  { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1280, height: 800 },
  { width: 1440, height: 900 }, { width: 1920, height: 1080 },
];

// dashboard 한 탭만 보면 나머지 9개 탭의 넘침을 놓친다. 글꼴 크기나 여백을
// 건드리면 어느 탭에서 터질지 알 수 없으므로 전 탭을 훑는다.
const TABS = [
  'dashboard', 'compare', 'tco', 'advisor', 'tutorial',
  'leaderboard', 'gpus', 'news', 'sandbox', 'speed',
];

for (const tab of TABS) {
  test(`${tab} 탭이 어느 뷰포트에서도 가로로 넘치지 않는다`, async ({ page }) => {
    test.setTimeout(180_000);
    await stubCatalog(page);
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(`/?tab=${tab}`);
      await page.locator('main, #root > div').first().waitFor();
      await page.waitForTimeout(600);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${tab} ${viewport.width}x${viewport.height}`).toBeLessThanOrEqual(1);
    }
  });
}

// body { overflow-x: hidden } hides clipped controls from the check above,
// so assert the header's own controls actually fit inside the viewport.
test('header controls stay reachable at every viewport', async ({ page }) => {
  await stubCatalog(page);
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/?tab=dashboard');
    await page.getByRole('banner').waitFor();
    const clipped = await page.evaluate(() =>
      [...document.querySelectorAll('header button, header select, header input')]
        .filter((el) => el.getBoundingClientRect().width > 0)
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
        .map((el) => el.getAttribute('aria-label') ?? el.tagName));
    expect(clipped, `${viewport.width}px`).toEqual([]);
  }
});

test('mobile bottom bar does not eat the viewport', async ({ page }) => {
  await stubCatalog(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?tab=dashboard');
  const bar = page.getByRole('navigation', { name: '모바일 주요 메뉴' });
  await bar.waitFor();
  expect((await bar.boundingBox())!.height).toBeLessThan(88);
});
