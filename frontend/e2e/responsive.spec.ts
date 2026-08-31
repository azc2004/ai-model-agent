import { expect, test } from '@playwright/test';
import { stubCatalog } from './fixtures';

const viewports = [
  { width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 },
  { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1280, height: 800 },
  { width: 1440, height: 900 }, { width: 1920, height: 1080 },
];

test('supported viewports avoid page-level horizontal overflow', async ({ page }) => {
  await stubCatalog(page);
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/?tab=dashboard');
    await page.getByRole('textbox', { name: '카탈로그 검색' }).waitFor();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${viewport.width}x${viewport.height}`).toBeLessThanOrEqual(1);
  }
});

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
