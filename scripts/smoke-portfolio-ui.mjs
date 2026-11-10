import { chromium } from 'playwright';

// Assert the exact ChatGPT Sites v10 UI is rendered, not just an HTTP 200 page.
const url = 'http://127.0.0.1:18080';
const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', (error) => errors.push(error.message));

  const home = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!home?.ok()) throw new Error('Homepage returned HTTP ' + home?.status());

  await page.locator('.site-rail').waitFor({ state: 'visible' });
  await page.locator('#name').waitFor({ state: 'visible', timeout: 15000 });
  await page.locator('#work-title').waitFor({ state: 'visible' });
  await page.locator('#noblack-title').waitFor({ state: 'visible' });
  const heading = await page.locator('#name').innerText();
  if (!heading.includes('Jaehun')) throw new Error('Missing original hero headline');

  const profile = await page.request.get(url + '/assets/profile.png');
  if (!profile.ok()) throw new Error('Original profile image missing: ' + profile.status());
  const noblackAsset = await page.request.get(url + '/assets/noblack-room.webp');
  if (!noblackAsset.ok()) throw new Error('NO.BLACK image missing: ' + noblackAsset.status());

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

  if (errors.length) throw new Error('Browser JS error(s): ' + errors.join(' | '));
  console.log('Sites v10 browser smoke passed: sidebar, hero, projects, details, assets, resume');
} finally {
  await browser.close();
}
