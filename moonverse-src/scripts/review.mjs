import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const baseUrl = process.env.MOONVERSE_REVIEW_URL || 'http://127.0.0.1:4173/moonverse/';
const sourceRoot = path.resolve(new URL('..', import.meta.url).pathname);
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');
const outputRoot = path.join(sourceRoot, 'review-artifacts');
const screenshotsRoot = path.join(outputRoot, 'screenshots');
fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(screenshotsRoot, { recursive: true });

const publicIndex = JSON.parse(fs.readFileSync(path.join(siteRoot, 'assets', 'search-index.json'), 'utf8'));
const entryRoutes = publicIndex.map((item) => {
  const relativePath = new URL(item.url, 'https://moonverse.local').pathname.replace(/^\/moonverse\//, '');
  const slug = relativePath.replace(/^entry\//, '').replace(/\/$/, '');
  return [`article-${slug}`, relativePath];
});

const routes = [
  ['home', ''],
  ['wiki', 'wiki/'],
  ...entryRoutes,
  ['timeline', 'timeline/'],
  ['atlas', 'atlas/'],
  ['about', 'about/'],
  ['search-maresia', 'search/?q=maresia'],
  ['search-moon-source', 'search/?q=Moon%20Source'],
  ['search-ecologia', 'search/?q=ecologia'],
  ['search-transicao', 'search/?q=transi%C3%A7%C3%A3o'],
  ['search-santuario', 'search/?q=santu%C3%A1rio'],
  ['search-lithia', 'search/?q=L%C3%ADthia']
];
const viewports = [
  ['desktop', { width: 1440, height: 1000 }],
  ['tablet', { width: 1024, height: 768 }],
  ['mobile', { width: 390, height: 844 }]
];

const browser = await chromium.launch({ headless: true });
const report = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  publicEntriesExpected: publicIndex.length,
  entryRoutesReviewed: entryRoutes.length,
  pages: [],
  accessibility: [],
  consoleErrors: [],
  pageErrors: [],
  failures: []
};

try {
  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({ viewport, colorScheme: 'light' });
    const page = await context.newPage();
    page.on('console', (message) => {
      if (message.type() === 'error') report.consoleErrors.push({ viewport: viewportName, text: message.text() });
    });
    page.on('pageerror', (error) => report.pageErrors.push({ viewport: viewportName, text: error.message }));

    for (const [name, relativePath] of routes) {
      const url = new URL(relativePath, baseUrl).toString();
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      const status = response?.status() ?? 0;
      const metrics = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        lang: document.documentElement.lang
      }));
      const screenshot = path.join(screenshotsRoot, `${name}-${viewportName}.png`);
      await page.screenshot({ path: screenshot, fullPage: true });
      report.pages.push({ name, viewport: viewportName, url, status, screenshot: path.relative(outputRoot, screenshot), ...metrics });

      if (status !== 200) report.failures.push(`${name}/${viewportName}: HTTP ${status}`);
      if (!metrics.h1) report.failures.push(`${name}/${viewportName}: missing h1`);
      if (metrics.lang !== 'pt-BR') report.failures.push(`${name}/${viewportName}: html lang is ${metrics.lang || 'missing'}`);
      if (metrics.scrollWidth > metrics.clientWidth + 1) report.failures.push(`${name}/${viewportName}: horizontal overflow ${metrics.scrollWidth}px > ${metrics.clientWidth}px`);

      if (viewportName === 'desktop') {
        const axe = await new AxeBuilder({ page }).analyze();
        const serious = axe.violations.filter((item) => ['serious', 'critical'].includes(item.impact || ''));
        report.accessibility.push({
          name,
          url,
          violations: axe.violations.map((item) => ({ id: item.id, impact: item.impact, help: item.help, nodes: item.nodes.length })),
          seriousOrCritical: serious.length
        });
        if (serious.length) report.failures.push(`${name}: ${serious.length} serious/critical axe violation(s)`);
      }
    }
    await context.close();
  }

  if (entryRoutes.length !== publicIndex.length) {
    report.failures.push(`entry route coverage mismatch: ${entryRoutes.length} reviewed for ${publicIndex.length} public entries`);
  }

  const nightContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light' });
  const nightPage = await nightContext.newPage();
  await nightPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await nightPage.locator('[data-theme-toggle]').click();
  await nightPage.screenshot({ path: path.join(screenshotsRoot, 'home-night-desktop.png'), fullPage: true });
  const appliedTheme = await nightPage.evaluate(() => document.documentElement.dataset.theme || 'light');
  if (appliedTheme !== 'night') report.failures.push(`theme toggle did not apply night theme; received ${appliedTheme}`);
  await nightContext.close();
} finally {
  await browser.close();
}

if (report.consoleErrors.length) report.failures.push(`${report.consoleErrors.length} browser console error(s)`);
if (report.pageErrors.length) report.failures.push(`${report.pageErrors.length} uncaught page error(s)`);

fs.writeFileSync(path.join(outputRoot, 'review-report.json'), JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(path.join(outputRoot, 'review-summary.md'), `# Moonverse browser review\n\n- Public entries expected: ${report.publicEntriesExpected}\n- Entry routes reviewed: ${report.entryRoutesReviewed}\n- Pages/viewports captured: ${report.pages.length}\n- Desktop axe audits: ${report.accessibility.length}\n- Console errors: ${report.consoleErrors.length}\n- Page errors: ${report.pageErrors.length}\n- Failures: ${report.failures.length}\n\n${report.failures.length ? report.failures.map((item) => `- ${item}`).join('\n') : 'All browser review gates passed.'}\n`);

if (report.failures.length) {
  console.error('Moonverse browser review failed:');
  for (const failure of report.failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Moonverse browser review passed: ${report.entryRoutesReviewed} public entries, ${report.pages.length} screenshots, ${report.accessibility.length} axe audits.`);
