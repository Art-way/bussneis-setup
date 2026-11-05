import assert from 'node:assert/strict';
import { canonicalArabicPaths, canonicalArabicUrl, legacyArabicRedirects } from '../components/arabic/routes.mjs';

// Run against a local production preview, or pass an explicit deployment origin.
const base = new URL(process.argv[2] || 'http://127.0.0.1:5047').origin;
const paths = [...canonicalArabicPaths].map(path => `${path}/`);
const checks = [];
const check = (name, pass, detail) => checks.push({ name, pass: !!pass, ...(detail === undefined ? {} : { detail }) });
const cleanPath = path => decodeURI(path).normalize('NFC').replace(/\/+$/, '');
const localArabicPath = value => {
  const url = new URL(value.replaceAll('&amp;', '&'), base);
  return (url.origin === base || url.origin === 'https://businesssetupuae.ae') && url.pathname.startsWith('/ar/')
    ? cleanPath(url.pathname) : null;
};
function checkStructuredUrls(value, issues) {
  if (typeof value === 'string' && value.startsWith('https://businesssetupuae.ae/ar/')) {
    const path = localArabicPath(value);
    if (!canonicalArabicPaths.has(path)) issues.push(value);
  } else if (Array.isArray(value)) value.forEach(item => checkStructuredUrls(item, issues));
  else if (value && typeof value === 'object') Object.values(value).forEach(item => checkStructuredUrls(item, issues));
}

assert.equal(paths.length, 27, 'The Arabic section has 27 canonical pages including the Dubai licence fees article.');
for (const path of paths) {
  check(`${path} Arabic-only public segments`, path.split('/').slice(2).filter(Boolean).every(segment => /[\u0600-\u06ff]/.test(segment) && !/[a-z]/i.test(segment)));
  const response = await fetch(base + path, { redirect: 'manual' });
  const html = await response.text();
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  check(`${path} HTTP and SSR`, response.status === 200 && (html.match(/<h1\b/g) || []).length === 1 && html.includes('<html lang="ar-EG" dir="rtl">'), response.status);
  check(`${path} canonical`, canonical === canonicalArabicUrl(path), canonical);
  const badLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]).filter(href => {
    const linkedPath = localArabicPath(href);
    return linkedPath && !canonicalArabicPaths.has(linkedPath);
  });
  check(`${path} internal links`, badLinks.length === 0, badLinks);
  const schemaIssues = [];
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { checkStructuredUrls(JSON.parse(match[1]), schemaIssues); }
    catch (error) { schemaIssues.push(error.message); }
  }
  check(`${path} structured URLs`, schemaIssues.length === 0, schemaIssues);
}

for (const [oldPath, destination] of legacyArabicRedirects) {
  const response = await fetch(`${base}${oldPath}/?utm_source=url-check&q=${encodeURIComponent('تأسيس')}`, { redirect: 'manual' });
  const location = response.headers.get('location');
  await response.arrayBuffer();
  const target = location && new URL(location, base);
  check(`${oldPath}/ permanent direct redirect`, response.status === 308 && target?.pathname === new URL(base + destination).pathname && target.searchParams.get('utm_source') === 'url-check' && target.searchParams.get('q') === 'تأسيس', { status: response.status, location });
}

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
check('Sitemap lists every encoded Arabic canonical', paths.every(path => sitemap.includes(canonicalArabicUrl(path))));
check('Sitemap removes legacy Arabic URLs', [...legacyArabicRedirects.keys()].every(path => !sitemap.includes(`https://businesssetupuae.ae${path}/`)));

for (const path of ['/ar/المدونة/', '/ar/المدونة/تصنيف/تأسيس-الشركات/']) {
  const html = await (await fetch(`${base}${path}?q=${encodeURIComponent('تأسيس')}`)).text();
  check(`${path} search noindex and clean canonical`, /<meta name="robots" content="noindex/.test(html) && html.includes(`rel="canonical" href="${canonicalArabicUrl(path)}"`));
}
for (const path of ['/ar/غير-موجود/', '/ar/المدونة/missing/', '/ar/المدونة/start-a-uae-company-from-egypt/', '/ar/%E0%A4%A/']) {
  const response = await fetch(base + path, { redirect: 'manual' });
  await response.arrayBuffer();
  check(`${path} invalid path stays4xx`, [400, 404].includes(response.status), response.status);
}
const composed = '/ar/المدونة/تأسيس-شركة-في-الإمارات-من-مصر/';
const normalizedResponse = await fetch(base + composed.normalize('NFD'), { redirect: 'manual' });
await normalizedResponse.arrayBuffer();
check('Decomposed Unicode redirects to NFC', normalizedResponse.status === 308 && new URL(normalizedResponse.headers.get('location'), base).pathname === new URL(base + composed).pathname);

for (const path of ['/', '/about-us/', '/services/']) {
  const response = await fetch(base + path);
  const html = await response.text();
  check(`${path} English route intact`, response.status === 200 && html.includes('<html lang="en"'));
}
const result = { at: new Date().toISOString(), base, canonicalPages: paths.length, legacyRedirects: legacyArabicRedirects.size, checks, pass: checks.every(item => item.pass) };
console.log(JSON.stringify(result, null, 2));
if (!result.pass) process.exitCode = 1;
