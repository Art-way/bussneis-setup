import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { categoryPath as categoryUrl, arabicCategorySlugs, arabicPostSlugs, canonicalArabicUrl, dubaiGuideSlug, dubaiLicenceFeesPath, dubaiServicePath, costRequestPath, postPath, canonicalArabicPaths } from '../components/arabic/routes.mjs';

const base = process.argv[2] || 'http://127.0.0.1:5047';
const posts = JSON.parse(await fs.readFile('components/arabic/dubai-articles.json', 'utf8'));
const checks = [];
const check = (name, pass, detail) => checks.push({ name, pass: !!pass, ...(detail === undefined ? {} : { detail }) });
const stripScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const guide = posts.find(post => post.urlSlug === dubaiGuideSlug);
const contract = posts.find(post => post.slug === 'dubai-llc-memorandum');
const budget = posts.find(post => post.slug === 'dubai-contracting-budget');
const benefits = posts.find(post => post.slug === 'dubai-formation-benefits');
const licenceFees = posts.find(post => post.path === dubaiLicenceFeesPath);
const blogPath = '/ar/المدونة/';
const contractingServicePath = '/ar/تأسيس-شركة-مقاولات-في-دبي/';
const licenceServicePath = '/ar/إصدار-رخصة-تجارية-في-دبي/';
const keywordPlan = new Map([
  [guide.path, ['كيف افتح شركة في دبي', ['خطوات تأسيس شركة في دبي', 'كيفية تأسيس شركة في دبي']]],
  [contract.path, ['نموذج عقد تأسيس شركة ذات مسئولية محدودة دبي', ['نموذج عقد تأسيس شركة في دبي']]],
  [budget.path, ['تكلفة تاسيس شركة مقاولات في دبي', ['تأسيس شركة مقاولات في الإمارات', 'تأسيس شركة مقاولات في دبي']]],
  [benefits.path, ['مميزات فتح شركة في دبي', ['فتح شركة في دبي']]],
  [licenceFees.path, ['اسعار الرخص التجارية في دبي', ['تكلفة الرخصة التجارية في دبي', 'رسوم رخصة تجارية في دبي']]],
]);
const anchorByPath = new Map([
  ...[...keywordPlan].map(([path, [primary]]) => [path, primary]),
  [dubaiServicePath, 'تأسيس شركة في دبي'],
  [contractingServicePath, 'تأسيس شركة مقاولات في دبي'],
  [licenceServicePath, 'إصدار رخصة تجارية في دبي'],
]);
const seoReview = [];
const costGuide = { slug: 'company-setup-cost-checklist', path: postPath({ urlSlug: arabicPostSlugs['company-setup-cost-checklist'] }) };

