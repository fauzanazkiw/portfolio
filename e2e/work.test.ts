import { expect, test } from '@playwright/test';

test('work navigation and heading remain visible after client navigation', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/');
	await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click();
	await expect(page).toHaveURL(/\/work$/);
	await expect(page.getByRole('heading', { name: 'Work', exact: true })).toBeVisible();
	await expect(page.getByRole('navigation')).toBeVisible();
	await expect(
		page.getByRole('navigation').getByRole('link', { name: 'Home', exact: true })
	).toBeVisible();
});
