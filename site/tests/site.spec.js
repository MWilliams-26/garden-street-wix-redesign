import { expect, test } from '@playwright/test';

const routes = [
  ['/', 'Train. Perform. Grow.'],
  ['/classes', 'Classes for every next step.'],
  ['/pricing', 'Straightforward pricing for every path.'],
  ['/dance-teams', 'Train together. Perform with purpose.'],
  ['/musical-theatre', 'Sing, act and dance as part of a cast.'],
  ['/summer-camp', 'Summer days made for movement.'],
  ['/parties-rentals', 'A celebration that moves with them.'],
  ['/about', 'A place to learn, create and belong.'],
  ['/contact', 'Let’s start a conversation.'],
  ['/important-dates', 'Important dates for 2026–27.'],
];

for (const [path, heading] of routes) {
  test(`${path} loads without browser errors`, async ({ page }) => {
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(path, { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);

    const images = page.locator('img');
    for (let index = 0; index < await images.count(); index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
    }

    expect(errors).toEqual([]);
  });
}

test('search metadata points Google to the public domain', async ({ page }) => {
  await page.goto('/classes');
  await expect(page).toHaveTitle('Classes | Garden Street Performing Arts');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /dance, acro and musical theatre classes/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.gardenstreetperformingarts.com/classes');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://www.gardenstreetperformingarts.com/classes');
});

test('robots and sitemap expose every public page to search engines', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Sitemap: https://www.gardenstreetperformingarts.com/sitemap.xml');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const sitemapXml = await sitemap.text();
  for (const [path] of routes) {
    const suffix = path === '/' ? '/' : path;
    expect(sitemapXml).toContain(`<loc>https://www.gardenstreetperformingarts.com${suffix}</loc>`);
  }
});

test('mobile navigation opens, closes, and stays within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: 'Menu' });
  await menuButton.click();
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole('link', { name: 'Parties & Rentals', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);

  await page.keyboard.press('Escape');
  await expect(menuButton).toBeFocused();
});

test('class finder returns matching classes', async ({ page }) => {
  await page.goto('/classes');
  await page.getByRole('button', { name: /Ages 4–6/ }).click();
  await expect(page.locator('.results-heading')).toContainText(/\d+ classes? match/);
  await expect(page.locator('.class-result').first()).toBeVisible();
});

test('contact links preserve context without skipping the phone option', async ({ page }) => {
  await page.goto('/contact?topic=Dance+team+placement');
  await expect(page.locator('#contact-topic')).toHaveValue('Dance team placement');
  await expect(page.getByText('Prefer to call?')).toBeVisible();
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(10);
});

test('homepage Our story link starts at the top of About', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Our story' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1, name: 'A place to learn, create and belong.' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);
});

test('party information does not use horizontal scrolling on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/parties-rentals');

  for (const selector of ['.party-path-grid', '.hosted-package-grid', '.party-gallery']) {
    expect(await page.locator(selector).evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
