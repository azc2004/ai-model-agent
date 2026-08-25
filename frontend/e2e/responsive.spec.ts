import { expect, test } from '@playwright/test';

const viewports = [
  { width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 932 },
  { width: 768, height: 1024 }, { width: 1024, height: 768 }, { width: 1280, height: 800 },
  { width: 1440, height: 900 }, { width: 1920, height: 1080 },
];

test('supported viewports avoid page-level horizontal overflow', async ({ page }) => {
  await page.route('http://localhost:8000/**', (route) => route.fulfill({ json: [] }));
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/?tab=dashboard');
    await page.getByRole('textbox', { name: '카탈로그 검색' }).waitFor();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${viewport.width}x${viewport.height}`).toBeLessThanOrEqual(1);
  }
});
