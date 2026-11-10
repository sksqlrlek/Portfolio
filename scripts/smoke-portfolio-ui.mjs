import { chromium } from 'playwright';

// Real-browser smoke test: the new home design and original project readers
// must mount, render, and remain usable before Docker image delivery to OCI.
const url = 'http://127.0.0.1:18080';
const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (error) => errors.push(error.message));

  const home = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!home?.ok()) throw new Error('Homepage returned HTTP ' + home?.status());

  await page.locator('.topbar').waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('#hero-title').waitFor({ state: 'visible' });
  const headline = await page.locator('#hero-title').innerText();
  if (!headline.includes('문제의 원인을')) throw new Error('New home hero headline did not render');

  await page.locator('#process-title').waitFor({ state: 'visible' });
  await page.locator('#projects-title').waitFor({ state: 'visible' });
  await page.locator('#cases-title').waitFor({ state: 'visible' });
  await page.locator('#about-title').waitFor({ state: 'visible' });
  const cardCount = await page.locator('.h-card').count();
  if (cardCount !== 3) throw new Error('Expected 3 project cards; received ' + cardCount);

  // Process tabs and image zoom must work, not just render a shell.
  const analysis = page.locator('.h-stagebar button').first();
  await analysis.click();
  if ((await analysis.getAttribute('aria-pressed')) !== 'true') {
    throw new Error('The process tab cannot be selected');
  }
  await page.locator('.h-stagepanel .h-shot').first().click();
  await page.locator('.h-lightbox').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.locator('.h-lightbox').waitFor({ state: 'detached' });

  for (const asset of ['/assets/profile.png', '/assets/noblack-room.webp', '/assets/portfolio-files/crew-use-case.png']) {
    const response = await page.request.get(url + asset);
    if (!response.ok()) throw new Error('Asset missing: ' + asset + ' (' + response.status() + ')');
  }

  await page.goto(url + '/#project/crew/16', { waitUntil: 'domcontentloaded' });
  await page.locator('#reader-title').waitFor({ state: 'visible' });
  await page.locator('#portfolio-page-16').waitFor({ state: 'attached' });
  if (!(await page.locator('#reader-title').innerText()).includes('MyCrewSoft')) {
    throw new Error('MyCrewSoft detail did not render');
  }

  await page.goto(url + '/#project/noblack', { waitUntil: 'domcontentloaded' });
  await page.locator('#reader-title').waitFor({ state: 'visible' });
  if (!(await page.locator('#reader-title').innerText()).includes('NO.BLACK')) {
    throw new Error('NO.BLACK detail did not render');
  }

  const resume = await page.goto(url + '/resume.html', { waitUntil: 'domcontentloaded' });
  if (!resume?.ok()) throw new Error('Resume returned HTTP ' + resume?.status());

  if (errors.length) throw new Error('Browser JavaScript errors: ' + errors.join(' | '));
  console.log('Home update smoke passed: header, hero, process tabs/lightbox, 3 projects, cases, about, readers, assets, resume');
} finally {
  await browser.close();
}
