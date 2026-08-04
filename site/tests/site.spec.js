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
    test.setTimeout(60_000);
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);

    const images = page.locator('img');
    for (let index = 0; index < await images.count(); index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(
        () => image.evaluate((element) => element.complete && element.naturalWidth > 0),
        { timeout: 15_000 },
      ).toBe(true);
    }

    expect(errors).toEqual([]);
  });
}

test('search metadata points Google to the public domain', async ({ page }) => {
  await page.goto('/classes');
  await expect(page).toHaveTitle('Classes | Garden Street School of the Performing Arts');
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

test('client color review is hidden unless review mode is enabled', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('aside.theme-review-bar')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'current-preview');
});

test('client color selection changes instantly and persists across routes and refreshes', async ({ page }) => {
  await page.goto('/?review=true');
  const reviewBar = page.locator('aside.theme-review-bar');
  await expect(reviewBar).toBeVisible();
  await expect(reviewBar).toContainText('Current selection: Current Preview');
  const radios = reviewBar.getByRole('radio');
  await expect(radios).toHaveCount(5);
  await expect(radios.nth(0)).toHaveAttribute('tabindex', '0');
  await expect(radios.nth(1)).toHaveAttribute('tabindex', '-1');
  await expect(radios.nth(2)).toHaveAttribute('tabindex', '-1');
  await expect(radios.nth(3)).toHaveAttribute('tabindex', '-1');
  await expect(radios.nth(4)).toHaveAttribute('tabindex', '-1');
  for (const control of [radios.nth(0), reviewBar.getByRole('button', { name: 'Minimize color direction review' }), reviewBar.getByRole('link', { name: 'Send feedback' })]) {
    expect(await control.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  }

  const currentUrl = page.url();
  await reviewBar.getByRole('radio', { name: 'Current Preview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'bright-balanced');
  await expect(reviewBar).toContainText('Current selection: Bright & Balanced');
  await expect(radios.nth(0)).toHaveAttribute('tabindex', '-1');
  await expect(radios.nth(1)).toHaveAttribute('tabindex', '0');
  expect(page.url()).toBe(currentUrl);

  await reviewBar.getByRole('radio', { name: 'Soft Editorial' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'soft-editorial');
  await reviewBar.getByRole('button', { name: 'Preview mobile' }).click();
  const devicePreview = page.getByRole('dialog', { name: 'Mobile preview' });
  await expect(devicePreview).toBeVisible();
  await expect(devicePreview.locator('iframe')).toBeVisible();
  await expect.poll(() => devicePreview.locator('iframe').evaluate((frame) => frame.contentWindow.innerWidth)).toBe(390);
  await devicePreview.getByRole('button', { name: 'Close preview' }).click();
  await reviewBar.getByRole('radio', { name: 'Bold & Editorial' }).click();

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Classes', exact: true }).click();
  await expect(page).toHaveURL(/\/classes$/);
  await expect(reviewBar).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'bold-editorial');

  await page.reload();
  await expect(reviewBar).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'bold-editorial');

  await reviewBar.getByRole('button', { name: 'Minimize color direction review' }).click();
  await expect(page.locator('body')).toHaveClass(/theme-review-minimized/);
  await expect(reviewBar).toContainText('Desktop · Bold & Editorial');
  await reviewBar.getByRole('button', { name: 'Expand' }).click();
  await expect(page.locator('body')).not.toHaveClass(/theme-review-minimized/);
});

test('Find a Class remains visible in every theme at desktop and mobile widths', async ({ page }) => {
  const themes = ['current-preview', 'bright-balanced', 'soft-editorial', 'bold-editorial', 'warm-artistic'];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const theme of themes) {
      await page.goto(`/?embedded=true&theme=${theme}`);
      const findClass = page.getByRole('link', { name: 'Find a Class', exact: true });
      await expect(findClass).toBeInViewport();
      await expect(findClass).toBeVisible();
      expect(await findClass.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
      await expect(findClass).toHaveCSS('background-color', 'rgb(149, 225, 89)');
      await expect(findClass).toHaveCSS('color', 'rgb(23, 25, 23)');
    }
  }
});

test('editorial pathways use neutral group labels and dark-green age choices', async ({ page }) => {
  for (const [theme, labelColor] of [['soft-editorial', 'rgb(32, 36, 32)'], ['bold-editorial', 'rgb(17, 20, 17)']]) {
    await page.goto(`/?embedded=true&theme=${theme}`);
    const pathwayLabels = page.locator('.home-pathways .pathway-label');
    await expect(pathwayLabels).toHaveCount(2);
    await expect(pathwayLabels.first()).toHaveCSS('color', labelColor);
    await expect(pathwayLabels.first()).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    const firstAge = page.locator('.home-pathways .age-row a').first();
    await expect(firstAge).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(firstAge.locator('strong')).toHaveCSS('color', 'rgb(37, 105, 20)');
  }
});

test('client color review remains usable when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { configurable: true, get: () => { throw new Error('blocked'); } });
    Object.defineProperty(window, 'sessionStorage', { configurable: true, get: () => { throw new Error('blocked'); } });
  });
  await page.goto('/?review=true');
  const reviewBar = page.locator('aside.theme-review-bar');
  await expect(reviewBar).toBeVisible();
  await reviewBar.getByRole('radio', { name: 'Warm & Artistic' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'warm-artistic');
});

test('client color review remains contained and usable with narrow-screen text zoom', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/?review=true');
  await page.locator('html').evaluate((element) => { element.style.fontSize = '200%'; });
  const reviewBar = page.locator('aside.theme-review-bar');
  await expect(reviewBar).toBeVisible();
  const bounds = await reviewBar.evaluate((element) => element.getBoundingClientRect().toJSON());
  expect(bounds.top).toBeGreaterThanOrEqual(0);
  expect(bounds.right).toBeLessThanOrEqual(375);
  expect(bounds.bottom).toBeLessThanOrEqual(667);
  await reviewBar.getByRole('radio', { name: 'Warm & Artistic' }).scrollIntoViewIfNeeded();
  await reviewBar.getByRole('radio', { name: 'Warm & Artistic' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'warm-artistic');
  expect(await reviewBar.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
});
