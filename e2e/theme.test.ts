import { expect, test } from '@playwright/test';

for (const width of [375, 768, 1440]) {
	test(`theme preference persists at ${width}px`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.setViewportSize({ width, height: 900 });
		await page.goto('/');
		// Light is the default for a first visit; dark is only ever an explicit choice.
		await expect(page.locator('html')).not.toHaveClass(/dark/);
		const toggle = page.getByRole('button', { name: 'Toggle color theme' });
		await expect(toggle).toBeVisible();
		await toggle.click();
		await expect(page.locator('html')).toHaveClass(/dark/);
		await page.reload();
		await expect(page.locator('html')).toHaveClass(/dark/);
		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
		).toBe(true);
		await toggle.focus();
		await page.keyboard.press('Enter');
		await expect(page.locator('html')).not.toHaveClass(/dark/);
		expect(errors).toEqual([]);
	});
}
