import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('dashboard has no serious accessibility violations', async ({ page }) => {
  await page.route('http://localhost:8000/**', (route) => route.fulfill({ json: [] }));
  await page.goto('/?tab=dashboard');
  await page.getByRole('textbox', { name: '카탈로그 검색' }).waitFor();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);
});
