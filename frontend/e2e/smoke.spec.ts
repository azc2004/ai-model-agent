import { expect, test } from '@playwright/test';


test('opens the catalog', async ({ page }) => {
  await page.route('http://localhost:8000/**', (route) => route.abort());
  await page.goto('/?tab=dashboard');

  await expect(page).toHaveTitle(/LLM COMPASS/i);
  await expect(page.getByRole('main')).toBeVisible();
});

test('model search to comparison works', async ({ page, isMobile }) => {
  await page.route('http://localhost:8000/**', (route) => route.abort());
  await page.goto('/?tab=dashboard');
  await page.getByRole('searchbox', { name: '전역 모델 검색' }).fill('GPT');
  const addButton = page.getByRole('button', { name: /\+ Compare|Add to Compare|비교에 추가|비교하기/ }).first();
  await expect(addButton).toBeVisible({ timeout: 10_000 });
  await addButton.click();
  if (isMobile) await page.getByRole('link', { name: /Compare|비교/ }).click();
  else await page.getByRole('button', { name: /Compare|비교/ }).first().click();
  await expect(page).toHaveURL(/tab=compare/);
});
