import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { canonicalArabicUrl, dubaiServicePath, postPath, canonicalArabicPaths } from '../components/arabic/routes.mjs';

const base = process.argv[2] || 'http://127.0.0.1:5047';
const posts = JSON.parse(await fs.readFile('components/arabic/dubai-articles.json', 'utf8'));
const checks = [];
const check = (name, pass, detail) => checks.push({ name, pass: !!pass, ...(detail === undefined ? {} : { detail }) });
const stripScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const pages = new Map();
for (const path of ['/ar/', dubaiServicePath, '/ar/المدونة/', '/ar/الخدمات/', '/ar/المؤلفون/فريق-التحرير/', '/ar/تواصل-معنا/', ...posts.map(postPath)]) {
  const response = await fetch(base + path);
  const html = await response.text();
  const visible = stripScripts(html);
  pages.set(path, visible);
  check(`${path} HTTP200, Arabic SSR and one H1`, response.status === 200 && html.includes('<html lang="ar-EG" dir="rtl">') && (visible.match(/<h1\b/g) || []).length === 1);
  check(`${path} self canonical`, html.includes(`rel="canonical" href="${canonicalArabicUrl(path)}"`));
  check(`${path} indexable`, !/<meta name="robots" content="noindex/.test(html));
  const invalidLinks = [...visible.matchAll(/<a\b[^>]*href="([^"#]+)"/g)].map(m => decode(m[1])).filter(href => href.startsWith('/ar/')).filter(href => !canonicalArabicPaths.has(decodeURI(new URL(href, base).pathname).replace(/\/+$/, '')));
  check(`${path} internal destinations valid`, !invalidLinks.length, invalidLinks);
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { check(`${path} valid JSONLD`, false); }
  }
}

for (const post of posts) {
  const path = postPath(post);
  const html = pages.get(path);
  const responseHtml = await (await fetch(base + path)).text();
  const schemas = [...responseHtml.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const article = schemas.find(s => s['@type'] === 'BlogPosting');
  const breadcrumb = schemas.find(s => s['@type'] === 'BreadcrumbList');
  check(`${post.slug} exact SEO title`, decode(html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] || '') === post.metaTitle);
  check(`${post.slug} exact SEO description`, decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '') === post.excerpt);
  check(`${post.slug} article identity`, article?.headline === post.title && article?.mainEntityOfPage === canonicalArabicUrl(path) && article?.author?.['@type'] === 'Organization' && article?.image?.[0] === 'https://businesssetupuae.ae' + post.image.src);
  check(`${post.slug} no fabricated date`, !article?.datePublished && !article?.dateModified && !/تاريخ النشر:/.test(html));
  check(`${post.slug} Dubai breadcrumb`, breadcrumb?.itemListElement?.length === 3 && breadcrumb.itemListElement[1].item === canonicalArabicUrl(dubaiServicePath) && breadcrumb.itemListElement[2].item === canonicalArabicUrl(path));
  check(`${post.slug} no invented translation`, !/hrefLang="en"/.test(html.split('</head>')[0]));
  check(`${post.slug} no administrative material`, !/بطاقة النشر للمقال|خريطة الربط الداخلي المقترحة|نتائج البحث المقتبس|تحليل المنافسين/.test(html));
  check(`${post.slug} exactly two full-size article illustrations`, (html.match(/<figure\b/g) || []).length === 2);
  for (const block of post.blocks) {
    if (block.type === 'h2' || block.type === 'h3') check(`${post.slug} ${block.id} heading and anchor`, html.includes(`id="${block.id}"`) && html.includes(block.text));
    if (block.type === 'p') {
      for (const run of block.content) {
        if (run.href?.startsWith('/ar/')) check(`${post.slug} contextual ${run.href}`, html.includes(`href="${run.href}"`) || html.includes(`href="${encodeURI(run.href)}"`));
      }
    }
    if (block.type === 'image') {
      check(`${post.slug} ${block.kind} original ALT and geometry`, html.includes(`alt="${block.alt}"`) && html.includes(`width="${block.width}" height="${block.height}"`));
      for (const image of block.srcSet.split(', ').map(value => value.split(' ')[0])) {
        const response = await fetch(base + image);
        check(`${image} WEBP200`, response.status === 200 && response.headers.get('content-type')?.startsWith('image/webp'));
      }
    }
  }
  for (const source of ['/ar/', dubaiServicePath, '/ar/المدونة/', '/ar/المؤلفون/فريق-التحرير/']) {
    check(`${post.slug} inbound link from ${source}`, pages.get(source).includes(`href="${path}"`));
  }
  check(`${post.slug} working service request link`, html.includes(`href="${dubaiServicePath}#request"`));
}

for (const [query, expected] of [['emirate=dubai',3], ['emirate=dubai&topic=contracting',1], ['emirate=dubai&topic=contracts',1], ['emirate=dubai&topic=formation-benefits',1], ['emirate=dubai&q=' + encodeURIComponent('سيولة'),2]]) {
  const html = await (await fetch(base + '/ar/المدونة/?' + query)).text();
  const cards = (html.match(/class="ar-article-card"/g) || []).length;
  check(`${query} filter content`, cards === expected, cards);
  check(`${query} canonical and noindex`, html.includes(`rel="canonical" href="${canonicalArabicUrl('/ar/المدونة/')}"`) && /<meta name="robots" content="noindex/.test(html));
}

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
for (const path of [dubaiServicePath, ...posts.map(postPath)]) check(`${path} sitemap exactly once`, sitemap.split(`<loc>${canonicalArabicUrl(path)}</loc>`).length === 2);
const home = pages.get('/ar/');
check('Native homepage retains no Next JS', !home.includes('/_next/static/chunks/')); // Scripts separately verified by browser.
check('Dubai service includes real form entry', pages.get(dubaiServicePath).includes('افتح نموذج طلب الاستشارة') && pages.get(dubaiServicePath).includes('id="request"'));
for (const path of ['/ar/تأسيس-شركة-في-الشارقة/', '/ar/تأسيس-شركة-في-عجمان/', '/ar/تأسيس-شركة-في-أبوظبي/', dubaiServicePath + 'المقاولات/', '/ar/مقال-غير-موجود/']) {
  const response = await fetch(base + path);
  check(`${path} no empty generated page`, response.status === 404);
}
await fs.writeFile('output/security/dubai-publication-verification.json', JSON.stringify({ base, at: new Date().toISOString(), checks }, null, 2));
const failed = checks.filter(check => !check.pass);
console.log(JSON.stringify({ checks: checks.length, failed }, null, 2));
assert.equal(failed.length, 0, 'Dubai publication checks failed');