const pages = new Map();
const categoryPath = post => categoryUrl(arabicCategorySlugs[post.categorySlug]);
for (const path of new Set(['/ar/', dubaiServicePath, contractingServicePath, licenceServicePath, costRequestPath, costGuide.path, blogPath, '/ar/الخدمات/', '/ar/authors/فريق-التحرير/', '/ar/تواصل-معنا/', ...posts.map(postPath), ...posts.map(categoryPath)])) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const html = await response.text();
  const visible = stripScripts(html);
  pages.set(path, visible);
  check(`${path} HTTP200, Arabic SSR and one H1`, response.status === 200 && html.includes('<html lang="ar-EG" dir="rtl">') && (visible.match(/<h1\b/g) || []).length === 1);
  check(`${path} self canonical`, html.includes(`rel="canonical" href="${canonicalArabicUrl(path)}"`));
  check(`${path} indexable`, !/<meta name="robots" content="noindex/.test(html));
  check(`${path} fathatan appears on the alif`, !visible.includes('ًا'));
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
  const articleHtml = html.match(/<article\b[\s\S]*?<\/article>/)?.[0] || '';
  const heading = articleHtml.match(/<header\b[\s\S]*?<\/header>/)?.[0] || '';
  const intro = articleHtml.split(/<h1\b/)[1]?.split(/<h2\b/)[0] || '';
  const category = categoryPath(post);
  const expectedTrail = [blogPath, category, path].map(canonicalArabicUrl);
  const visibleTrail = heading.match(/<nav\b[\s\S]*?<\/nav>/)?.[0] || '';
  const crumbLinks = [...visibleTrail.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
  check(`${post.slug} exact SEO title`, decode(html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] || '') === post.metaTitle);
  check(`${post.slug} exact SEO description`, decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '') === post.excerpt);
  check(`${post.slug} article identity`, article?.headline === post.title && article?.mainEntityOfPage === canonicalArabicUrl(path) && article?.author?.['@type'] === 'Organization' && article?.image?.[0] === 'https://businesssetupuae.ae' + post.image.src);
  check(`${post.slug} publication and modification dates`, article?.datePublished === post.publishedAt && article?.dateModified === post.updatedAt && (heading.match(/<time\b/g) || []).length === 1 && heading.includes(`dateTime="${post.updatedAt}"`));
  check(`${post.slug} supplied writer name`, article?.author?.name === 'فريق BSetup UAE');
  check(`${post.slug} blog, category and article breadcrumb`, JSON.stringify(breadcrumb?.itemListElement?.map(item => item.item)) === JSON.stringify(expectedTrail) && JSON.stringify(crumbLinks) === JSON.stringify([blogPath, category]) && visibleTrail.includes('aria-current="page"'));
  check(`${post.slug} category lists this article`, pages.get(category).includes(`href="${path}"`));
  check(`${post.slug} link-free introduction and no top author or category button`, intro.length > 0 && !/<a\b/.test(intro) && !heading.includes('categoryTag') && !heading.includes('/ar/authors/'));
  check(`${post.slug} no invented translation`, !/hrefLang="en"/.test(html.split('</head>')[0]));
  check(`${post.slug} no administrative material`, !/بطاقة النشر للمقال|خريطة الربط الداخلي المقترحة|نتائج البحث المقتبس|تحليل المنافسين/.test(html));
  const figureCount = post.blocks.filter(block => block.type === 'image').length;
  check(`${post.slug} expected full-size article illustrations`, (html.match(/<figure\b/g) || []).length === figureCount);
  check(`${post.slug} simplified Word has no table or publishing markers`, !/<table\b/.test(html) && !/>H[123]:|\[H[123]\]|النص البديل للصورة:/.test(html));
  if (post === contract || post === benefits) check(`${post.slug} native numbered list preserved`, /<ol\b[^>]*start="1"/.test(html) && post.blocks.filter(block => block.type === 'ol').reduce((sum, block) => sum + block.items.length, 0) === 5);
  for (const block of post.blocks) {
    if (block.type === 'h2' || block.type === 'h3') check(`${post.slug} ${block.id} heading and anchor`, html.includes(`id="${block.id}"`) && html.includes(block.text));
    if (block.type === 'p') {
      for (const run of block.content) {
        if (run.href) check(`${post.slug} contextual ${run.href}`, decode(html).includes(`href="${run.href}"`));
      }
    }
    if (block.type === 'image') {
      check(`${post.slug} ${block.kind} approved ALT and geometry`, html.includes(`alt="${block.alt}"`) && html.includes(`width="${block.width}" height="${block.height}"`));
      for (const image of block.srcSet.split(', ').map(value => value.split(' ')[0])) {
        const response = await fetch(base + image);
        const bytes = new Uint8Array(await response.arrayBuffer());
        check(`${image} WEBP200`, response.status === 200 && response.headers.get('content-type')?.startsWith('image/webp') && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP');
      }
    }
  }
  const inboundSources = [dubaiServicePath, '/ar/المدونة/', '/ar/authors/فريق-التحرير/'];
  if (posts.slice(0, 3).includes(post)) inboundSources.push('/ar/');
  for (const source of inboundSources) {
    check(`${post.slug} inbound link from ${source}`, pages.get(source).includes(`href="${path}"`));
  }
  const service = post === budget ? contractingServicePath : post === licenceFees ? licenceServicePath : dubaiServicePath;
  const consultation = articleHtml.match(/<section\b[^>]*id="article-consultation"[^>]*>[\s\S]*?<\/section>/)?.[0] || '';
  check(`${post.slug} consultation links to the relevant request form`, consultation.includes(`href="${service}#request"`) && pages.get(service).includes('id="request"'));
  const editorial = articleHtml.match(/<div\b[^>]*class="[^"]*wordArticle[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] || '';
  const firstH2 = editorial.indexOf('<h2');
  const afterH2 = firstH2 >= 0 ? editorial.slice(firstH2) : '';
  const paragraphs = [...afterH2.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(match => match[1]);
  const readAnchors = paragraph => [...paragraph.matchAll(/<a\b[^>]*href="(\/ar\/[^"#]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(([, href, label]) => ({ href, label: decode(label.replace(/<[^>]*>/g, '')) }));
  const contextual = paragraphs.flatMap(readAnchors);
  const [primary, secondary] = keywordPlan.get(path);
  const visibleH1 = decode(heading.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || '');
  const opening = decode(heading.match(/<p\b[^>]*class="[^"]*articleIntro[^"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1] || '');
  const headings = [...afterH2.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(match => decode(match[1]));
  const prose = paragraphs.map(paragraph => decode(paragraph.replace(/<[^>]*>/g, '')));
  const placement = {
    h1: visibleH1.includes(primary),
    first100: opening.trim().split(/\s+/).slice(0, 100).join(' ').includes(primary),
    h2: headings.filter(title => title.includes(primary)),
    body: prose.some(paragraph => paragraph.includes(primary)),
  };
  check(`${post.slug} three to five distinct contextual internal links`, contextual.length >= 3 && contextual.length <= 5 && new Set(contextual.map(link => link.href)).size === contextual.length);
  check(`${post.slug} exact approved anchor keywords and real destinations`, contextual.every(link => anchorByPath.get(link.href) === link.label && pages.has(link.href)));
  const cta = paragraphs[1] || '';
  const ctaLinks = readAnchors(cta);
  check(`${post.slug} bold branded CTA with the first contextual link`,
    !/<a\b/.test(paragraphs[0] || '') && ctaLinks.length === 1 && ctaLinks[0].href === service &&
    /<strong\b[^>]*>[^<]*BSetup UAE/.test(cta) && !cta.replace(/<strong\b[^>]*>[\s\S]*?<\/strong>/g, '').replace(/<[^>]*>/g, '').trim());
  check(`${post.slug} primary keyword in H1, first 100 words, H2 and prose`, placement.h1 && placement.first100 && placement.h2.length > 0 && placement.body);
  const visibleEditorialText = [...headings, ...prose];
  check(`${post.slug} planned secondary keywords`, secondary.every(keyword => visibleEditorialText.some(text => text.includes(keyword))));
  seoReview.push({ path, primary, secondary, placement, introLinks: (intro.match(/<a\b/g) || []).length, contextual });
}

for (const [query, expected] of [['emirate=dubai',5], ['emirate=dubai&topic=formation-steps',1], ['emirate=dubai&topic=contracting',1], ['emirate=dubai&topic=contracts',1], ['emirate=dubai&topic=formation-benefits',1], ['emirate=dubai&topic=trade-licences',1]]) {
  const html = await (await fetch(base + '/ar/المدونة/?' + query)).text();
  const cards = (html.match(/class="ar-article-card"/g) || []).length;
  check(`${query} filter content`, cards === expected, cards);
  check(`${query} canonical and noindex`, html.includes(`rel="canonical" href="${canonicalArabicUrl('/ar/المدونة/')}"`) && /<meta name="robots" content="noindex/.test(html));
}

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
for (const path of [dubaiServicePath, costRequestPath, ...posts.map(postPath)]) check(`${path} sitemap exactly once`, sitemap.split(`<loc>${canonicalArabicUrl(path)}</loc>`).length === 2);
const home = pages.get('/ar/');
check('Native homepage retains no Next JS', !home.includes('/_next/static/chunks/')); // Scripts separately verified by browser.
check('Dubai service includes real form entry', pages.get(dubaiServicePath).includes('افتح نموذج طلب الاستشارة') && pages.get(dubaiServicePath).includes('id="request"'));
check('Cost request is a real intake entry without quoted prices', pages.get(costRequestPath).includes('id="cost-request-form"') && pages.get(costRequestPath).includes('id="arabic-request-widget"') && !/\bAED\b|\b\d[\d,]*\s*(درهم|د\.إ)/.test(pages.get(costRequestPath)));
check('Contracting budget preserves first publication', budget.publishedAt === '2026-11-04');
check('Contracting budget keeps the hypothetical example and five comparison questions', pages.get(budget.path).includes('مثال حسابي لتجهيز الميزانية (مثال افتراضي)') && pages.get(budget.path).includes('<ul><li>') && budget.blocks.some(block => block.type === 'ul' && block.items.length === 5));
check('The UAE cost guide still links to the Dubai licence fees article', pages.get(costGuide.path).includes(`href="${licenceFees.path}"`));
for (const path of ['/ar/تأسيس-شركة-في-رأس-الخيمة/', dubaiServicePath + 'المقاولات/', '/ar/مقال-غير-موجود/', '/ar/عقد-التأسيس-دبي/']) {
  const response = await fetch(base + path);
  await response.arrayBuffer();
  check(`${path} no empty generated page`, response.status === 404);
}
await fs.writeFile('output/security/dubai-publication-verification.json', JSON.stringify({ base, at: new Date().toISOString(), checks, seoReview }, null, 2));
const failed = checks.filter(check => !check.pass);
console.log(JSON.stringify({ checks: checks.length, failed }, null, 2));
assert.equal(failed.length, 0, 'Dubai publication checks failed');
