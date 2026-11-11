import { chromium } from 'playwright';

// Real-browser smoke test: the home page and the three project detail pages must
// mount, render, and stay usable before the Docker image is delivered to OCI.
// PORTFOLIO_URL / CHROMIUM_PATH let you run it locally against another server or browser.
const url = (process.env.PORTFOLIO_URL || 'http://127.0.0.1:18080').replace(/\/$/, '');
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (error) => errors.push(error.message));

  const home = await page.goto(url + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!home?.ok()) throw new Error('Homepage returned HTTP ' + home?.status());

  await page.locator('#hero-name').waitFor({ state: 'visible', timeout: 15000 });
  if (!(await page.locator('.headline').innerText()).includes('문제의 원인을')) {
    throw new Error('Hero headline did not render');
  }
  for (const id of ['projects', 'trouble', 'skills', 'career', 'contact']) {
    await page.locator('#' + id).waitFor({ state: 'attached' });
  }
  const projectCount = await page.locator('#projects article').count();
  if (projectCount !== 3) throw new Error('Expected 3 projects; received ' + projectCount);
  if (!(await page.locator('#projects article h3').first().innerText()).includes('MyCrewSoft')) {
    throw new Error('MyCrewSoft must be the first (main) project');
  }
  const certCount = await page.locator('.certs li').count();
  if (certCount !== 7) throw new Error('Expected 7 certificates; received ' + certCount);

  // The header contact menu opens and closes.
  await page.locator('.cm .hbtn').click();
  await page.locator('.cm-panel').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.locator('.cm-panel').waitFor({ state: 'hidden' });

  // Detail pages follow the analysis → deploy order. Moving inside a page must not stack
  // history entries, so one Back returns to the home page.
  await page.locator('#projects a.btn', { hasText: '상세 보기' }).first().click();
  await page.locator('#detail-title').waitFor({ state: 'visible' });
  if (!(await page.locator('#detail-title').innerText()).includes('MyCrewSoft')) {
    throw new Error('MyCrewSoft detail did not render');
  }
  for (const id of ['overview', 'analysis', 'design', 'build', 'test', 'trouble']) {
    await page.locator('#' + id).waitFor({ state: 'attached' });
  }
  await page.locator('.toc a[href="#project/crew/design"]').click();
  await page.locator('.toc a[href="#project/crew/trouble"]').click();
  await page.goBack();
  await page.locator('#hero-name').waitFor({ state: 'visible', timeout: 5000 });

  // A troubleshooting link opens the collapsed case it points to.
  await page.goto(url + '/#project/crew/case-03', { waitUntil: 'domcontentloaded' });
  await page.locator('#case-03').waitFor({ state: 'visible' });

  for (const [id, name] of [['noblack', 'NO.BLACK'], ['cinema', 'Cinema Talk']]) {
    await page.goto(url + '/#project/' + id, { waitUntil: 'domcontentloaded' });
    await page.locator('#detail-title').waitFor({ state: 'visible' });
    if (!(await page.locator('#detail-title').innerText()).includes(name)) throw new Error(name + ' detail did not render');
  }

  // Phones: section tabs on the home page, a stage bar on detail pages.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url + '/#projects', { waitUntil: 'domcontentloaded' });
  await page.locator('.tabs').waitFor({ state: 'visible' });
  await page.goto(url + '/#project/crew', { waitUntil: 'domcontentloaded' });
  await page.locator('.stagebar').waitFor({ state: 'visible' });

  for (const asset of ['/assets/profile-photo.jpg', '/assets/noblack-room.webp', '/assets/portfolio-files/crew-use-case.png', '/assets/tech/java.svg', '/og-image.png']) {
    const response = await page.request.get(url + asset);
    if (!response.ok()) throw new Error('Asset missing: ' + asset + ' (' + response.status() + ')');
  }

  if (errors.length) throw new Error('Browser JavaScript errors: ' + errors.join(' | '));
  console.log('Portfolio smoke passed: home sections, 3 projects, 7 certificates, contact menu, crew/noblack/cinema details, TOC history, case deep link, mobile tabs and stage bar, assets');
} finally {
  await browser.close();
}
