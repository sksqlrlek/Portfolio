import { chromium } from 'playwright';

// An Nginx 200 + valid HTML is not enough: the React bundle must mount and render.
// This catches browser-only errors such as "React is not defined".
const browser = await chromium.launch({ headless: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', (error) => errors.push(error.message));

  const response = await page.goto('http://127.0.0.1:18080/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  if (!response?.ok()) {
    throw new Error(`HTTP response was ${response?.status() ?? 'missing'}`);
  }

  await page.locator('#hero-title').waitFor({ state: 'visible', timeout: 15000 });
  const heroTitle = await page.locator('#hero-title').innerText();
  if (!heroTitle.includes('Jaehun')) {
    throw new Error(`Expected a visible hero heading, received: ${heroTitle}`);
  }

  await page.locator('#noblack-title').waitFor({ state: 'visible', timeout: 15000 });
  const projectTitle = await page.locator('#noblack-title').innerText();
  if (!projectTitle.includes('BLACK')) {
    throw new Error(`NO.BLACK project section did not render: ${projectTitle}`);
  }

  if (errors.length) {
    throw new Error(`Browser JavaScript error(s): ${errors.join(' | ')}`);
  }

  console.log('Browser smoke passed: React hero + NO.BLACK project rendered.');
} finally {
  await browser.close();
}
