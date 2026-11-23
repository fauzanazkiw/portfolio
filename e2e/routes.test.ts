import { expect, test } from '@playwright/test';

for (const route of ['/work', '/blog']) {
	test(`${route} renders without an internal server error`, async ({ page }) => {
		const response = await page.goto(`http://localhost:4173${route}`);
		expect(response?.status()).toBe(200);
		await expect(page.locator('h1')).toBeVisible();
		await expect(page.getByRole('navigation')).toBeVisible();
		await expect(page.getByText('Internal Error', { exact: true })).toHaveCount(0);
	});
}
