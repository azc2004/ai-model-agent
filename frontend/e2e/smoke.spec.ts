import { expect, test } from '@playwright/test';


test('opens the catalog', async ({ page }) => {
  await page.goto('/?tab=dashboard');

  await expect(page).toHaveTitle(/LLM COMPASS/i);
  await expect(page.getByRole('main')).toBeVisible();
});
